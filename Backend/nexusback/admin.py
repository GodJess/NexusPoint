from django.contrib import admin
from .models import User, Messenger, Message, ImageMessage

admin.site.register(User)
admin.site.register(Message)
admin.site.register(Messenger)
admin.site.register(ImageMessage)
# Register your models here.
