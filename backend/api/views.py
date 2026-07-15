from rest_framework.decorators import api_view
from rest_framework.response import Response
from apps.users.models import User
# from google.oauth2 import id_token
# from google.auth.transport import requests as google_requests
import uuid

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
