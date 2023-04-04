from django.db import models
from django.core.validators import FileExtensionValidator
from django.urls import reverse

class User(models.Model):
    username = models.CharField(max_length=255, verbose_name='Логин')
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name='URL')
    first_name = models.CharField(max_length=255, verbose_name='Имя')
    last_name = models.CharField(max_length=255, verbose_name='Фамилия')
    password = models.CharField(max_length=255)
    icon = models.ImageField(upload_to='icons/', verbose_name='Аватар')
    
    def __str__(self):
        return self.username

    def get_absolute_url(self):
        return reverse('user', kwargs={'user_slug': self.slug})

    class Meta:
        verbose_name = 'Пользователь/автор'
        verbose_name_plural = 'Пользователи/авторы'
        ordering = ['username', 'last_name', 'first_name']

class Video(models.Model):
    index = models.CharField(max_length=255, verbose_name='Индекс')
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name='URL')
    name = models.CharField(max_length=255, verbose_name='Название')
    video = models.FileField(upload_to='videos/', null=True, validators=[FileExtensionValidator(allowed_extensions=['mov','avi','mp4','webm','mkv'])], verbose_name='Видео')
    preview = models.ImageField(upload_to='previews/', verbose_name='Превьюшка')
    user = models.ForeignKey('User', on_delete=models.DO_NOTHING, verbose_name='Автор', related_name='get_videos')

    def __str__(self):
        return self.index

    def get_absolute_url(self):
        return reverse('video', kwargs={'video_slug': self.slug})
    
    class Meta:
        verbose_name = 'Видео'
        verbose_name_plural = 'Видео'
        ordering = ['pk']

class Comment(models.Model):
    content = models.TextField(verbose_name='Содержание')
    user = models.ForeignKey('User', on_delete=models.DO_NOTHING, verbose_name='Комментатор')
    video = models.ForeignKey('Video', on_delete=models.DO_NOTHING, verbose_name='Видео')

    def __str__(self):
        return self.video_id.index

    class Meta:
        verbose_name = 'Коммент'
        verbose_name_plural = 'Комменты'
        ordering = ['video_id', 'content']

class Playlist(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название')
    user = models.ForeignKey('User', on_delete=models.DO_NOTHING, verbose_name='Автор')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Плейлист'
        verbose_name_plural = 'Плейлисты'
        ordering = ['user_id', 'name']

class PlaylistContent(models.Model):
    url = models.CharField(max_length=255, verbose_name='url-адрес')
    playlist = models.ForeignKey('Playlist', on_delete=models.DO_NOTHING, verbose_name='Плейлист')

    def __str__(self):
        return self.playlist_id

    class Meta:
        verbose_name = 'Видео плейлиста'
        verbose_name_plural = 'Видео плейлиста'
        ordering = ['playlist_id', 'url']