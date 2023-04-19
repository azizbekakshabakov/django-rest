import io
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.contrib.auth.models import User

from .models import *

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Comment
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'username', 'email')

class VideoSerializer(serializers.ModelSerializer):
    user_obj = serializers.SerializerMethodField()

    def get_user_obj(self, obj):
        return {'username': obj.user.username}

    class Meta:
        model = Video
        fields = '__all__'