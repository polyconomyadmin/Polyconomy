# def query_rag(question: str) -> str:
#     """
#     Lightweight placeholder for RAG.
#     This keeps your Django app working without heavy ML dependencies.
#     """

#     try:
#         return f"This is a placeholder for the RAG query. You asked: '{question}'"

#     except Exception as e:
#         print("RAG Error:", e)
#         return "Error generating response"

"""
settings.py:
    RAG_SERVICE_URL = "https://a1b2-34-56-78-90.ngrok-free.app"  # update each Colab restart
    RAG_API_KEY = "the-same-random-string-you-set-in-Colab"
"""
RAG_API_KEY = "HX5ViUyDGJdNIwoHJElAhD3cSWGZeFD8"

import requests
from django.conf import settings


def query_rag(question: str) -> str:
    """
    Calls the remote RAG server (running in Colab, wrapping Ollama/llava)
    and returns the generated answer.
    """
    url = f"{settings.RAG_SERVICE_URL.rstrip('/')}/query"

    try:
        response = requests.post(
            url,
            json={"question": question},
            headers={"x-api-key": settings.RAG_API_KEY},
            timeout=180,  # generation can be slow on CPU/free GPU
        )
        response.raise_for_status()
        data = response.json()
        return data.get("answer", "No answer returned.")

    except requests.Timeout:
        print("RAG Error: request to remote RAG service timed out")
        return "Error: the RAG service took too long to respond."

    except requests.ConnectionError:
        print("RAG Error: could not reach remote RAG service (is the Colab notebook still running?)")
        return "Error: the RAG service is currently unreachable."

    except requests.HTTPError as e:
        print("RAG Error:", e, getattr(e.response, "text", ""))
        return "Error generating response"

    except Exception as e:
        print("RAG Error:", e)
        return "Error generating response"


def query_rag_full(question: str) -> dict:
    """
    Same as query_rag() but returns the full payload (answer, sources,
    timings) in case your views want to show retrieved source documents
    or debug performance.
    """
    url = f"{settings.RAG_SERVICE_URL.rstrip('/')}/query"

    try:
        response = requests.post(
            url,
            json={"question": question},
            # headers={"x-api-key": settings.RAG_API_KEY},
            headers={"x-api-key":"HX5ViUyDGJdNIwoHJElAhD3cSWGZeFD8"}
            timeout=180,
        )
        response.raise_for_status()
        return response.json()

    except Exception as e:
        print("RAG Error:", e)
        return {"answer": "Error generating response", "sources": [], "timings": {}}