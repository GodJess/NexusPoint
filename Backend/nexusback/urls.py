from django.urls import path
from . import  views


urlpatterns = [
    path('<int:key>/', views.main, name='main'),
    path('getData/', views.getData, name="getData"),
    path('getUsers/', views.getUsers, name="getUsers"),
    path('getChat/<int:key>/', views.getYourChat, name="getChat"),
    path('createChat/<int:key>/', views.createChat, name="createChat"),
]
