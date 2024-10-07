
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import *
from .models import *
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# def home(request):
#     return HttpResponse("This is Homepage")

class NoteViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Notes.objects.all()
    serializer_class = NotesSerializer

    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
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