"""
rag_client.py
==============
Django-side client for the remote RAG server running in Colab (wrapping
Docling + Ollama/llava), reached through an ngrok tunnel.

settings.py:
    RAG_SERVICE_URL = "https://a1b2-34-56-78-90.ngrok-free.app"  # update each Colab restart
    RAG_API_KEY = "the-same-random-string-you-set-in-Colab"
"""

import requests
from django.conf import settings

# Free-tier ngrok domains inject an HTML interstitial warning page for any
# request that doesn't send this header — not just browsers. Without it,
# response.status_code is still 200 but the body is HTML, not JSON, so
# response.json() throws and every call looks like a generic RAG failure
# even though the server is fine. This must be sent on every request.
_NGROK_HEADERS = {"ngrok-skip-browser-warning": "true"}


def _headers() -> dict:
    return {"x-api-key": settings.RAG_API_KEY, **_NGROK_HEADERS}


def query_rag(question: str) -> str:
    """
    Calls the remote RAG server and returns just the generated answer text.
    """
    url = f"{settings.RAG_SERVICE_URL.rstrip('/')}/query"

    try:
        response = requests.post(
            url,
            json={"question": question},
            headers=_headers(),
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
        # Covers 401 (bad API key) and 503 (index still loading at startup) —
        # e.response.text has the FastAPI {"detail": "..."} body.
        print("RAG Error:", e, getattr(e.response, "text", ""))
        return "Error generating response"

    except ValueError as e:
        # response.json() failed to parse — almost always means ngrok's
        # interstitial HTML page came back instead of real JSON (see
        # _NGROK_HEADERS above), or the tunnel URL is stale/wrong.
        print("RAG Error: could not parse response as JSON —", e)
        return "Error: unexpected response from the RAG service."

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
    fallback = {"answer": "Error generating response", "sources": [], "timings": {}}

    try:
        response = requests.post(
            url,
            json={"question": question},
            headers=_headers(),
            timeout=180,
        )
        response.raise_for_status()
        return response.json()

    except requests.Timeout:
        print("RAG Error: request to remote RAG service timed out")
        return {**fallback, "answer": "Error: the RAG service took too long to respond."}

    except requests.ConnectionError:
        print("RAG Error: could not reach remote RAG service (is the Colab notebook still running?)")
        return {**fallback, "answer": "Error: the RAG service is currently unreachable."}

    except requests.HTTPError as e:
        print("RAG Error:", e, getattr(e.response, "text", ""))
        return fallback

    except ValueError as e:
        print("RAG Error: could not parse response as JSON —", e)
        return {**fallback, "answer": "Error: unexpected response from the RAG service."}

    except Exception as e:
        print("RAG Error:", e)
        return fallback