from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import JournalEntry, Tag, Mood
from .serializers import JournalEntrySerializer, TagSerializer, MoodSerializer
from .utils import transcribe_audio

class JournalEntryViewSet(viewsets.ModelViewSet):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_create(self, serializer):
        journal_entry = serializer.save(user=self.request.user)
        if journal_entry.audio:
            transcription = transcribe_audio(journal_entry.audio.path)
            journal_entry.content = f"{journal_entry.content}\n\n[Transcription: {transcription}]"
            journal_entry.save()

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

class MoodViewSet(viewsets.ModelViewSet):
    queryset = Mood.objects.all()
    serializer_class = MoodSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(journal_entry__user=self.request.user)