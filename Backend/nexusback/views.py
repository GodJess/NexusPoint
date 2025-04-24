from django.shortcuts import render
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import userSerializers, messengerSerializers, messageSerializers, imageSerializer, DocSerializers, VideoSerializers, ApplicSerializers
from .models import User, Message, Messenger, ImageMessage, DocumentMessage, VideoMessage, Application
from django.db.models import Q
# Create your views here.
from .function import CreateChatID, CreateImageMessage, CheckChangesData, generate_random_string, CreateUserID, generate_strong_password

from django.middleware.csrf import get_token

from django.core.files.base import ContentFile
from django.core.mail import send_mail


import random

import json
import datetime
# from datetime import datetime



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
            if User.objects.filter(user_phone= number, password=password).exists():
                return Response(userSerializers(User.objects.filter(user_phone= number, password=password).first(), many=False, context={'request': request}).data)
            elif User.objects.filter(user_mail = number, password=password).exists():       
                return Response(userSerializers(User.objects.filter(user_mail= number, password=password).first(), many=False, context={'request': request}).data)
        except User.DoesNotExist:
            return Response()
        

@api_view(['POST', 'GET'])
def authToken(request):
    if request.method == "POST":
        phone = request.data.get('number')
        password = request.data.get('password')

        if User.objects.filter(user_phone=phone, password=password).exists():
            user = User.objects.filter(user_phone=phone, password=password).first()
        elif User.objects.filter(user_mail=phone, password=password).exists():
            user = User.objects.filter(user_mail=phone, password=password).first()

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
            if CheckCreateChat(key, person_id) != True and CheckCreateChat(person_id, key) != True:
                messenger = Messenger(chat_id=number, person1_id=key, person2_id=person_id)
                messenger.save() 
            
                return Response({'chat_id': number}, status=status.HTTP_201_CREATED)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": "GET request not supported"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


def CheckCreateChat(one, two):
    return Messenger.objects.filter(person1_id = one, person2_id = two).exists()

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
    
@api_view(['GET'])
def getVideos(request, messageId):
    if request.method == "GET":
        try:
            model = VideoMessage.objects.filter(message_id = messageId)
            return Response(VideoSerializers(model, many = True, context={"request": request}).data)
        
        except VideoMessage.DoesNotExist:
            print("Images not found")

        return Response()


@api_view(['GET'])
def getCountMessages(request, key):
    if request.method == "GET":
        try:
            count = Message.objects.filter(chat_id = key)
            return Response({'count': count.count()})
        except Message.DoesNotExist:
            pass

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
    elif typeMessage == 'video':
        for element in list:
            video = VideoMessage(message_id = message_id, video = element)

            video.video.save(element.name, element)
            video.save()



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


@api_view(['POST'])
def changeData(request, key):
    if request.method == "POST":
        login = request.data.get('user_name')
        fname = request.data.get('user_first_name')
        lname = request.data.get('user_last_name')
        date_birth = request.data.get('user_date_birth')
        descript = request.data.get('user_descript')
        mail = request.data.get('user_mail')

        user = User.objects.filter(user_id = key).first()

        if user:
           response =  CheckChangesData(login, fname, lname, date_birth, descript, mail, user, key)
           if response == "Success":
               return Response({"change": True})
           else:
               return Response({"change" : False, "error": "This user_login has already been reserves"}) 
        else:
            return Response({"change": False, "error": "Third-party issues"})
    else:
        return Response({})


@api_view(['POST', 'GET'])
def ConfirmCode(request, key):
    if request.method == "GET":
       
       user = User.objects.filter(user_id = key).first()
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
        return Response({'result': True, 'token': None})
       

    

@api_view(["POST", "GET"])
def ChangePassword(request, key):
    if request.method == "POST":
        password = request.data.get('password')

        try:
            user = User.objects.filter(user_id = key).first()
            if user:
                user.password = password
                user.save()

                return Response({'result': True})
            else:
                return Response({})
        except User.DoesNotExist:
            return Response({})
    else:
        return Response({})

@api_view(["GET"])
def DeleteChat(request, key):
    if request.method == "GET":
        try:
            if Messenger.objects.filter(chat_id = key).exists():
                messages = Message.objects.filter(chat_id = key)
                if messages:
                    for el in messages:
                        if ImageMessage.objects.filter(message_id = el.message_id).exists():
                            ImageMessage.objects.filter(message_id = el.message_id).delete()
                        if DocumentMessage.objects.filter(message_id = el.message_id).exists():
                            DocumentMessage.objects.filter(message_id = el.message_id).delete()
                        if VideoMessage.objects.filter(message_id = el.message_id).exists():
                            VideoMessage.objects.filter(message_id = el.message_id).delete()
                Messenger.objects.filter(chat_id = key).delete()
                return Response({"result" : True})
        except Messenger.DoesNotExist:
            return Response({"result" : False})
        


