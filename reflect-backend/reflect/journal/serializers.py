from rest_framework import serializers
from .models import JournalEntry, Tag, EntryTag, Mood, CalendarView, MoodType
import os

class TagSerializer(serializers.ModelSerializer):
   class Meta:
       model = Tag
       fields = ['id', 'name']

class EntryTagSerializer(serializers.ModelSerializer):
   class Meta:
       model = EntryTag
       fields = '__all__'

class MoodTypeSerializer(serializers.ModelSerializer):
   class Meta:
       model = MoodType
       fields = ['id', 'name', 'emoji']

class MoodSerializer(serializers.ModelSerializer):
   mood_type = serializers.PrimaryKeyRelatedField(queryset=MoodType.objects.all())
   mood_name = serializers.CharField(source='mood_type.name', read_only=True)
   mood_emoji = serializers.CharField(source='mood_type.emoji', read_only=True)
   intensity_display = serializers.CharField(source='get_intensity_display', read_only=True)

   class Meta:
       model = Mood
       fields = ['id', 'mood_type', 'mood_name', 'mood_emoji', 'intensity', 
                'intensity_display', 'notes', 'timestamp']

class CalendarViewSerializer(serializers.ModelSerializer):
   class Meta:
       model = CalendarView
       fields = '__all__'

class JournalEntrySerializer(serializers.ModelSerializer):
   tags = serializers.ListField(
       child=serializers.CharField(max_length=50),
       write_only=True,
       required=False
   )
   mood = serializers.DictField(write_only=True, required=False)
   moods = MoodSerializer(many=True, read_only=True)

   class Meta:
       model = JournalEntry
       fields = [
           'id', 'user', 'title', 'content', 'photo_url', 'video_url', 'audio_file',
           'created_at', 'updated_at', 'tags', 'mood', 'moods'
       ]
       read_only_fields = ['user']

   def validate_audio_file(self, value):
       if value:
           # Limit file size to 5MB
           if value.size > 5 * 1024 * 1024:
               raise serializers.ValidationError("Audio file size cannot exceed 5MB")
           
           # Check file extension
           valid_extensions = ['.mp3', '.wav', '.m4a', '.ogg']
           ext = os.path.splitext(value.name)[1].lower()
           if ext not in valid_extensions:
               raise serializers.ValidationError(
                   f"Unsupported file extension. Allowed extensions are: {', '.join(valid_extensions)}"
               )
           return value

   def create(self, validated_data):
       # Pop tags and mood data
       tags = validated_data.pop('tags', [])
       mood_data = validated_data.pop('mood', None)
       
       # Create journal entry
       journal_entry = JournalEntry.objects.create(**validated_data)
       
       # Handle tags
       for tag_name in tags:
           tag, _ = Tag.objects.get_or_create(
               user=self.context['request'].user,
               name=tag_name
           )
           EntryTag.objects.create(journal_entry=journal_entry, tag=tag)
       
       # Handle mood
       if mood_data:
           Mood.objects.create(
               journal_entry=journal_entry,
               mood_type_id=mood_data.get('mood_type'),
               intensity=mood_data.get('intensity', 2),  # Default to "Moderately"
               notes=mood_data.get('notes', '')
           )
       
       return journal_entry