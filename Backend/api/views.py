
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import *
from .models import *
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import CartItemSerializer


# def home(request):
#     return HttpResponse("This is Homepage")
class NoteViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]  # Ensure user authentication
    queryset = Notes.objects.all()
    serializer_class = NotesSerializer

    def perform_create(self, serializer):
        # Set the user before saving the serializer
        serializer.save(user=self.request.user)

    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)  # Use the perform_create method
            return Response(serializer.data, status=201)  # 201 for created status
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        note = self.queryset.get(pk=pk)
        serializer = self.serializer_class(note)
        return Response(serializer.data)

    def update(self, request, pk=None):
        note = self.queryset.get(pk=pk)
        serializer = self.serializer_class(instance=note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        note = self.queryset.get(pk=pk)
        note.delete()
        return Response(status=204)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


@api_view(['POST'])
def add_cart_item(request):
    serializer = CartItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter by user if needed
        user = self.request.user
        return CartItem.objects.filter(user=user)