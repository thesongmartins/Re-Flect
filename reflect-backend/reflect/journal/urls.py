from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JournalEntryViewSet, TagViewSet, MoodViewSet

router = DefaultRouter()
router.register(r'entries', JournalEntryViewSet, basename='journal-entries')
router.register(r'tags', TagViewSet, basename='tags')
router.register(r'moods', MoodViewSet, basename='moods')

urlpatterns = [
    path('', include(router.urls)),
]