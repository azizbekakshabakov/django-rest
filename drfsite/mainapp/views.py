from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import PageNumberPagination

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


class CommentAPIListPagination(PageNumberPagination):
    page_size = 3
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