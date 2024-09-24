from rest_framework import serializers
from .models import User, Messenger

class userSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        
class messengerSerializers(serializers.ModelSerializer):
    class Meta:
        model = Messenger
        fields = "__all__"

