from django.core.management.base import BaseCommand
from journal.models import MoodType

class Command(BaseCommand):
    help = 'Sets up initial mood types with emojis'

    def handle(self, *args, **kwargs):
        moods = [
            {"name": "Happy", "emoji": "😊"},
            {"name": "Sad", "emoji": "😢"},
            {"name": "Anxious", "emoji": "😰"},
            {"name": "Excited", "emoji": "🎉"},
            {"name": "Peaceful", "emoji": "😌"},
            {"name": "Angry", "emoji": "😠"},
            {"name": "Tired", "emoji": "😴"},
            {"name": "Grateful", "emoji": "🙏"},
            {"name": "Stressed", "emoji": "😫"},
            {"name": "Loved", "emoji": "❤️"},
        ]

        for mood in moods:
            MoodType.objects.get_or_create(
                name=mood["name"],
                defaults={"emoji": mood["emoji"]}
            )
            self.stdout.write(
                self.style.SUCCESS(f'Successfully created mood type "{mood["name"]}" with emoji {mood["emoji"]}')
            )