from channels.generic.websocket import AsyncWebsocketConsumer

import json
import datetime

class GetMessages(AsyncWebsocketConsumer):
    async def connect(self):

        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        
        # Присоединяемся к группе по chat_id
        await self.channel_layer.group_add(
            self.chat_id,
            self.channel_name
        )
        
        await self.accept() 

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.chat_id,
            self.channel_name
        )

    async def receive(self, text_data):
        
        data = json.loads(text_data)
        message = data.get('text')
        sender = data.get('person_id')
        message_id = data.get('message_id')
        contain_files = data.get('contain_files')

        # Отправляем сообщение всем пользователям в группе
        await self.channel_layer.group_send(
            self.chat_id,
            {
                'type': 'chat_message',
                'chat_id': self.chat_id,
                'person_id': sender,
                'text': message,
                'data_time_message': datetime.datetime.now().isoformat(),  # Преобразование времени
                'message_id': message_id,
                'contain_files': contain_files
            }
        )

    async def chat_message(self, event):    
        await self.send(text_data=json.dumps({
            'chat_id': event['chat_id'],
            'person_id': event['person_id'],
            'text': event['text'],
            'data_time_message': event['data_time_message'],
            'message_id': event['message_id'],
            'contain_files': event['contain_files']
        }))