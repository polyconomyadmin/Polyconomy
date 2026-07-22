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