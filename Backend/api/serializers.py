from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = ('title','description','price','category','file','image')


    CATEGORY_CHOICES = [
        ('Science', 'Science'),
        ('Mathematics', 'Mathematics'),
        ('Literature', 'Literature'),
        ('Others', 'Others'),
    ]
    title = models.CharField(unique=True, max_length=100, default="Untitled")
    description = models.TextField(max_length=400)
    price = models.FloatField()
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)
    file = models.FileField(upload_to='notes/', null=True, blank=True)
    image = models.ImageField(upload_to='images/', null=True, blank=True)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
       user = User.objects.create_user(**validated_data)
       return user