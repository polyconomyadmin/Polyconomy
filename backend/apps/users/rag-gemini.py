import os
import re
import time

from google import genai
from google.genai import types
from pypdf import PdfReader
from rank_bm25 import BM25Okapi


# ---------------------------------------------------------------------------
# Timing helper
# ---------------------------------------------------------------------------

class Timer:
    """Simple context manager for timing any block of code."""
    def __init__(self, label: str):
        self.label = label
        self.elapsed: float = 0.0

    def __enter__(self):
        self._start = time.perf_counter()
        return self

    def __exit__(self, *_):
        self.elapsed = time.perf_counter() - self._start
        print(f"  [{self.label}] {self.elapsed:.2f}s")


# ---------------------------------------------------------------------------
# Text cleaning helpers
# ---------------------------------------------------------------------------

def clean_text(text: str) -> str:
    if not text:
        return ""
    text = re.sub(r"\n+", " ", text)
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"\[\d+\]", "", text)
    text = re.sub(r"\S+@\S+", "", text)
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^\x00-\x7F]+", " ", text)
    text = re.sub(r"[•·]", "", text)
    text = re.sub(r"-\s+", "", text)
    return text.strip()


def remove_table_lines(text: str) -> str:
    cleaned_lines = []
    for line in text.split("\n"):
        line = line.strip()
        if not line:
            continue
        digit_ratio = sum(c.isdigit() for c in line) / max(len(line), 1)
        if digit_ratio > 0.4:
            continue
        special_ratio = (
            sum(not c.isalnum() and not c.isspace() for c in line)
            / max(len(line), 1)
        )
        if special_ratio > 0.4:
            continue
        cleaned_lines.append(line)
    return "\n".join(cleaned_lines)


def remove_academic_noise(text: str) -> str:
    patterns = [
        r"Table\s+\d+.*",
        r"Figure\s+\d+.*",
        r"\d+\s*$",
        r"Proceedings.*",
        r"Conference.*",
    ]
    for pattern in patterns:
        text = re.sub(pattern, "", text)
    return text


def remove_control_chars(text: str) -> str:
    return re.sub(r"[\x00-\x1F\x7F-\x9F]", " ", text)


def remove_garbage_sequences(text: str) -> str:
    return re.sub(r"(.)\1{10,}", " ", text)


def normalize_text(text: str) -> str:
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"\n+", "\n", text)
    return text.strip()


def preprocess_pdf_text(text: str) -> str:
    text = remove_table_lines(text)
    text = remove_academic_noise(text)
    text = remove_control_chars(text)
    text = remove_garbage_sequences(text)
    text = normalize_text(text)
    text = clean_text(text)
    return text


# ---------------------------------------------------------------------------
# PDF loading — uses pypdf
# ---------------------------------------------------------------------------

def load_pdfs(pdf_dir: str) -> list[dict]:
    documents = []
    for filename in os.listdir(pdf_dir):
        if not filename.endswith(".pdf"):
            continue
        reader = PdfReader(os.path.join(pdf_dir, filename))
        for page_num, page in enumerate(reader.pages):
            raw_text = page.extract_text() or ""
            cleaned = preprocess_pdf_text(raw_text)
            documents.append({"doc": filename, "page": page_num, "text": cleaned})
    return documents


# ---------------------------------------------------------------------------
# Chunking
# ---------------------------------------------------------------------------

def chunk_text(text: str, chunk_size: int = 500, overlap: int = 100) -> list[str]:
    words = text.split()
    chunks = []
    start = 0
    while start < len(words):
        chunks.append(" ".join(words[start : start + chunk_size]))
        start += chunk_size - overlap
    return chunks


def chunk_documents(docs: list[dict]) -> list[dict]:
    all_chunks = []
    global_chunk_id = 0
    for doc in docs:
        for i, chunk in enumerate(chunk_text(doc["text"])):
            all_chunks.append(
                {
                    "id": global_chunk_id,
                    "doc": doc["doc"],
                    "page": doc["page"],
                    "chunk": i,
                    "text": chunk,
                }
            )
            global_chunk_id += 1
    return all_chunks


# ---------------------------------------------------------------------------
# BM25 index
# ---------------------------------------------------------------------------

