from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JournalEntryViewSet, TagViewSet, MoodTypeViewSet, MoodViewSet, CalendarViewSet, EntryTagViewSet

router = DefaultRouter()
router.register(r'entries', JournalEntryViewSet, basename='journal-entries')
router.register(r'tags', TagViewSet, basename='tags')
router.register(r'entrytags', EntryTagViewSet, basename='entrytags')
router.register(r'mood-types', MoodTypeViewSet, basename='mood-types')
router.register(r'moods', MoodViewSet, basename='moods')
router.register(r'journal/calendar', CalendarViewSet, basename='calendar')


urlpatterns = [
    path('', include(router.urls)),
]