from rest_framework.decorators import api_view
from rest_framework.response import Response
from apps.users.models import User
# from google.oauth2 import id_token
# from google.auth.transport import requests as google_requests
import logging
import uuid

import pymongo
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from mongoengine.connection import get_db

from apps.users.rag import check_rag_health

logger = logging.getLogger(__name__)


@require_GET
def health(request):
    """Used by the frontend on load to show a maintenance popup when we're down."""
    database = "ok"
    try:
        # Bound the ping so a dead database fails fast instead of pymongo's 30s default.
        with pymongo.timeout(5):
            get_db().client.admin.command("ping")
    except Exception as e:
        logger.error(f"Health check failed: database unreachable: {e}")
        database = "down"

    rag = "ok" if check_rag_health() else "down"
    if rag == "down":
        logger.error("Health check failed: RAG service unreachable")

    healthy = database == "ok" and rag == "ok"
    return JsonResponse(
        {"status": "ok" if healthy else "error", "database": database, "rag": rag},
        status=200 if healthy else 503,
    )

# Your Google client ID from Google Cloud Console
# GOOGLE_CLIENT_ID = "32198118178-fb6iohie9ker513hamn92c54scundun4.apps.googleusercontent.com"

# @api_view(["POST"])
# def google_auth(request):
#     token = request.data.get("token")
#     if not token:
#         return Response({"message": "Token is required"}, status=400)

#     try:
#         # Verify token
#         idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), GOOGLE_CLIENT_ID)

#         email = idinfo.get("email")
#         name = idinfo.get("name", "")
#         sub = idinfo.get("sub")  # unique Google user id

#         if not email:
#             return Response({"message": "Google auth failed"}, status=400)

#         # Check if user already exists
#         user = User.objects(username=email).first()
#         if not user:
#             # Create new user
#             user = User(
#                 username=email,
#                 name=name,
#                 password_hash=str(uuid.uuid4()),  # random password, they login via Google
#             )
#             user.save()

#         # Create JWT for frontend login
#         from apps.users.jwt import create_jwt
#         token = create_jwt(user)

#         return Response({
#             "token": token,
#             "user": {"username": user.username, "name": user.name}
#         })

#     except ValueError:
#         return Response({"message": "Invalid Google token"}, status=400)
