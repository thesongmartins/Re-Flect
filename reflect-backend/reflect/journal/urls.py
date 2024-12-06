from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JournalEntryViewSet, PromptViewSet, TagViewSet, MoodViewSet

router = DefaultRouter()
router.register(r'entries', JournalEntryViewSet)
router.register(r'prompts', PromptViewSet)
router.register(r'tags', TagViewSet)
router.register(r'moods', MoodViewSet)

urlpatterns = [
    path('', include(router.urls)),
]