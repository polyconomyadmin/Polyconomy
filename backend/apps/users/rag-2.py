import os
import re
import time

import faiss
import fitz
import numpy as np
import pandas as pd
import requests
from sentence_transformers import SentenceTransformer


# ---------------------------------------------------------------------------
# Timing helper
# ---------------------------------------------------------------------------

class Timer:
    """Simple context manager for timing any block of code.

    Usage:
        with Timer("Building index"):
            build_index(...)
        # prints: [Building index] 12.34s
    """
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

#NOT NEEDED ANYMORE BECAUSE THE PAPER 3 COULD BE DOWNLOADED AS A BOOK (PDF)
def extract_text_from_url(url: str) -> str:
    downloaded = trafilatura.fetch_url(url)

    if downloaded is None:
        raise ValueError("Failed to download page")

    text = trafilatura.extract(
        downloaded,
        include_comments=False,
        include_tables=True,
        no_fallback=False
    )

    if text is None:
        raise ValueError("Extraction failed")

    return text

# ---------------------------------------------------------------------------
# PDF loading
# ---------------------------------------------------------------------------

# def load_pdfs(pdf_dir: str) -> list[dict]:
#     documents = []
#     for filename in os.listdir(pdf_dir):
#         if not filename.endswith(".pdf"):
#             continue
#         doc = fitz.open(os.path.join(pdf_dir, filename))
#         for page_num, page in enumerate(doc):
#             raw_text = page.get_text()
#             cleaned = preprocess_pdf_text(raw_text)
#             documents.append({"doc": filename, "page": page_num, "text": cleaned})
#     return documents

def load_pdfs(pdf_dir: str, output_dir: str) -> list[dict]:
    documents = []

    raw_dir = os.path.join(output_dir, "raw_text")
    clean_dir = os.path.join(output_dir, "cleaned_text")

    os.makedirs(raw_dir, exist_ok=True)
    os.makedirs(clean_dir, exist_ok=True)

    for filename in os.listdir(pdf_dir):
        if not filename.endswith(".pdf"):
            continue

        doc = fitz.open(os.path.join(pdf_dir, filename))

        for page_num, page in enumerate(doc):
            raw_text = page.get_text()
            cleaned = preprocess_pdf_text(raw_text)

            # Create base filename (without .pdf)
            base_name = os.path.splitext(filename)[0]

            # File paths
            raw_file_path = os.path.join(raw_dir, f"{base_name}_page_{page_num}.txt")
            clean_file_path = os.path.join(clean_dir, f"{base_name}_page_{page_num}.txt")

            # Save raw text
            with open(raw_file_path, "w", encoding="utf-8") as f:
                f.write(raw_text)

            # Save cleaned text
            with open(clean_file_path, "w", encoding="utf-8") as f:
                f.write(cleaned)

            documents.append({
                "doc": filename,
                "page": page_num,
                "text": cleaned
            })

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
                    "faiss_id": global_chunk_id,
                    "doc": doc["doc"],
                    "page": doc["page"],
                    "chunk": i,
                    "text": chunk,
                }
            )
            global_chunk_id += 1
    return all_chunks


# ---------------------------------------------------------------------------
# Embedding & FAISS index
# ---------------------------------------------------------------------------

def build_index(chunks: list[dict]) -> tuple[SentenceTransformer, faiss.Index]:
    print("Building FAISS index…")
    embedder = SentenceTransformer("all-MiniLM-L6-v2")
    texts = [c["text"] for c in chunks]
    embeddings = embedder.encode(texts, convert_to_numpy=True, show_progress_bar=True)
    index = faiss.IndexFlatL2(embeddings.shape[1])
    index.add(embeddings)
    print(f"Indexed {len(chunks)} chunks.")
    return embedder, index


# ---------------------------------------------------------------------------
# Ollama inference
# ---------------------------------------------------------------------------

OLLAMA_BASE_URL = "http://localhost:11434"

OLLAMA_MODEL = "mistral:latest"

def check_ollama_running() -> bool:
    try:
        r = requests.get(f"{OLLAMA_BASE_URL}/api/tags", timeout=3)
        return r.status_code == 200
    except requests.ConnectionError:
        return False


def list_ollama_models() -> list[str]:
    try:
        r = requests.get(f"{OLLAMA_BASE_URL}/api/tags", timeout=5)
        r.raise_for_status()
        return [m["name"] for m in r.json().get("models", [])]
    except Exception as exc:
        print(f"Could not list Ollama models: {exc}")
        return []


