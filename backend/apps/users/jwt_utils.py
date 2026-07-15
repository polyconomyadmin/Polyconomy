import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator

def create_jwt(user):
    payload = {
        "user_id": str(user.id),
        "username": user.username,
        "name": user.name,
        "exp": datetime.utcnow() + timedelta(hours=24)
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")


token_generator = PasswordResetTokenGenerator()