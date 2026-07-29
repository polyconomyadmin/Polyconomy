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
rag integration
===================
Drop-in replacement for the placeholder query_rag(). Same signature, same
call contract — just talks to the Colab-hosted RAG server instead of
returning a canned string.
"""

import requests
from django.conf import settings

_NGROK_HEADERS = {"ngrok-skip-browser-warning": "true"}


def query_rag(question: str) -> str:
    """
    Calls the remote RAG server (running in Colab) and returns the
    generated answer. Same signature as the placeholder — safe to swap in
    with no other code changes needed.
    """
    url = f"{settings.RAG_SERVICE_URL.rstrip('/')}/query"

    try:
        response = requests.post(
            url,
            json={"question": question},
            headers={"x-api-key": settings.RAG_API_KEY, **_NGROK_HEADERS},
            timeout=180,
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

    except ValueError as e:
        print("RAG Error: could not parse response as JSON —", e)
        return "Error: unexpected response from the RAG service."

    except Exception as e:
        print("RAG Error:", e)
        return "Error generating response"