@api_view(["GET"])
def DeleteChatHistory(request, key):
    if request.method == "GET":
        try:
            if Message.objects.filter(chat_id = key).exists():
                messages = Message.objects.filter(chat_id = key)
                for el in messages:
                    if ImageMessage.objects.filter(message_id = el.message_id).exists():
                        ImageMessage.objects.filter(message_id = el.message_id).delete()
                    if DocumentMessage.objects.filter(message_id = el.message_id).exists():
                        DocumentMessage.objects.filter(message_id = el.message_id).delete()
                    if VideoMessage.objects.filter(message_id = el.message_id).exists():
                        VideoMessage.objects.filter(message_id = el.message_id).delete()
                Message.objects.filter(chat_id = key).delete()
                return Response({"result" : True})
            
        except Message.DoesNotExist:
            return Response({"result" : False})

@api_view(['GET'])
def GetYourChatMessages(request, key):
    if request.method == "GET":
        messages = []
        try:
            chats = Messenger.objects.filter(
                    Q(person1_id=key) | Q(person2_id=key)
                )
            
            for el in chats:
                message = Message.objects.filter(chat_id = el.chat_id).last()
                if message is not None:
                    messages.append({"chat_id": message.chat_id, "data_time_message" : message.data_time_message})
            sorted_messages = sorted(messages, key=lambda x: x['data_time_message'])
                
            return Response(sorted_messages)

        except (Messenger.DoesNotExist ,Message.DoesNotExist):
            return Response()


@api_view(['POST', 'GET'])
def CheckApplications(request):
    if request.method == "POST":
        login = request.data.get('login')
        name = request.data.get('name')
        # surname = request.data.get('surname')
        # birth = request.data.get('birthday')
        # country = request.data.get('country')
        mail = request.data.get('mail')
        phone =request.data.get('phone')
        # description = request.data.get('descript')
        
        check1 = checkOne(login)
        check2 = CheckTwo(mail)
        check3 = CheckThree(phone)
        check4 =CheckFour(login)
        check5 = CheckFive(mail)
        check6 = CheckSix(phone)

        # if login != None and name != None and surname != None and birth != None and country != None and  phone != None and mail != None:
        if login != None  and phone != None and mail != None and name != None:
            if check1 != True and check2 != True and check3 != True and check4 != True and check5 != True and check6 != True:
                randomToken = random.randint(100000,999999)
                try:
                    send_email_example(name, randomToken, 'point.nexus@mail.ru', mail)
                    return Response({'result': True, 'token': randomToken})
                except Exception as e:
                    print(f"Ошибка отправки: {e}")
                    return Response({'result': False, 'token': None, 'error': str(e)}) # return error
            else:
                error = "A user with this"
                if check1 == True:
                    error += " username"
                if check2 == True:
                    error += ", mail"
                if check3 == True:
                    error += " and phone"
                if check4 == True:
                    error += " username"
                if check5 == True:
                    error += ", mail"
                if check6 == True:
                    error += " and phone"
                error += " already exists"
                return Response({'result': False, 'token': None, 'error' : error})
        else:
            return Response({'result': False, 'token': None, 'error' : 'data is not valid'})
        

def checkOne(login):
    return User.objects.filter(user_name = login).exists()

def CheckTwo(mail):
    return User.objects.filter(user_mail = mail).exists()

def CheckThree(phone):
    return User.objects.filter(user_phone = phone).exists()

def CheckFour(login):
    return Application.objects.filter(login = login).exists()

def CheckFive(mail):
    return Application.objects.filter(email = mail).exists()

def CheckSix(phone):
    return Application.objects.filter(phone = phone).exists()


        
@api_view(['POST', 'GET'])
def CreateApplications(request):
        if request.method == 'POST':
            login = request.data.get('login')
            name = request.data.get('name')
            surname = request.data.get('surname')
            birth = request.data.get('birthday')
            country = request.data.get('country')
            mail = request.data.get('mail')
            phone =request.data.get('phone')
            description = request.data.get('descript')

            check1 = checkOne(login)
            check2 = CheckTwo(mail)
            check3 = CheckThree(phone)
            check4 =CheckFour(login)
            check5 = CheckFive(mail)
            check6 = CheckSix(phone)


            if login != None and name != None and surname != None and birth != None and country != None and  phone != None and mail != None:
                if check1 != True and check2 != True and check3 != True and check4 != True and check5 != True and check6 != True:
                    application = Application(login = login, first_name = name, last_name = surname, date_birthday = birth, country = country, email = mail, phone = phone, description = description, access_token = generate_random_string())
                    application.save()
                    send_email_application(name, 'point.nexus@mail.ru', mail)
                    return Response({'result': True})
                else:
                    return Response({'result': False})      
            else:
                return Response({'result': False})  
            

