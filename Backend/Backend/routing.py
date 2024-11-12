from django.urls import re_path

from .consumers import GetMessages

websocket_urlpatterns= [
    re_path(r'ws/nexusback/(?P<chat_id>\w+)/$', GetMessages.as_asgi()),
]