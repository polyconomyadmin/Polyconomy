# def query_rag(text: str) -> str:
#     try:
#         # Example RAG logic
#         response = "This is a dummy RAG response for: " + text
#         return response
#     except Exception as e:
#         # Log error for debugging
#         print("RAG Error:", e)
#         return "Error generating response"


# from pypdf import PdfReader
# from sentence_transformers import SentenceTransformer
# from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
# import numpy as np
# import faiss
# import os

# # -----------------------
# # PDF / Document loading
# # -----------------------
# def load_pdfs(pdf_dir):
#     documents = []
#     for filename in os.listdir(pdf_dir):
#         if filename.endswith(".pdf"):
#             reader = PdfReader(os.path.join(pdf_dir, filename))
#             for page_num, page in enumerate(reader.pages):
#                 text = page.extract_text()
#                 documents.append({
#                     "doc": filename,
#                     "page": page_num,
#                     "text": text
#                 })
#     return documents

# def chunk_text(text, chunk_size=500, overlap=100):
#     words = text.split()
#     chunks = []
#     start = 0
#     while start < len(words):
#         end = start + chunk_size
#         chunk = " ".join(words[start:end])
#         chunks.append(chunk)
#         start += chunk_size - overlap
#     return chunks

# def chunk_text_in_loaded_documents(docs):
#     all_chunks = []
#     global_chunk_id = 0
#     for doc in docs:
#         chunks = chunk_text(doc["text"])
#         for i, chunk in enumerate(chunks):
#             all_chunks.append({
#                 "faiss_id": global_chunk_id,
#                 "doc": doc["doc"],
#                 "page": doc["page"],
#                 "chunk": i,
#                 "text": chunk
#             })
#             global_chunk_id += 1
#     return all_chunks

# # -----------------------
# # Embedding + Indexing
# # -----------------------
# print("Initializing embedder and FAISS index...")
# # loaded_documents = load_pdfs("papers")  # adjust path to your PDF folder

# import os

# BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # directory of rag.py
# papers_dir = os.path.join(BASE_DIR, "papers")          # relative path to ./papers
# loaded_documents = load_pdfs(papers_dir)

# all_chunks = chunk_text_in_loaded_documents(loaded_documents)
# embedder = SentenceTransformer("all-MiniLM-L6-v2")
# texts = [c["text"] for c in all_chunks]
# embeddings = embedder.encode(texts, convert_to_numpy=True, show_progress_bar=True)
# index = faiss.IndexFlatL2(embeddings.shape[1])
# index.add(embeddings)
# print(f"Loaded {len(all_chunks)} chunks and built FAISS index.")

# # -----------------------
# # LLM model
# # -----------------------
# print("Loading LLM model...")
# tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-base")
# model = AutoModelForSeq2SeqLM.from_pretrained("google/flan-t5-base")

# # -----------------------
# # Retrieval and generation
# # -----------------------
# def retrieve(query, k=5):
#     query_embedding = embedder.encode([query], convert_to_numpy=True)
#     distances, indices = index.search(query_embedding, k)
#     return [all_chunks[i] for i in indices[0]]

# def generate_answer(question, context):
#     prompt = f"""
# Answer the question using the context below.

# Context:
# {context}

# Question:
# {question}

# Answer:
# """
#     inputs = tokenizer(prompt, return_tensors="pt", truncation=True)
#     outputs = model.generate(**inputs, max_new_tokens=200)
#     return tokenizer.decode(outputs[0], skip_special_tokens=True)

# def query_rag(question: str) -> str:
#     """
#     This is the function Django will call.
#     Returns the RAG-generated answer for the input question.
#     """
#     try:
#         retrieved_chunks = retrieve(question, k=5)
#         context = "\n\n".join([c["text"] for c in retrieved_chunks])
#         answer = generate_answer(question, context)
#         return answer
#     except Exception as e:
#         print("RAG Error:", e)
#         return "Error generating response"


def query_rag(question: str) -> str:
    """
    Lightweight placeholder for RAG.
    This keeps your Django app working without heavy ML dependencies.
    """

    try:
        return f"This is a placeholder for the RAG query. You asked: '{question}'"

    except Exception as e:
        print("RAG Error:", e)
        return "Error generating response"