from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework.decorators import api_view
from .serializers import userSerializers
from .models import User
# Create your views here.


@api_view(['GET'])
def main(request):
    if request.method == "GET":
        return Response(userSerializers(User.objects.all(), many= True, context={'request': request}).data)