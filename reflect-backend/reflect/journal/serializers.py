from rest_framework import serializers
from .models import JournalEntry, Tag, EntryTag, Mood

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class MoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mood
        fields = ['id', 'mood_type', 'mood_score', 'timestamp']

class JournalEntrySerializer(serializers.ModelSerializer):
    tags = serializers.ListField(
        child=serializers.CharField(max_length=50),
        write_only=True,
        required=False
    )
    moods = MoodSerializer(many=True, read_only=True)

    class Meta:
        model = JournalEntry
        fields = [
            'id', 'user', 'title', 'content', 'photo', 'video', 'audio',
            'created_at', 'updated_at', 'tags', 'moods'
        ]
        read_only_fields = ['user']

    def create(self, validated_data):
        tags = validated_data.pop('tags', [])
        journal_entry = JournalEntry.objects.create(**validated_data)
        for tag_name in tags:
            tag, _ = Tag.objects.get_or_create(user=self.context['request'].user, name=tag_name)
            EntryTag.objects.create(journal_entry=journal_entry, tag=tag)
        return journal_entry