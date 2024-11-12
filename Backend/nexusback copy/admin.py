from django.contrib import admin
from .models import User, Messenger, Message

admin.site.register(User)
admin.site.register(Message)
admin.site.register(Messenger)
# Register your models here.
