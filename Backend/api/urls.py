from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('notes',NoteViewSet, basename='notes' )

urlpatterns = router.urls



# urlpatterns = [
#     path('',home)
# ]