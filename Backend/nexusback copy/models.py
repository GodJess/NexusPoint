from django.db import models


# Create your models here.

class User(models.Model):
    user_id = models.CharField('user_id', max_length=100)
    user_name = models.CharField('user name', max_length=100)
    user_first_name = models.CharField('user first_name', max_length=100)
    user_last_name = models.CharField('user last_name', max_length=100)
    user_date_birth = models.DateField('user_date_birth')
    user_descript = models.CharField('user description', max_length=100, default="I'm busy")
    user_mail = models.CharField('user mail', max_length=100, default = "")
    user_phone = models.CharField('phone', max_length=12)
    user_img = models.ImageField(upload_to = 'images/',blank=True, null=True, default="images/user.png")
    password = models.CharField("password", max_length=100, default='')
    
    def __str__(self):
        return self.user_id
    
    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        
        
class Messenger(models.Model):
    chat_id = models.CharField("id chat", max_length=100)
    person1_id = models.CharField('person 1', max_length=100)
    person2_id = models.CharField('person 2', max_length=100)
    
    def __str__(self):
        return self.chat_id
    
    class Meta:
        verbose_name = "Messenger"
        verbose_name_plural = "Messengers"


class Message(models.Model):
    chat_id = models.CharField("id chat", max_length=100)
    person_id = models.CharField('person id', max_length=100)
    text = models.TextField('text field message', max_length=2000)
    data_time_message = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.chat_id
    
    class Meta:
        verbose_name = "Message"
        verbose_name_plural = "messages"