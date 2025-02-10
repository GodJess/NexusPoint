from django.contrib import admin
from .models import User, Messenger, Message, ImageMessage, DocumentMessage, VideoMessage



admin.site.register(User)
admin.site.register(Message)
admin.site.register(Messenger)
admin.site.register(ImageMessage)
admin.site.register(DocumentMessage)
admin.site.register(VideoMessage)
# Register your models here.
