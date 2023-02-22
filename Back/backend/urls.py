from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import MyTokenObtainPairView, UserViewSet, CustomTokenRefreshView, TokenObtainPairView, TokenRefreshView, whoami
from django.urls import path

from rest_framework import routers
from django.contrib import admin
from django.urls import path, include
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', include('base.urls')),
    path('api/', include('api.urls')),

    path('auth', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('me', whoami, name='me'),



] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
