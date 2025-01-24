from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from journal.models import JournalEntry


class JournalEntryInline(admin.TabularInline):
    model = JournalEntry
    extra = 0
    fields = ('title', 'content', 'photo_url', 'video_url', 'audio_file', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')



@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ('id', 'username', 'email', 'bio', 'profile_picture', 'is_active', 'is_staff', 'is_superuser')
    search_fields = ('username', 'email')
    list_filter = ('is_active', 'is_staff', 'is_superuser')
    
    # Override the fieldsets to exclude `first_name` and `last_name`
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('email',)}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    # Override the add_fieldsets for creating users
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'is_active', 'is_staff', 'is_superuser'),
        }),
    )
    inlines = [JournalEntryInline]