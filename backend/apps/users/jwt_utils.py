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


def get_user_from_request(request):
    """
    Returns the User for a valid "Authorization: Bearer <token>" header, or None
    if the header is missing, the token is invalid/expired, or the user is gone.
    """
    from .models import User  # avoid a circular import at module load

    header = request.headers.get("Authorization", "")
    if not header.startswith("Bearer "):
        return None
    try:
        payload = jwt.decode(header[len("Bearer "):], settings.SECRET_KEY, algorithms=["HS256"])
    except jwt.PyJWTError:
        return None
    return User.objects(id=payload.get("user_id")).first()
