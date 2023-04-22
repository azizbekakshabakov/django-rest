from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import PageNumberPagination
# from rest_framework import filters
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend

from .permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly
from .models import *
from .serializers import *

# class CommentViewSet(viewsets.ModelViewSet):
#     queryset = Comment.objects.all()
#     serializer_class = CommentSerializer
    
#     def get_queryset(self):
#         pk = self.kwargs.get('pk')

#         if not pk:
#             return Comment.objects.all()[:3]
        
#         return Comment.objects.filter(pk=pk)

#     @action(methods=['get'], detail=True)
#     def video(self, request, pk=None):
#         videos = Video.objects.get(pk=pk)
#         return Response({'videos': videos.name})

"""
class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    filter_backends = (DjangoFilterBackend, )
    filter_fields = ('user__id', )
    permission_classes = (IsOwnerOrReadOnly, )
"""
class VideoAPIList(generics.ListCreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )
    filter_backends = (DjangoFilterBackend, )
    filterset_fields = ['user']
    # pagination_class = VideoAPIListPagination

    # def list(self, request):
    #     queryset = Video.objects.filter(pk=request.user.pk)
    #     serializer = VideoSerializer(queryset, many=True)
    #     return Response(serializer.data)

    # def list(self, request, *args, **kwargs):
    #     queryset = self.filter_queryset(self.get_queryset())

    #     page = self.paginate_queryset(queryset)
    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)

    #     serializer = self.get_serializer(queryset, many=True)
    #     return Response(serializer.data)

class VideoAPIUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = (IsOwnerOrReadOnly, ) # IsOwnerOrReadOnly
    # authentication_classes = (TokenAuthentication, )


class CommentAPIListPagination(PageNumberPagination):
    page_size = 300
    page_size_query_param = 'page_size'
    max_page_size = 10000

class CommentAPIList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )
    pagination_class = CommentAPIListPagination

class CommentAPIUpdate(generics.RetrieveUpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated, ) # IsOwnerOrReadOnly
    # authentication_classes = (TokenAuthentication, )

class CommentAPIDestroy(generics.RetrieveDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAdminOrReadOnly, )


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAdminOrReadOnly, )
    
    def get_queryset(self):
        pk = self.kwargs.get('pk')

        if not pk:
            return User.objects.all()[:3]
        
        return User.objects.filter(pk=pk)