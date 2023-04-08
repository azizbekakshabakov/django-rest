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
from django.urls import path, include

from drfsite import settings
from mainapp.views import *
from rest_framework import routers

# router = routers.DefaultRouter()
# router.register(r'comment', CommentViewSet) #basename='custom-url'
# print(router.urls)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/comment/', CommentAPIList.as_view()),
    path('api/v1/comment/<int:pk>/', CommentAPIUpdate.as_view()),
    path('api/v1/commentdelete/<int:pk>', CommentAPIDestroy.as_view()),

    # path('api/v1/', include(router.urls)), #/api/v1/comment/

    # path('api/v1/commentlist/', CommentViewSet.as_view({'get': 'list'})),
    # path('api/v1/commentlist/<int:pk>', CommentViewSet.as_view({'put': 'update'})),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)