from rest_framework import serializers
from .models import User, Messenger, Message, ImageMessage, DocumentMessage

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

class imageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageMessage
        fields = "__all__"

class DocSerializers(serializers.ModelSerializer):
    class Meta:
        model = DocumentMessage
        fields = "__all__"