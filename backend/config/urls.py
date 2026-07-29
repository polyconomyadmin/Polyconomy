from django.urls import path, include, re_path
from apps.users.views import rag_query_submit, rag_query_status
from django.contrib import admin
from django.views.generic import TemplateView

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("api/users/", include("apps.users.urls")),
    path("api/", include("api.urls")),

    # RAG endpoints — must match exactly what rag.service.ts calls:
    #   POST /api/query/                       -> submit a question
    #   GET  /api/query/<task_id>/status/       -> poll for the result
    path("api/query/", rag_query_submit, name="rag_query_submit"),
    path("api/query/<uuid:task_id>/status/", rag_query_status, name="rag_query_status"),

    path("admin/", admin.site.urls),

    # Angular fallback LAST
    re_path(r"^(?!api/|admin/|static/).*$", TemplateView.as_view(
        template_name="frontend/index.html"
    )),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)