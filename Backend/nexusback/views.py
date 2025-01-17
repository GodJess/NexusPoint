from django.shortcuts import render
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import userSerializers, messengerSerializers, messageSerializers, imageSerializer, DocSerializers
from .models import User, Message, Messenger, ImageMessage, DocumentMessage
from django.db.models import Q
# Create your views here.
from .function import CreateChatID, CreateImageMessage

from django.core.files.base import ContentFile
from django.core.mail import send_mail


import random

import json
import datetime



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
        

@api_view(['POST', 'GET'])
def authToken(request):
    if request.method == "POST":
        phone = request.data.get('number')
        password = request.data.get('password')

        user = User.objects.filter(user_phone=phone, password=password).first()
        if user:
            if user.user_mail != None:
                randomToken = random.randint(100000,999999)
                try:
                    send_email_example(user.user_name, randomToken, 'point.nexus@mail.ru', user.user_mail)
                    return Response({'result': True, 'token': randomToken})
                except Exception as e:
                    print(f"Ошибка отправки: {e}")
                    return Response({'result': False, 'token': None, 'error': str(e)}) # return error
            else:
                return Response({'result': True, 'token': None})
        else:
            return Response({'result': False, 'token': None})
    else:
        return Response({'result': False, 'token': None})

        
        


def send_email_example(user_name, token, fromMail, toMail):
        subject = f'Your({user_name}) auth-token'
        recipient_list = [toMail]
        send_mail(subject, str(token), fromMail, recipient_list)



        
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


@api_view(['POST', 'GET'])
def addMessage(request, key):
    if request.method == "POST":
        message = request.data.get('message')
        chat_id = request.data.get('chat_id')

        print(message, chat_id)

        if Messenger.objects.filter(chat_id = chat_id).exists():
            message = Message(chat_id = chat_id, person_id = key, text=message, data_time_message = datetime.datetime.now(), contain_files = False)
            message.save()
            return Response({"response": True})
        return Response({"response": False})

    return Response()



@api_view(['POST', "GET"])
def getCompanion(request, key):
    if request.method == "POST":
        chat_id = request.data.get('chat_id')

        try:
            messenger = Messenger.objects.filter(chat_id=chat_id).first()
        except Messenger.DoesNotExist:
            return Response()

            # Проверяем, совпадают ли ключи
        if int(key) == int(messenger.person1_id) and int(key) == int(messenger.person2_id):
            try:
                return Response(userSerializers(User.objects.filter(user_id = key).first(), many=False, context={"request": request}).data)
            except User.DoesNotExist:
                return Response()
        elif int(messenger.person1_id) == int(key) and int(key) != int(messenger.person2_id):
            try:
                return Response(userSerializers(User.objects.filter(user_id = messenger.person2_id).first(), many=False, context={"request": request}).data)
            except User.DoesNotExist:
                return Response()
        elif int(messenger.person2_id) == int(key) and int(key) != int(messenger.person1_id):
            try:
                return Response(userSerializers(User.objects.filter(user_id = messenger.person1_id).first(), many=False, context={"request": request}).data)
            except User.DoesNotExist:
                return Response()
        else:
            return Response()
    return Response()



@api_view(['GET', 'POST'])
def getMessage(request, key):
    if request.method == "GET":
        try:
            return Response(messageSerializers(Message.objects.filter(chat_id = key), many=True).data)
        except Message.DoesNotExist:
            return Response()
    return Response()

@api_view(['POST', 'GET'])
def setUserImg(request, key):
    if request.method == "POST":
        image = request.FILES.get('image')
        print(request.FILES)

        user = User.objects.filter(user_id=key).first()
        print(user.user_name)
        if user:
            # image_file = image.read() 
            user.user_img.save(image.name, image)
            user.save()
            print("Фото успешно установлено")

            return Response({'status': True})

        return Response({'status': False})

    return Response({'status': False})


