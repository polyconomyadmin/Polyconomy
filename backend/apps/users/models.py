import mongoengine as me
from datetime import datetime, timedelta  # ← timedelta was missing!
from werkzeug.security import generate_password_hash, check_password_hash
import secrets

class Message(me.EmbeddedDocument):
    text = me.StringField(required=True)
    sender = me.StringField(choices=["user", "ai"], required=True)
    timestamp = me.DateTimeField(default=datetime.utcnow)

class Chat(me.EmbeddedDocument):
    chat_id = me.StringField(required=True)
    title = me.StringField(default="New Chat")
    messages = me.ListField(me.EmbeddedDocumentField(Message))
    created_at = me.DateTimeField(default=datetime.utcnow)
    pinned = me.BooleanField(default=False)

class User(me.Document):
    username = me.StringField(required=True, unique=True)
    email = me.EmailField(required=True, unique=True, sparse=True)
    name = me.StringField()
    password_hash = me.StringField(required=True)
    plan = me.StringField(choices=["student", "professional", "enterprise"])
    is_admin = me.BooleanField(default=False)
    chats = me.EmbeddedDocumentListField(Chat, default=[])
    created_at = me.DateTimeField(default=datetime.utcnow)
    
    # ← These fields were used in views but never declared!
    reset_token = me.StringField(default=None)
    reset_token_expiry = me.DateTimeField(default=None)

    meta = {"collection": "users"}

    def set_password(self, raw):
        self.password_hash = generate_password_hash(raw)

    def check_password(self, raw):
        return check_password_hash(self.password_hash, raw)

    def generate_reset_token(self):
        self.reset_token = secrets.token_urlsafe(32)
        self.reset_token_expiry = datetime.utcnow() + timedelta(hours=1)
        self.save()
        return self.reset_token

    def is_reset_token_valid(self, token):
        return (
            self.reset_token == token
            and self.reset_token_expiry is not None
            and datetime.utcnow() < self.reset_token_expiry
        )

    def clear_reset_token(self):
        self.reset_token = None
        self.reset_token_expiry = None
        self.save()