def send_email_application(user_name, fromMail, toMail):
        subject = f'Your ({user_name}) application has been successfully created'
        text = 'Keep an eye on the emails. If the application is approved, you will receive a password with a login in the mail. Thank you for your choice(team of NexusPoint).'
        recipient_list = [toMail]
        send_mail(subject, text, fromMail, recipient_list)


@api_view(['GET'])
def getApplications(request, key):
    if request.method == 'GET':
        if key == 'c4bw3e9348ry23g0r23rhgs':
            try:
                return Response(ApplicSerializers(Application.objects.all(), many= True, context = {'request': request}).data)
            except Application.DoesNotExist:
                return Response({})
        return Response({})

api_view(['POST'])
def approveApplic(request):
    if request.method == 'POST':

        data = json.loads(request.body)
        token = data.get('token')

        application = Application.objects.filter(access_token = token).first()
        if application and User.objects.filter(user_name = application.login).exists() != True:
            user = User()
            user.user_id = CreateUserID()
            user.user_name = application.login
            user.user_first_name = application.first_name
            user.user_last_name = application.last_name
            user.user_date_birth = application.date_birthday
            user.user_descript = application.description
            user.user_mail = application.email
            user.user_phone = application.phone
            user.password = generate_strong_password()

            user.save()

            messanger = Messenger(chat_id = CreateChatID(), person1_id = user.user_id, person2_id = user.user_id)
            messanger.save()

            application.status = 'accept'
            application.save()
            
            send_email_application_approve(user.user_name, 'point.nexus@mail.ru', user.user_mail, user.password)
            return Response({'success': 'User created and approved', 'username': user.user_name}, status=status.HTTP_201_CREATED)
        return Response({'error': ''}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def send_email_application_approve(user_name, fromMail, toMail, password):
    subject = f'Your ({user_name}) application has been successfully created'
    text = (
        f'Dear {user_name},\n\n'
        f'Your application has been approved. Here are your login details:\n'
        f'Login: {user_name}\n'
        f'Password: {password}\n\n'
        f'Please change your password upon your first login.\n\n'
        f'Thank you for choosing NexusPoint 😄🖖.\n'
        f'Team NexusPoint.'
    )
    recipient_list = [toMail]
    send_mail(subject, text, fromMail, recipient_list)

@api_view(['POST'])
def denyApplic(request):
    if request.method == 'POST':

        token = request.data.get('token')
        application = Application.objects.filter(access_token=token).first()
        
        if application and application.status == 'onCheck':
            application.status = 'denied'
            application.save()

            send_email_application_denied(application.login, 'point.nexus@mail.ru', application.email)
            return Response({'success': 'Application denied', 'username': application.login}, status=status.HTTP_200_OK)
        return Response({'error': ''}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def send_email_application_denied(user_name, fromMail, toMail):
    subject = f'Your ({user_name}) application has been denied'
    text = (
        f'Dear {user_name},\n\n'
        f'We regret to inform you that your application has been denied.\n'
        f'If you have any questions, please feel free to contact us.\n\n'
        f'Thank you for your interest in NexusPoint.\n'
        f'Team NexusPoint.'
    )
    recipient_list = [toMail]
    send_mail(subject, text, fromMail, recipient_list)

@api_view(['GET'])
def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({"csrfToken": token})


@api_view(['GET'])
def getAllMedia(request, key):
    if request.method == 'GET':
        media = []
        messages = Message.objects.filter(chat_id=key, contain_files=True)

        for message in messages:
            images = ImageMessage.objects.filter(message_id=message.message_id)
            
            if images.exists():  # Проверяем, есть ли изображения
                if images.count() > 1:
                    for image in images:
                        media.append({
                            'id': image.id,
                            'message_id': image.message_id,
                            'photo': request.build_absolute_uri(image.photo.url) if image.photo else None
                        })
                else:
                    image = images.first()
                    media.append({
                        'id': image.id,
                        'message_id': image.message_id,
                        'photo': request.build_absolute_uri(image.photo.url) if image.photo else None
                    })
        
        return Response({'media': media})
    
    return Response(status=405)


@api_view(['GET'])
def getAllMediaDocs(request, key):
    if request.method == 'GET':
        media = []
        messages = Message.objects.filter(chat_id=key, contain_files=True)

        for message in messages:
            docs = DocumentMessage.objects.filter(message_id=message.message_id)
            
            if docs.exists():  # Проверяем, есть ли изображения
                if docs.count() > 1:
                    for doc in docs:
                        media.append({
                            'id': doc.id,
                            'message_id': doc.message_id,
                            'docs': request.build_absolute_uri(doc.document.url) if doc.document else None
                            # 'docs': request.build_absolute_uri(image.photo.url) if image.photo else None
                        })
                else:
                    doc = docs.first()
                    media.append({
                            'id': doc.id,
                            'message_id': doc.message_id,
                            'docs': request.build_absolute_uri(doc.document.url) if doc.document else None
                    })
        
        return Response({'media': media})
    
    return Response(status=405)
        
        