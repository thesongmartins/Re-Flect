from django.db import models
from django.conf import settings
from datetime import date

class JournalEntry(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="journal_entries")
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # Media attachments
    photo_url = models.URLField(max_length=200, blank=True, null=True)
    video_url = models.URLField(max_length=200, blank=True, null=True)
    audio_file = models.FileField(upload_to='journal_audio/', blank=True, null=True)

    def __str__(self):
        return self.title

class Tag(models.Model):
    name = models.CharField(max_length=50)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="tags")

    def __str__(self):
        return self.name

class EntryTag(models.Model):
    journal_entry = models.ForeignKey(JournalEntry, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)

class MoodType(models.Model):
    name = models.CharField(max_length=50, unique=True)  # e.g., "Happy", "Sad", "Anxious"
    emoji = models.CharField(max_length=10, blank=True, null=True)  # e.g., "😊", "😢", "😰"

    def __str__(self):
        return f"{self.emoji} {self.name}" if self.emoji else self.name

class Mood(models.Model):
    journal_entry = models.ForeignKey(JournalEntry, on_delete=models.CASCADE, related_name="moods")
    mood_type = models.ForeignKey(MoodType, on_delete=models.PROTECT)
    intensity = models.IntegerField(choices=[
        (1, "Slightly"),
        (2, "Moderately"),
        (3, "Very"),
        (4, "Extremely")
    ])
    notes = models.TextField(blank=True, null=True)  # Optional notes about the mood
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.mood_type.name} ({self.get_intensity_display()})"

class CalendarView(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField(default=date.today)
    journal_entry = models.ForeignKey(JournalEntry, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'date')