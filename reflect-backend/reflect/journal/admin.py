from django.contrib import admin
from .models import JournalEntry, Tag, EntryTag, Mood, MoodType, CalendarView

class JournalEntryInline(admin.TabularInline):  # or admin.StackedInline for a more detailed layout
    model = JournalEntry
    extra = 0  # Do not display empty forms for new journal entries
    fields = ('title', 'content', 'photo_url', 'video_url', 'audio_file', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')  # Make timestamp fields read-only

class JournalEntryAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'created_at', 'updated_at')
    search_fields = ('title', 'content', 'user__username')
    list_filter = ('created_at', 'updated_at')

admin.site.register(JournalEntry, JournalEntryAdmin)
admin.site.register(Tag)
admin.site.register(EntryTag)
admin.site.register(Mood)
admin.site.register(MoodType)
admin.site.register(CalendarView)