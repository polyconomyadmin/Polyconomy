from django.urls import path
from . import views
from .views import (
    signup_user, login_user, get_chats, start_new_chat,
    add_message, delete_chat, pin_chat, forgot_password, reset_password
)

urlpatterns = [
    path("signup/", signup_user),
    path("login/", login_user),
    path("chats/<str:username>/", get_chats),
    path("chats/<str:username>/new/", start_new_chat),
    path("chats/<str:username>/<str:chat_id>/add/", add_message),
    path("chats/<str:username>/<str:chat_id>/delete/", delete_chat),
    path("chats/<str:username>/<str:chat_id>/pin/", pin_chat),
    path("forgot-password/", forgot_password),
    path("reset-password/", reset_password),
    # NOTE: RAG endpoints (api/query/, api/query/<task_id>/status/) are
    # registered once, directly in config/urls.py, and are NOT duplicated
    # here. rag.service.ts calls /api/query/ (no /api/users/ prefix), so
    # registering them here too would create a second, unused set of URLs.
]