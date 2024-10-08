# Generated by Django 5.0.7 on 2024-09-24 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nexusback', '0003_alter_messenger_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chat_id', models.CharField(max_length=100, verbose_name='id chat')),
                ('person_id', models.CharField(max_length=100, verbose_name='person id')),
                ('text', models.TextField(max_length=2000, verbose_name='text field message')),
                ('data_time_message', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Message',
                'verbose_name_plural': 'messages',
            },
        ),
    ]
