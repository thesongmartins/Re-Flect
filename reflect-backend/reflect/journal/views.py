from rest_framework import viewsets
from .models import JournalEntry, Prompt, Tag, Mood
from .serializers import JournalEntrySerializer, PromptSerializer, TagSerializer, MoodSerializer
from rest_framework.permissions import IsAuthenticated

class JournalEntryViewSet(viewsets.ModelViewSet):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PromptViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Prompt.objects.all()
    serializer_class = PromptSerializer

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class MoodViewSet(viewsets.ModelViewSet):
    queryset = Mood.objects.all()
    serializer_class = MoodSerializer