import os
import re
import time

import anthropic
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
# Text cleaning helpers  (unchanged logic)
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
# PDF loading  — uses pypdf instead of PyMuPDF (fitz)
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
# Chunking  (unchanged)
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
                    "faiss_id": global_chunk_id,  # kept for schema compat
                    "doc": doc["doc"],
                    "page": doc["page"],
                    "chunk": i,
                    "text": chunk,
                }
            )
            global_chunk_id += 1
    return all_chunks


# ---------------------------------------------------------------------------
# BM25 index  — replaces SentenceTransformer + FAISS
# ---------------------------------------------------------------------------

def build_index(chunks: list[dict]) -> BM25Okapi:
    """Tokenise all chunks and build a BM25 index.

    Returns the BM25Okapi object (no embedder needed).
    """
    print("Building BM25 index…")
    tokenised = [c["text"].lower().split() for c in chunks]
    index = BM25Okapi(tokenised)
    print(f"Indexed {len(chunks)} chunks.")
    return index


# ---------------------------------------------------------------------------
# Retrieval  — BM25 instead of dense vector search
# ---------------------------------------------------------------------------

def retrieve(
    query: str,
    index: BM25Okapi,
    all_chunks: list[dict],
    k: int = 10,
) -> tuple[list[dict], float]:
    """Return (retrieved_chunks, retrieval_time_s)."""
    t0 = time.perf_counter()
    tokenised_query = query.lower().split()
    scores = index.get_scores(tokenised_query)

    # argsort descending, take top-k
    top_indices = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)[:k]
    elapsed = time.perf_counter() - t0
    return [all_chunks[i] for i in top_indices], round(elapsed, 4)


# ---------------------------------------------------------------------------
# Anthropic API inference  — replaces Ollama
# ---------------------------------------------------------------------------

# Set ANTHROPIC_API_KEY in your environment / Heroku config vars.
_anthropic_client: anthropic.Anthropic | None = None


def _get_client() -> anthropic.Anthropic:
    global _anthropic_client
    if _anthropic_client is None:
        _anthropic_client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY
    return _anthropic_client


ANTHROPIC_MODEL = "claude-haiku-4-5-20251001"  # fast + cheap; swap to sonnet if needed


def generate_answer_anthropic(
    question: str,
    context: str,
    model: str = ANTHROPIC_MODEL,
    temperature: float = 0.1,
) -> tuple[str, dict]:
    """Call the Anthropic Messages API and return (answer_text, timing_dict)."""
    system_prompt = (
        "You are an expert on Economics. "
        "Using the context retrieved from relevant papers, answer the question. "
        "If you do not know the answer, say so. "
        "Provide ONLY the answer — no question, no context, no explanation."
    )
    user_message = f"Context:\n{context}\n\nQuestion:\n{question}"

    t0 = time.perf_counter()
    try:
        message = _get_client().messages.create(
            model=model,
            max_tokens=1024,
            temperature=temperature,
            system=system_prompt,
            messages=[{"role": "user", "content": user_message}],
        )
    except Exception as exc:
        return f"Error calling Anthropic API: {exc}", {}
    finally:
        total_s = time.perf_counter() - t0

    answer = message.content[0].text.strip() if message.content else ""

    timing = {
        "total_s":       round(total_s, 2),
        "prompt_tokens": message.usage.input_tokens,
        "eval_tokens":   message.usage.output_tokens,
        # Anthropic doesn't expose per-call throughput, so we estimate
        "tokens_per_s":  round(message.usage.output_tokens / max(total_s, 0.001), 1),
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
    model: str = ANTHROPIC_MODEL,
) -> tuple[str, list[str], dict]:
    """Return (answer, source_docs, per_question_timings)."""
    try:
        retrieved, retrieval_s = retrieve(question, index, all_chunks, k=k)
        source_docs = [chunk["doc"] for chunk in retrieved]
        context = "\n\n".join(chunk["text"] for chunk in retrieved)

        answer, gen_timing = generate_answer_anthropic(question, context, model=model)

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
# Public entry point  (same signature as before)
# ---------------------------------------------------------------------------

def query_rag(question: str) -> str:
    if not os.environ.get("ANTHROPIC_API_KEY"):
        raise RuntimeError(
            "ANTHROPIC_API_KEY environment variable is not set.\n"
            "Add it to your Heroku config:  heroku config:set ANTHROPIC_API_KEY=sk-..."
        )

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    papers_dir = os.path.join(BASE_DIR, "papers")

    documents = load_pdfs(papers_dir)
    all_chunks = chunk_documents(documents)
    bm25_index = build_index(all_chunks)

    answer, _source_docs, _timings = generate_answer(
        question, bm25_index, all_chunks, model=ANTHROPIC_MODEL
    )
    return answer