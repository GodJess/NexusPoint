from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import userSerializers, messengerSerializers
from .models import User, Message, Messenger
from django.db.models import Q
# Create your views here.
from .function import CreateChatID



@api_view(['GET', 'POST'])
def main(request, key):
    if request.method == "GET":
        try:
            return Response(userSerializers(User.objects.filter(user_id=key).first(), many= False, context={'request': request}).data)
        except User.DoesNotExist:
            return Response()
    

        
@api_view(['POST'])   
def getData(request):
    if request.method == "POST":
        number = request.data.get('number')
        password = request.data.get('password')

        try:
            return Response(userSerializers(User.objects.filter(user_phone= number, password=password).first(), many=False, context={'request': request}).data)
        except User.DoesNotExist:
            return Response()
        
@api_view(['GET'])
def getUsers(request):
    if request.method == "GET":
        return Response(userSerializers(User.objects.all(), many=True, context={'request': request}).data)


@api_view(['GET'])
def getYourChat(request, key):
    if request.method == "GET":
        # messenger_from_you = Messenger.objects.filter(person1_id = key)
        # messenger_to_me = Messenger.objects.filter(person2_id = key)
        try:
            combined_messengers = Messenger.objects.filter(
                Q(person1_id=key) | Q(person2_id=key)
            )
            return Response(messengerSerializers(combined_messengers, many= True,  context={'request': request}).data)
        except Messenger.DoesNotExist:
            return HTTP_400_BAD_REQUEST


@api_view(['POST', 'GET'])
def createChat(request, key):
    if request.method == "POST":
        person_id = request.data.get('personId')
        number = CreateChatID()

        try:
            messenger = Messenger(chat_id=number, person1_id=key, person2_id=person_id)
            messenger.save() 
            

            return Response({'chat_id': number}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": "GET request not supported"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


