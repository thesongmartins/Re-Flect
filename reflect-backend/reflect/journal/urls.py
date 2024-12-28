from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JournalEntryViewSet, MediaViewSet, TagViewSet, MoodViewSet

router = DefaultRouter()
router.register(r'entries', JournalEntryViewSet, basename='journalentry')
router.register(r'media', MediaViewSet, basename='media')
router.register(r'tags', TagViewSet, basename='tag')
router.register(r'moods', MoodViewSet, basename='mood')

urlpatterns = [
    path('', include(router.urls)),
]