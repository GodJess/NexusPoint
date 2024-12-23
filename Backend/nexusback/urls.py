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
    path('getLastMess/<int:key>/', views.getLastMess, name = "getLastMess"),
    path('getMessageImage/<int:messageId>/', views.getImages, name="getImages"),
    path('getDocuments/<int:messageId>/', views.getDocuments, name = "getDocuments"),
    path('uploadImageMessage/<int:key>/', views.uploadImageMessage, name = "uploadImageMessage"),
    path('topUsers/', views.TopUsers, name="topUsers"),
    path('getPhoto/<int:key>/', views.getPhoto, name="getPhoto")
]
