from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import *
from .serializers import *

# class VideoAPIView(APIView):
#     def get(self, request):
#         videos = Video.objects.all().values()
#         return Response({'videos': list(videos)})

# class VideoAPIView(generics.ListAPIView):
#     queryset = Video.objects.all()
#     serializer_class = VideoSerializer

class CommentAPIView(APIView):
    def get(self, request):
        comments = Comment.objects.all()
        return Response({'comments': CommentSerializer(comments, many=True).data})
    
    def post(self, request):
        serializer = CommentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # comment_new = Comment.objects.create(
        #     content=request.data['content'],
        #     user_id=request.data['user_id'],
        #     video_id=request.data['video_id']
        #     # user_id=User.objects.get(id=request.data['user_id']),
        #     # video_id=Video.objects.get(id=request.data['video_id'])
        # )

        return Response({'comment': serializer.data})
    
    def put(self, request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        if not pk:
            return Response({'error': 'Method PUT not allowed'})
        
        try:
            instance = Comment.objects.get(pk=pk)
        except:
            return Response({'error': 'Object does not exist'})
        
        serializer = CommentSerializer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'comment': serializer.data})
    
    def delete(self, request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        if not pk:
            return Response({'error': 'Method DELETE not allowed'})
        
        try:
            asdf = Comment.objects.get(pk=pk).delete()
        except:
            return Response({'error': 'Object does not exist'})

        return Response({'comment': 'Delete comment ' + str(pk)})