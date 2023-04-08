from django.contrib import admin

from .models import *

# class UserAdmin(admin.ModelAdmin):
#     list_display = ('id', 'username', 'first_name', 'last_name', 'icon')
#     list_display_links = ('id', 'username')
#     search_fields = ('username', 'first_name', 'last_name')
#     list_editable = ('first_name', 'last_name')
#     list_filter = ('first_name',)
#     prepopulated_fields = {'slug': ('first_name', 'last_name')}

class VideoAdmin(admin.ModelAdmin):
    list_display = ('id', 'index', 'name', 'video', 'preview', 'user')
    list_display_links = ('id', 'index')
    search_fields = ('index',)
    list_editable = ('user',)
    list_filter = ('index',)
    prepopulated_fields = {'slug': ('name',)}

class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'content', 'user', 'video')
    list_display_links = ('id',)
    search_fields = ('content', 'video')
    list_editable = ('content',)
    list_filter = ('content', 'video')

class PlaylistAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'user')
    list_display_links = ('id',)
    search_fields = ('name',)
    list_editable = ('name',)
    list_filter = ('name', 'user')

class PlaylistContentAdmin(admin.ModelAdmin):
    list_display = ('id', 'url', 'playlist')
    list_display_links = ('id',)
    search_fields = ('playlist',)
    list_editable = ('url',)
    list_filter = ('playlist',)

# admin.site.register(User, UserAdmin)
admin.site.register(Video, VideoAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Playlist, PlaylistAdmin)
admin.site.register(PlaylistContent, PlaylistContentAdmin)