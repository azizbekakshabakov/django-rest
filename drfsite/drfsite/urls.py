"""
URL configuration for drfsite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from drfsite import settings
from mainapp.views import *

# router = routers.DefaultRouter()
# router.register(r'comment', CommentViewSet) #basename='custom-url'
# print(router.urls)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/drf-auth/', include('rest_framework.urls')),


    path('api/v1/comment/', CommentAPIList.as_view()),
    path('api/v1/comment/<int:pk>/', CommentAPIUpdate.as_view()),
    path('api/v1/commentdelete/<int:pk>', CommentAPIDestroy.as_view()),

    path('api/v1/video/', VideoAPIList.as_view()),
    path('api/v1/video/<int:pk>/', VideoAPIUpdate.as_view()),

    # path('api/v1/video/', VideoViewSet.as_view({'get': 'list', 'post': 'create'})),
    # path('api/v1/video/<int:pk>/', VideoViewSet.as_view({'put': 'update', 'get': 'retrieve', 'delete': 'destroy'})),
    
    path('api/v1/user/', UserViewSet.as_view({'get': 'list'})),


    path('api/v1/auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),

    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # path('api/v1/', include(router.urls)), #/api/v1/comment/

    # path('api/v1/commentlist/', CommentViewSet.as_view({'get': 'list'})),
    # path('api/v1/commentlist/<int:pk>', CommentViewSet.as_view({'put': 'update'})),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)