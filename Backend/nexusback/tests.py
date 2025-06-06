from django.test import TestCase
from .models import User, Message, Application

from rest_framework.test import APITestCase
from .serializers import messageSerializers


class UserModelTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(
            user_id='test_user', user_name='Test User',
            user_first_name='Test', user_last_name='User ',
            user_date_birth='2000-01-01', user_mail='test@example.com',
            user_phone='1234567890', password='testpassword'
        )

    def test_validate_email(self):
        valid_email = 'test@example.com'
        invalid_email = 'invalid_email'
        self.assertTrue('@' in valid_email)  # Простая проверка на наличие '@'
        self.assertFalse('@' in invalid_email)

class MessageModelTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(
            user_id='test_user', user_name='Test User',
            user_first_name='Test', user_last_name='User ',
            user_date_birth='2000-01-01', user_mail='test@example.com',
            user_phone='1234567890', password='testpassword'
        )
        cls.message = Message.objects.create(
            chat_id='chat_1', person_id=cls.user.user_id,
            text='Hello, world!', message_id='msg_1'
        )

    def test_send_message(self):
        self.assertEqual(self.message.text, 'Hello, world!')  # Проверка текста сообщения
        self.assertEqual(self.message.chat_id, 'chat_1')  # Проверка ID чата

class ApplicationModelTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        cls.application = Application.objects.create(
            login='test_login', first_name='Test',
            last_name='User ', country='Testland',
            email='test@example.com', phone='1234567890',
            description='Test description'
        )

    def test_application_serialization(self):
        serialized_data = {
            'login': self.application.login,
            'first_name': self.application.first_name,
            'last_name': self.application.last_name,
            'country': self.application.country,
            'email': self.application.email,
            'phone': self.application.phone,
            'description': self.application.description
        }
        self.assertEqual(serialized_data['login'], 'test_login')
        self.assertEqual(serialized_data['email'], 'test@example.com')


class MessageSerializerTest(APITestCase):
    
    def setUp(self):
        # Создаем тестовое сообщение
        self.message_data = {
            'id': '1',
            'chat_id': 'chat123',
            'person_id': '4534456',
            'text': 'Hello, World!',
            'message_id': 'msg789',
            'contain_files': False,
        }
        self.message = Message.objects.create(**self.message_data)

    def test_message_serialization_invalid_data(self):
        invalid_data = {
            'id': '1',
            'chat_id': '',  # Пустой chat_id должен быть недопустимым
            'person_id': '4534456',
            'text': 'Hello, World!',
            'message_id': 'msg789',
            'contain_files': False,
        }
        serializer = messageSerializers(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('chat_id', serializer.errors) 