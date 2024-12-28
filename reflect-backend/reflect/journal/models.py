from django.db import models
from django.conf import settings
from datetime import date

# Journal Entry Model
class JournalEntry(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="journal_entries")
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Media attachments (photos, videos, audio)
    photo = models.ImageField(upload_to="journal_photos/", blank=True, null=True)
    video = models.FileField(upload_to="journal_videos/", blank=True, null=True)
    audio = models.FileField(upload_to="journal_audio/", blank=True, null=True)

    def __str__(self):
        return self.title

# Tags Model
class Tag(models.Model):
    name = models.CharField(max_length=50)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="tags")

    def __str__(self):
        return self.name

# Entry-Tag Many-to-Many Relationship
class EntryTag(models.Model):
    journal_entry = models.ForeignKey(JournalEntry, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)

# Mood Tracking Model
class Mood(models.Model):
    journal_entry = models.ForeignKey(JournalEntry, on_delete=models.CASCADE, related_name="moods")
    mood_type = models.CharField(max_length=50)
    mood_score = models.IntegerField()  # 1-10 scale
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.mood_type} ({self.mood_score})"

# Calendar Support (utility for querying entries by date)
class CalendarView(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField(default=date.today)
    journal_entry = models.ForeignKey(JournalEntry, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'date')