from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Custom serializer to include the user ID
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['user_id'] = user.id
        token['username'] = user.username

        return token

class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = ('id', 'title', 'description', 'price', 'category', 'file', 'image', 'user')
        read_only_fields = ('user',)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['user'] = request.user  # Automatically set the user
        return super().create(validated_data)

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['user', 'title', 'price']