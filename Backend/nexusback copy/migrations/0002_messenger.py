# Generated by Django 4.2.1 on 2024-09-18 12:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nexusback', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Messenger',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chat_id', models.CharField(max_length=100, verbose_name='id chat')),
                ('person1_id', models.CharField(max_length=100, verbose_name='person 1')),
                ('person2_id', models.CharField(max_length=100, verbose_name='person 2')),
            ],
            options={
                'verbose_name': 'User',
                'verbose_name_plural': 'Users',
            },
        ),
    ]