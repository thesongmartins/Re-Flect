from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    bio = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to="profile_pics/", blank=True, null=True)

    # Resolve clashes by adding related_name attributes
    groups = models.ManyToManyField(
        'auth.Group',
        related_name="customuser_set",  # Custom reverse accessor
        blank=True,
        help_text="The groups this user belongs to.",
        verbose_name="groups",
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name="customuser_set",  # Custom reverse accessor
        blank=True,
        help_text="Specific permissions for this user.",
        verbose_name="user permissions",
    )