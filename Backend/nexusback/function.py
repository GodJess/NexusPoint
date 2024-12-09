from .models import Messenger, Message
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