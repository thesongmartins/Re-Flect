from django.db import models

class Contact(models.Model):
    INQUIRY_TYPES = [
        ('GENERAL', 'General Inquiry'),
        ('TECHNICAL', 'Technical Support'),
        ('FEEDBACK', 'Feedback'),
        ('BUG', 'Bug Report'),
        ('OTHER', 'Other')
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    inquiry_type = models.CharField(max_length=20, choices=INQUIRY_TYPES)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.inquiry_type} - {self.subject} ({self.email})"

    class Meta:
        ordering = ['-created_at']