from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
import uuid
from django.utils.timezone import now


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)  # Ensure superuser is active

        if 'phone_number' not in extra_fields:
            extra_fields['phone_number'] = uuid.uuid4().hex  # Use a unique placeholder value

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=150, unique=True, null=False)
    email = models.EmailField(unique=True, null=False)
    profile_picture = models.URLField(max_length=500, blank=True, null=True)  # Optional
    bio = models.CharField(max_length=500, blank=True, null=True)
    date_joined = models.DateTimeField(default=now, null=False)
    last_login = models.DateTimeField(blank=True, null=True)
    is_premium = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    #REQUIRED_FIELDS = []

    def __str__(self):
        return self.username