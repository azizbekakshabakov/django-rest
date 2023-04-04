import io
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from .models import *

# class UserModel:
#     def __init__(self, username, slug, password):
#         self.username = username
#         self.slug = slug
#         self.password = password

class UserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    slug = serializers.CharField()
    password = serializers.CharField()

class VideoSerializer(serializers.Serializer):
    index = serializers.CharField()
    slug = serializers.CharField() #read_only=True
    name = serializers.CharField()
    video = serializers.CharField()
    preview = serializers.CharField()
    user_id = serializers.IntegerField()

class CommentSerializer(serializers.Serializer):
    content = serializers.CharField()
    user_id = serializers.IntegerField()
    video_id = serializers.IntegerField()

    def create(self, validated_data):
        return Comment.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.content = validated_data.get('content', instance.content)
        instance.user = validated_data.get('user', instance.user)
        instance.video = validated_data.get('video', instance.video)
        instance.save()

        return instance

# def encode():
#     model = UserModel('Akbar', 'akbar', '123')
#     model_sr = UserSerializer(model)
#     print(model_sr.data, type(model_sr.data), sep='\n')
#     json = JSONRenderer().render(model_sr.data)
#     print(json)

# def decode():
#     stream = io.BytesIO(b'{"username":"Akbar","slug":"akbar","password":"123"}')
#     data = JSONParser().parse(stream)
#     serializer = UserSerializer(data=data)
#     serializer.is_valid()
#     print(serializer.validated_data)