@api_view(['GET'])
def getStatisticMessage(request, key):
    if request.method == 'GET':
        sentMess = Message.objects.filter(person_id = key).count()
        mass = Messenger.objects.filter(Q(person1_id=key) | Q(person2_id=key))

        top5 = {
            'One': 0,
            'Two': 0,
            'Three': 0,
            'Four': 0,
            'Five': 0,
            'Six' : 0
            }
        
        

        receivedMess = 0
        
        for el in mass:
            received = Message.objects.filter(chat_id = el.chat_id).exclude(person_id = key).count()
            receivedMess = int(receivedMess) + int(received)

            chat = Message.objects.filter(chat_id = el.chat_id).count()

            if int(chat) > int(top5.get('One')):
                top5['One'] = chat
            elif int(chat) > int(top5.get("Two")):
                top5['Two'] = chat
            elif int(chat) > int(top5.get("Three")):
                top5['Three'] = chat
            elif int(chat) > int(top5.get("Four")):
                top5['Four'] = chat
            elif int(chat) > int(top5.get("Five")):
                top5['Five'] = chat
            elif int(chat) > int(top5.get("Six")):
                top5['Six'] = chat
            

        return Response({'sent': sentMess, 'received': receivedMess ,'top6': top5})
    


@api_view(["GET"])
def getLastMess(request, key):
    if request.method == "GET":
        return Response(messageSerializers(Message.objects.filter(chat_id = key).last(), context = {"request": request}, many=False).data)
    

@api_view(['GET'])
def getImages(request, messageId):
    if request.method == "GET":
        try:
            model = ImageMessage.objects.filter(message_id = messageId)
            return Response(imageSerializer(model, many = True, context={"request": request}).data)
        
        except ImageMessage.DoesNotExist:
            print("Images not found")

        return Response()
    
@api_view(['GET'])
def getDocuments(request, messageId):
    if request.method == "GET":
        try:
            model = DocumentMessage.objects.filter(message_id = messageId)
            return Response(DocSerializers(model, many = True, context={"request": request}).data)
        
        except DocumentMessage.DoesNotExist:
            print("Images not found")

        return Response()



# @api_view(["POST"])
# def uploadImageMessage(request, key):
#     if request.method == "POST":
#         message_id = CreateImageMessage()

#         chat_id = request.data.get('chat_id')
#         message = request.data.get('message')
#         listImage = request.FILES.getlist('photos')


#         print(f"Полученные файлы: {listImage}")

#         if Messenger.objects.filter(chat_id = chat_id).exists():
#             message = Message(chat_id = chat_id, person_id = key, text=message, data_time_message = datetime.datetime.now(), message_id = message_id, contain_files = True)
#             message.save()
#             print("Сообщение успешно сохранено")
#             for element in listImage:
#                 image = ImageMessage(message_id = message_id, photo=element)

#                 image.photo.save(element.name, element)
#                 image.save()
            
#             return Response({"result": True, "message_id": message_id})
#         return Response({"result": False, "message_id": ''})
    
@api_view(["POST"])
def uploadImageMessage(request, key):
    if request.method == "POST":
        message_id = CreateImageMessage()

        chat_id = request.data.get('chat_id')
        message = request.data.get('message')
        listFiles = request.FILES.getlist('photos')
        typeMessage = request.data.get('type')

        print(f"Полученные файлы: {listFiles}")

        if Messenger.objects.filter(chat_id = chat_id).exists():
            message = Message(chat_id = chat_id, person_id = key, text=message, data_time_message = datetime.datetime.now(), message_id = message_id, contain_files = True)
            message.save()
            print("Сообщение успешно сохранено")
            SaveFiles(typeMessage, listFiles, message_id)
            
            return Response({"result": True, "message_id": message_id})
        return Response({"result": False, "message_id": ''})



def SaveFiles(typeMessage, list, message_id):
    if typeMessage == 'image':
         for element in list:
            image = ImageMessage(message_id = message_id, photo=element)

            image.photo.save(element.name, element)
            image.save()
    elif typeMessage == 'document':
        for element in list:
            doc = DocumentMessage(message_id = message_id, document = element)

            doc.document.save(element.name, element)
            doc.save()


@api_view(["GET"])
def TopUsers(request):
    if request.method == "GET":
        users = User.objects.all()

        mass = []

        for el in users:
            count = Message.objects.filter(person_id = el.user_id).count()
            mass.append({'user_id': el.user_id, "user_name": el.user_name ,  "count": count})

        return Response(mass)
    return Response()
    
@api_view(['GET'])
def getPhoto(request, key):
    if request.method == "GET":
        try:
            user = User.objects.get(user_id=key)
            serializer = userSerializers(user, context={'request': request})
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response()
    return Response()