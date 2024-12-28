from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import JournalEntry, Media, Tag, Mood
from .serializers import JournalEntrySerializer, MediaSerializer, TagSerializer, MoodSerializer
from .utils import analyze_sentiment

class JournalEntryViewSet(viewsets.ModelViewSet):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        journal_entry = serializer.save(user=self.request.user)

        # Perform sentiment analysis using Hugging Face
        sentiment = analyze_sentiment(journal_entry.content)
        journal_entry.sentiment_label = sentiment['label']
        journal_entry.sentiment_score = sentiment['score']
        journal_entry.save()

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class MoodViewSet(viewsets.ModelViewSet):
    queryset = Mood.objects.all()
    serializer_class = MoodSerializer