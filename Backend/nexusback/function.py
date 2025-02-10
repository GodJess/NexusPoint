from .models import Messenger, Message, User
import random

def CreateChatID():
    number = 0
    flag = True
    while flag:
        number = random.randint(1, 200000000)
        if Messenger.objects.filter(chat_id = number):
            print('чат с таким id уже есть')
        else:
            flag = False
            return number
        
def CreateImageMessage():
    number = 0
    flag = True

    while flag:
        number = random.randint(1, 800000000)
        if Message.objects.filter(message_id = number):
            print('чат с таким id уже есть')
        else:
            flag = False
            return number
        

def CheckChangesData(login, fname, lname, date_birth, descript, mail, user, key):
    response = "Success"

    if login != user.user_name and len(str(login).strip()) > 0 and User.objects.filter(user_name = login).exclude(user_id = key).exists() == False:
        user.user_name = login
        print("логин изменен успешно")
    if fname != user.user_first_name and len(str(fname).strip()) > 0:
        user.user_first_name = fname
        print("имя изменено успешно")
    if lname != user.user_last_name and len(str(lname).strip()) > 0:
        user.user_last_name = lname
        print("фамилия изменена успешно")
    if date_birth != user.user_date_birth:
        user.user_date_birth = date_birth
    if descript != user.user_descript:
        user.user_descript = descript
    if mail != user.user_mail and len(str(mail).strip()) > 0:
        user.user_mail = mail
    elif len(str(mail).strip()) == 0:
        user.user_mail = None
    if User.objects.filter(user_name = login).exclude(user_id = key).exists():
        response = "Invalid login"
    
    user.save()
    return response