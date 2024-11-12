from rest_framework import serializers
from .models import User, Messenger, Message

class userSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        
class messengerSerializers(serializers.ModelSerializer):
    class Meta:
        model = Messenger
        fields = "__all__"

class messageSerializers(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"