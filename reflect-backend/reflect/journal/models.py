from django.db import models
from django.conf import settings

class JournalEntry(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="entries")
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Sentiment Analysis
    sentiment_score = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    sentiment_label = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.title

class Media(models.Model):
    entry = models.ForeignKey(JournalEntry, on_delete=models.CASCADE, related_name="media")
    file = models.FileField(upload_to="journal_media/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class EntryTag(models.Model):
    journal_entry = models.ForeignKey(JournalEntry, on_delete=models.CASCADE, related_name="tags")
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE, related_name="entries")

class Mood(models.Model):
    journal_entry = models.ForeignKey(JournalEntry, on_delete=models.CASCADE, related_name="moods")
    mood_type = models.CharField(max_length=50)
    mood_score = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)