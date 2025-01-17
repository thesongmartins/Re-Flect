from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'inquiry_type', 'subject', 'message', 'created_at', 'resolved']
        read_only_fields = ['created_at', 'resolved']