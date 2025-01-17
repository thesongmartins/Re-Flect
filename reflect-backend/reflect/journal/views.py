from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import JournalEntry, Tag, Mood, MoodType, CalendarView, EntryTag
from .serializers import JournalEntrySerializer, TagSerializer, MoodTypeSerializer, MoodSerializer, CalendarViewSerializer, EntryTagSerializer

class JournalEntryViewSet(viewsets.ModelViewSet):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

class EntryTagViewSet(viewsets.ModelViewSet):
    queryset = EntryTag.objects.all()
    serializer_class = EntryTagSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

class MoodTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MoodType.objects.all()
    serializer_class = MoodTypeSerializer

class MoodViewSet(viewsets.ModelViewSet):
    queryset = Mood.objects.all()
    serializer_class = MoodSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(journal_entry__user=self.request.user)

class CalendarViewSet(viewsets.ModelViewSet):
    queryset = CalendarView.objects.all()
    serializer_class = CalendarViewSerializer