def generate_answer_ollama(
    question: str,
    context: str,
    model: str = OLLAMA_MODEL,
    temperature: float = 0.1,
) -> tuple[str, dict]:
    """Call Ollama and return (answer_text, timing_dict).

    timing_dict contains:
        total_s        — wall-clock time for the whole HTTP request
        prompt_tokens  — tokens in the prompt  (from Ollama metadata)
        eval_tokens    — tokens generated       (from Ollama metadata)
        tokens_per_s   — generation throughput
    """
    prompt = (
        "You are an expert on Economics. "
        "Using the context retrieved from relevant papers, answer the question below.\n\n"
        f"Context:\n{context}\n\n"
        f"Question:\n{question}\n\n"
        "If you do not know the answer, say so. "
        "Provide ONLY the answer — no question, no context, no explanation."
    )

    payload = {
        "model": model,
        "prompt": prompt,
        "stream": False,
        "options": {
            "temperature": temperature,
            "num_predict": 1000, # change this back to 300 for models other than deepseek
        },
    }

    t0 = time.perf_counter()
    try:
        ## for models other than deepseek:
        response = requests.post(
            f"{OLLAMA_BASE_URL}/api/generate",
            json=payload,
            timeout=120,
        )
        response.raise_for_status()
        data = response.json()
    except requests.Timeout:
        return "Error: Ollama request timed out.", {}
    except Exception as exc:
        return f"Error calling Ollama: {exc}", {}
    finally:
        total_s = time.perf_counter() - t0

    # for models other than deepseek:
    answer = data.get("response", "").strip()
    if not answer:
            print("⚠️ Empty response from Ollama")
            print(data)


    # Ollama returns token counts and durations in nanoseconds
    prompt_tokens = data.get("prompt_eval_count", 0)
    eval_tokens   = data.get("eval_count", 0)
    eval_ns       = data.get("eval_duration", 0)
    tokens_per_s  = (eval_tokens / eval_ns * 1e9) if eval_ns else 0.0

    timing = {
        "total_s":       round(total_s, 2),
        "prompt_tokens": prompt_tokens,
        "eval_tokens":   eval_tokens,
        "tokens_per_s":  round(tokens_per_s, 1),
    }
    return answer, timing


# ---------------------------------------------------------------------------
# Retrieval
# ---------------------------------------------------------------------------

def retrieve(
    query: str,
    embedder: SentenceTransformer,
    index: faiss.Index,
    all_chunks: list[dict],
    k: int = 10,
) -> tuple[list[dict], float]:
    """Return (retrieved_chunks, retrieval_time_s)."""
    t0 = time.perf_counter()
    query_embedding = embedder.encode([query], convert_to_numpy=True)
    _, indices = index.search(query_embedding, k)
    elapsed = time.perf_counter() - t0
    return [all_chunks[i] for i in indices[0]], round(elapsed, 4)


# ---------------------------------------------------------------------------
# Full RAG pipeline per question
# ---------------------------------------------------------------------------

def query_rag(
    question: str,
    embedder: SentenceTransformer,
    index: faiss.Index,
    all_chunks: list[dict],
    k: int = 5,
    model: str = OLLAMA_MODEL,
) -> tuple[str, list[str], dict]:
    """Return (answer, source_docs, per_question_timings)."""
    try:
        retrieved, retrieval_s = retrieve(question, embedder, index, all_chunks, k=k)
        source_docs = [chunk["doc"] for chunk in retrieved]
        context = "\n\n".join(chunk["text"] for chunk in retrieved)

        answer, gen_timing = generate_answer_ollama(question, context, model=model)

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


# ---------------------------------------------------------------------------
# Post-processing
# ---------------------------------------------------------------------------

