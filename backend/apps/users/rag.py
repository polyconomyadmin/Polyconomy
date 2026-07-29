# # def query_rag(question: str) -> str:
# #     """
# #     Lightweight placeholder for RAG.
# #     This keeps your Django app working without heavy ML dependencies.
# #     """

# #     try:
# #         return f"This is a placeholder for the RAG query. You asked: '{question}'"

# #     except Exception as e:
# #         print("RAG Error:", e)
# #         return "Error generating response"

# import requests
# from django.conf import settings

# # Free-tier ngrok domains inject an HTML interstitial warning page for any
# # request that doesn't send this header — not just browsers. Without it,
# # response.status_code is still 200 but the body is HTML, not JSON, so
# # response.json() throws and every call looks like a generic RAG failure
# # even though the server is fine. This must be sent on every request.
# _NGROK_HEADERS = {"ngrok-skip-browser-warning": "true"}


# def _headers() -> dict:
#     return {"x-api-key": settings.RAG_API_KEY, **_NGROK_HEADERS}

# def query_rag_full(question: str) -> dict:
#     """
#     Same as query_rag() but returns the full payload (answer, sources,
#     timings) in case your views want to show retrieved source documents
#     or debug performance.
#     """
#     url = f"{settings.RAG_SERVICE_URL.rstrip('/')}/query"
#     fallback = {"answer": "Error generating response", "sources": [], "timings": {}}

#     try:
#         response = requests.post(
#             url,
#             json={"question": question},
#             headers=_headers(),
#             timeout=None,
#         )
#         response.raise_for_status()
#         return response.json()

#     except requests.Timeout:
#         print("RAG Error: request to remote RAG service timed out")
#         return {**fallback, "answer": "Error: the RAG service took too long to respond."}

#     except requests.ConnectionError:
#         print("RAG Error: could not reach remote RAG service (is the Colab notebook still running?)")
#         return {**fallback, "answer": "Error: the RAG service is currently unreachable."}

#     except requests.HTTPError as e:
#         print("RAG Error:", e, getattr(e.response, "text", ""))
#         return fallback

#     except ValueError as e:
#         print("RAG Error: could not parse response as JSON —", e)
#         return {**fallback, "answer": "Error: unexpected response from the RAG service."}

#     except Exception as e:
#         print("RAG Error:", e)
#         return fallback

import time
import requests
from django.conf import settings

_NGROK_HEADERS = {"ngrok-skip-browser-warning": "true"}


def _headers() -> dict:
    return {"x-api-key": settings.RAG_API_KEY, **_NGROK_HEADERS}


def query_rag_full(question: str) -> dict:
    """
    Same as query_rag() but returns the full payload (answer, sources,
    timings) in case your views want to show retrieved source documents
    or debug performance.

    Waits indefinitely for the response body once the TCP connection
    is established. Retries only on connection failures, not on HTTP
    errors or JSON parse failures.
    """
    url = f"{settings.RAG_SERVICE_URL.rstrip('/')}/query"
    fallback = {"answer": "Error generating response", "sources": [], "timings": {}}

    max_retries = 3
    base_delay = 2  # seconds

    for attempt in range(1, max_retries + 1):
        try:
            # (connect_timeout, read_timeout)
            # 10 s to open the TCP connection, then None = wait forever
            # for the full response to arrive.
            response = requests.post(
                url,
                json={"question": question},
                headers=_headers(),
                timeout=(10, None),
            )
            response.raise_for_status()
            return response.json()

        except requests.Timeout:
            # Only the *connection* phase can time out now.
            print(f"RAG Error: connection timed out (attempt {attempt}/{max_retries})")
            if attempt < max_retries:
                time.sleep(base_delay * attempt)
                continue
            return {
                **fallback,
                "answer": "Error: the RAG service took too long to respond.",
            }

        except requests.ConnectionError:
            print(
                f"RAG Error: could not reach remote RAG service "
                f"(attempt {attempt}/{max_retries})"
            )
            if attempt < max_retries:
                time.sleep(base_delay * attempt)
                continue
            return {
                **fallback,
                "answer": "Error: the RAG service is currently unreachable.",
            }

        except requests.HTTPError as e:
            print("RAG Error:", e, getattr(e.response, "text", ""))
            return fallback

        except ValueError as e:
            print("RAG Error: could not parse response as JSON —", e)
            return {
                **fallback,
                "answer": "Error: unexpected response from the RAG service.",
            }

        except Exception as e:
            print("RAG Error:", e)
            return fallback

    return fallback