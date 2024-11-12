from django.urls import path
from . import  views


urlpatterns = [
    path('<int:key>/', views.main, name='main'),
    path('getData/', views.getData, name="getData"),
    path('getUsers/', views.getUsers, name="getUsers"),
    path('getChat/<int:key>/', views.getYourChat, name="getChat"),
    path('createChat/<int:key>/', views.createChat, name="createChat"),
    path('getCompanion/<int:key>/', views.getCompanion, name="Companion"),
    path('addMessage/<int:key>/', views.addMessage, name="addMessage"),
    path('getMessage/<int:key>/', views.getMessage, name="getMessage"),
    path('setUserImg/<int:key>/', views.setUserImg, name="setUserImg"),
    path('getStatisticMessage/<int:key>/', views.getStatisticMessage, name="getStatistic"),
]