def extract_answer(text: str) -> str:
    match = re.search(r"Answer:\s*(.*)", text, re.DOTALL)
    return match.group(1).strip() if match else text.strip()


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":

    # ── Sanity-check Ollama ──────────────────────────────────────────────
    if not check_ollama_running():
        raise RuntimeError(
            "Ollama is not running! Start it with:  ollama serve\n"
            "Then pull a model with:  ollama pull mistral"
        )

    available_models = list_ollama_models()
    print(f"Available Ollama models: {available_models}")

    if OLLAMA_MODEL not in available_models:
        raise RuntimeError(
            f"Model '{OLLAMA_MODEL}' is not pulled yet.\n"
            f"Run:  ollama pull {OLLAMA_MODEL}"
        )

    print(f"Using Ollama model: {OLLAMA_MODEL}\n")

    # ── PDF loading ──────────────────────────────────────────────────────
    with Timer("PDF loading"):
        documents = load_pdfs("../papers", "../extracted_texts")

    # ── Chunking ─────────────────────────────────────────────────────────
    with Timer("Chunking"):
        all_chunks = chunk_documents(documents)
    print(f"  Total chunks: {len(all_chunks)}")

    # ── FAISS index ──────────────────────────────────────────────────────
    with Timer("Embedding + FAISS index"):
        embedder, faiss_index = build_index(all_chunks)

    # ── Q&A loop ─────────────────────────────────────────────────────────
    questions = [
        "What is the Quantity Theory of Money?",
        "What did Friedman mean by a 'Counter-Revolution in Monetary Theory'?",
        "What caused the Great Depression?",
        "What is Monetarism?",
        "What causes inflation?",
        "What caused the inflation episode in 2022 and early 2023"
    ]

    DOC_MAPPING = {f"{i}.pdf": f"PE{i}" for i in range(1, 11)}

    rows = []
    qa_loop_start = time.perf_counter()

    for idx, question in enumerate(questions, 1):
        print(f"\nQ{idx}/{len(questions)}: {question}")

        answer, source_docs, timings = query_rag(
            question, embedder, faiss_index, all_chunks, model=OLLAMA_MODEL
        )

        print("Printing the answer:")
        print(answer)
        print("Done printing the answer....... ")

        # Per-question timing breakdown
        print(
            f"  retrieval={timings.get('retrieval_s', 0):.4f}s | "
            f"generation={timings.get('generation_s', 0):.2f}s | "
            f"total={timings.get('total_s', 0):.2f}s | "
            f"tokens_generated={timings.get('eval_tokens', 0)} | "
            f"speed={timings.get('tokens_per_s', 0):.1f} tok/s"
        )
        # print(f"  A: {answer[:120]}…")

        rows.append(
            {
                "Question":       question,
                "Answer":         answer,
                "Extracted from": [DOC_MAPPING.get(d, d) for d in source_docs],
                "Retrieval (s)":  timings.get("retrieval_s", 0),
                "Generation (s)": timings.get("generation_s", 0),
                "Total (s)":      timings.get("total_s", 0),
                "Prompt tokens":  timings.get("prompt_tokens", 0),
                "Output tokens":  timings.get("eval_tokens", 0),
                "Tokens/s":       timings.get("tokens_per_s", 0),
            }
        )

    total_qa_time = time.perf_counter() - qa_loop_start

    # ── Summary stats ─────────────────────────────────────────────────────
    df = pd.DataFrame(rows)
    # df["Answer"] = df["Answer"].apply(extract_answer)

    mapping = {
        "paper1.pdf": "EI1",
        "paper2.pdf": "EI2",
        "paper3.pdf": "EI3"
    }

    df["Extracted from"] = df["Extracted from"].apply(
        lambda lst: [mapping.get(item, item) for item in lst]
    )

    print("\n" + "=" * 60)
    print("TIMING SUMMARY")
    print("=" * 60)
    print(f"  Total Q&A time          : {total_qa_time:.2f}s")
    print(f"  Questions answered      : {len(questions)}")
    print(f"  Avg time per question   : {total_qa_time / len(questions):.2f}s")
    print(f"  Avg retrieval time      : {df['Retrieval (s)'].mean():.4f}s")
    print(f"  Avg generation time     : {df['Generation (s)'].mean():.2f}s")
    print(f"  Avg output tokens       : {df['Output tokens'].mean():.1f}")
    print(f"  Avg speed               : {df['Tokens/s'].mean():.1f} tok/s")
    print(f"  Slowest question        : {df.loc[df['Total (s)'].idxmax(), 'Question']}")
    print(f"  Fastest question        : {df.loc[df['Total (s)'].idxmin(), 'Question']}")
    print("=" * 60)

    df.to_csv("./generated_responses/mistral_responses.csv", index=False)
    print("\nSaved results (with timings) to mistral_responses.csv")
