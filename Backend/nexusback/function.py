from .models import Messenger
import random

def CreateChatID():
    number = 0
    flag = True
    while flag:
        number = random.randint(1, 20000000)
        if Messenger.objects.filter(chat_id = number):
            print('чат с таким id уже есть')
        else:
            flag = False
            return number