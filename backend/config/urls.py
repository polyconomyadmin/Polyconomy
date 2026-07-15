from django.urls import path, include
from apps.users.views import rag_query
from apps.users import views
from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path, re_path

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("api/users/", include("apps.users.urls")),
    path("api/", include("api.urls")),
    path('api/query/', rag_query),
    # path("api/auth/forgot-password/", views.forgot_password, name="forgot_password"),
    # path("api/auth/reset-password/",  views.reset_password,  name="reset_password"),
    path('admin/', admin.site.urls),

 # Angular fallback LAST
    re_path(r'^(?!api/|admin/|static/).*$', TemplateView.as_view(
        template_name='frontend/index.html'
    )),
]

# ADD THIS
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
