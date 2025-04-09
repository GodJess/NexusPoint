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
    password = models.CharField("password", max_length=100, default='', null=True)
    
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
    message_id = models.CharField("message id", max_length= 100, null=True, default="")
    contain_files = models.BooleanField(default=False)
    
    def __str__(self):
        return self.chat_id
    
    class Meta:
        verbose_name = "Message"
        verbose_name_plural = "messages"

class ImageMessage(models.Model):
    message_id = models.CharField("message id", max_length= 100, null=True, default="")
    photo = models.ImageField(upload_to = 'images/',blank=True)

    def __str__(self):
        return self.message_id
    
    class Meta:
        verbose_name = "Image"
        verbose_name_plural = "Images"

class DocumentMessage(models.Model):
    message_id = models.CharField("message id", max_length= 100, null=True, default="")
    document = models.FileField(upload_to='uploads/')

    def __str__(self):
        return self.message_id
    
    class Meta:
        verbose_name = "Document"
        verbose_name_plural = "Documents"

class VideoMessage(models.Model):
    message_id = models.CharField("message id", max_length= 100, null=True, default="")
    video = models.FileField(upload_to='videos/')

    def __str__(self):
        return self.message_id
    
    class Meta:
        verbose_name = "Video"
        verbose_name_plural = "Videos"


class Application(models.Model):
    login = models.CharField('Login', max_length=10)
    first_name = models.CharField('name', max_length=30)
    last_name = models.CharField('surname', max_length=30)
    date_birthday = models.DateTimeField(auto_now_add=True)
    country = models.CharField('country', max_length=100)
    email = models.CharField('mail', max_length=100)
    phone = models.CharField('phone', max_length=14)
    description = models.TextField('descript', max_length=500)
    access_token = models.TextField('accessToken', max_length=100, null= True)
    status = models.CharField('status', default="onCheck", max_length=100, null= True)
    

    def __str__(self):
        return self.login
    
    class Meta:
        verbose_name = "Aplication"
        verbose_name_plural = "Aplications"