from django.shortcuts import render
from django.http import HttpResponse
from dns.e164 import query
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import *
from .models import *

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