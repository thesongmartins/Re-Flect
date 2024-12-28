from rest_framework import serializers
from .models import JournalEntry, Media, Tag, EntryTag, Mood

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ['id', 'file', 'uploaded_at']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class EntryTagSerializer(serializers.ModelSerializer):
    tag = TagSerializer()

    class Meta:
        model = EntryTag
        fields = ['id', 'tag']

class MoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mood
        fields = ['id', 'mood_type', 'mood_score', 'timestamp']

class JournalEntrySerializer(serializers.ModelSerializer):
    media = MediaSerializer(many=True, read_only=True)
    tags = EntryTagSerializer(many=True, read_only=True)
    moods = MoodSerializer(many=True, read_only=True)

    class Meta:
        model = JournalEntry
        fields = [
            'id', 'user', 'title', 'content', 'created_at', 'updated_at', 
            'sentiment_score', 'sentiment_label', 'media', 'tags', 'moods'
        ]
        read_only_fields = ['user', 'sentiment_score', 'sentiment_label']