def build_index(chunks: list[dict]) -> BM25Okapi:
    print("Building BM25 index…")
    tokenised = [c["text"].lower().split() for c in chunks]
    index = BM25Okapi(tokenised)
    print(f"Indexed {len(chunks)} chunks.")
    return index


# ---------------------------------------------------------------------------
# Retrieval
# ---------------------------------------------------------------------------

def retrieve(
    query: str,
    index: BM25Okapi,
    all_chunks: list[dict],
    k: int = 10,
) -> tuple[list[dict], float]:
    t0 = time.perf_counter()
    tokenised_query = query.lower().split()
    scores = index.get_scores(tokenised_query)
    top_indices = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)[:k]
    elapsed = time.perf_counter() - t0
    return [all_chunks[i] for i in top_indices], round(elapsed, 4)


# ---------------------------------------------------------------------------
# Gemini inference
# ---------------------------------------------------------------------------

GEMINI_MODEL = "gemini-2.5-flash"

_gemini_client = None


def _get_client() -> genai.Client:
    global _gemini_client
    if _gemini_client is None:
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            raise RuntimeError(
                "GEMINI_API_KEY environment variable is not set.\n"
                "Add it with:  heroku config:set GEMINI_API_KEY=your-key"
            )
        _gemini_client = genai.Client(api_key=api_key)
    return _gemini_client


def generate_answer_gemini(
    question: str,
    context: str,
    temperature: float = 0.1,
) -> tuple[str, dict]:
    """Call Gemini and return (answer_text, timing_dict)."""
    prompt = (
        "You are an expert on Economics. "
        "Using the context retrieved from relevant papers, answer the question below.\n\n"
        f"Context:\n{context}\n\n"
        f"Question:\n{question}\n\n"
        "If you do not know the answer, say so. "
        "Provide ONLY the answer — no question, no context, no explanation."
    )

    t0 = time.perf_counter()
    try:
        response = _get_client().models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=temperature,
                max_output_tokens=1024,
            ),
        )
        answer = response.text.strip()
    except Exception as exc:
        return f"Error calling Gemini API: {exc}", {}
    finally:
        total_s = time.perf_counter() - t0

    timing = {
        "total_s": round(total_s, 2),
        "prompt_tokens": 0,
        "eval_tokens": 0,
        "tokens_per_s": 0,
    }
    return answer, timing


# ---------------------------------------------------------------------------
# Full RAG pipeline per question
# ---------------------------------------------------------------------------

def generate_answer(
    question: str,
    index: BM25Okapi,
    all_chunks: list[dict],
    k: int = 5,
) -> tuple[str, list[str], dict]:
    """Return (answer, source_docs, per_question_timings)."""
    try:
        retrieved, retrieval_s = retrieve(question, index, all_chunks, k=k)
        source_docs = [chunk["doc"] for chunk in retrieved]
        context = "\n\n".join(chunk["text"] for chunk in retrieved)

        answer, gen_timing = generate_answer_gemini(question, context)

        timings = {
            "retrieval_s":   retrieval_s,
            "generation_s":  gen_timing.get("total_s", 0),
            "total_s":       round(retrieval_s + gen_timing.get("total_s", 0), 2),
            "prompt_tokens": gen_timing.get("prompt_tokens", 0),
            "eval_tokens":   gen_timing.get("eval_tokens", 0),
            "tokens_per_s":  gen_timing.get("tokens_per_s", 0),
        }
        return answer, source_docs, timings

    except Exception as exc:
        print("RAG error:", exc)
        return "Error generating response", [], {}


def extract_answer(text: str) -> str:
    match = re.search(r"Answer:\s*(.*)", text, re.DOTALL)
    return match.group(1).strip() if match else text.strip()


# ---------------------------------------------------------------------------
# Public entry point
# ---------------------------------------------------------------------------

def query_rag(question: str) -> str:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    papers_dir = os.path.join(BASE_DIR, "papers")

    documents = load_pdfs(papers_dir)
    all_chunks = chunk_documents(documents)
    bm25_index = build_index(all_chunks)

    answer, _source_docs, _timings = generate_answer(
        question, bm25_index, all_chunks
    )
    return answer