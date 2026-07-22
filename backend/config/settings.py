from pathlib import Path
import os
import dj_database_url
import logging
import mongoengine

BASE_DIR = Path(__file__).resolve().parent.parent

# -----------------------------
# CORE SETTINGS
# -----------------------------

SECRET_KEY = 'django-insecure-@njm1$55l!a23z+zllzfaer23k%dc$dg0d22jlnw*be^an!83@'

DEBUG = True  # ⚠️ set False in production later

ALLOWED_HOSTS = ['*']

# -----------------------------
# ENV VARIABLES
# -----------------------------

DB_USER = os.environ.get("DB_USER", "polyconomyadmin_db_user")
DB_PASSWORD = os.environ.get("DB_PASSWORD", "ltrVgKTlDNV4rhK2")
DB_NAME = os.environ.get("DB_NAME", "polyconomy-ai")
DB_CLUSTER = os.environ.get("DB_CLUSTER", "polyconomy-ai.qeib3io.mongodb.net")

# Prefer full URI from env if available
MONGO_URI = os.environ.get(
    "MONGO_URI",
    f"mongodb+srv://polyconomyadmin_db_user:ltrVgKTlDNV4rhK2@polyconomy-ai.tgqemgu.mongodb.net/"
)

# -----------------------------
# LOGGING
# -----------------------------

logger = logging.getLogger(__name__)

# -----------------------------
# MONGO CONNECTION (SAFE)
# -----------------------------
# IMPORTANT FIXES:
# - DO NOT crash app if DB fails
# - DO NOT raise exception
# - Avoid killing Heroku worker
# -----------------------------

try:
    mongoengine.disconnect_all()
    mongoengine.connect(host=MONGO_URI)
    logger.info("✅ MongoDB connected successfully")
except Exception as e:
    logger.error(f"❌ MongoDB connection failed (non-fatal): {e}")
    # DO NOT raise — prevents 503 crashes

# -----------------------------
# APPLICATION DEFINITION
# -----------------------------

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'corsheaders',

    'apps',
    'api',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',

    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / "templates"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# -----------------------------
# REST FRAMEWORK
# -----------------------------

REST_FRAMEWORK = {
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser',
    ]
}

# -----------------------------
# DATABASES
# -----------------------------
import dj_database_url
import os

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.dummy'
    }
}

# -----------------------------
# CORS
# -----------------------------

CORS_ALLOW_ALL_ORIGINS = True

# -----------------------------
# EMAIL (keep safe placeholders)
# -----------------------------

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

DEFAULT_FROM_EMAIL = 'Madara Dassanayake <madara.dassanayakemu@buckingham.ac.uk>'
EMAIL_HOST_USER = 'apikey'
EMAIL_HOST_PASSWORD = os.environ.get('SENDGRID_API_KEY')
EMAIL_HOST = 'smtp.sendgrid.net'
EMAIL_PORT = 587
EMAIL_USE_TLS = True


FRONTEND_URL = 'https://polyconomy-74386831d29f.herokuapp.com/'

# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'smtp.gmail.com'
# EMAIL_PORT = 587
# EMAIL_USE_TLS = True
# EMAIL_HOST_USER = 'your@email.com'
# EMAIL_HOST_PASSWORD = 'your-app-password'
# DEFAULT_FROM_EMAIL = 'Polyconomy-AI <your@email.com>'

# FRONTEND_URL = 'http://localhost:4200/'

# -----------------------------
# STATIC FILES
# -----------------------------

STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / "static"]
STATIC_ROOT = BASE_DIR / "staticfiles"

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# -----------------------------
# DATABASE (unused Django ORM)
# -----------------------------
# You are using MongoEngine, so Django DB is not required
# -----------------------------

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
