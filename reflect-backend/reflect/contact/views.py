from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.conf import settings
from .models import Contact
from .serializers import ContactSerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [AllowAny]  # Allow anyone to submit contact forms
    http_method_names = ['post', 'get']  # Only allow POST and GET requests

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            contact = self.perform_create(serializer)
            # Send email notifications
            self.send_notification_emails(contact)
            return Response(
                {
                    "message": "Thank you for contacting us. We will get back to you soon.",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        # Only allow staff users to view all contact submissions
        if self.request.user.is_staff:
            return Contact.objects.all()
        return Contact.objects.none()

    def send_notification_emails(self, contact):
        # Send email to admin
        try:
            send_mail(
                subject=f'New Contact Form Submission: {contact.subject}',
                message=f'''
New contact form submission received:

Name: {contact.name}
Email: {contact.email}
Type: {contact.inquiry_type}
Subject: {contact.subject}
Message: {contact.message}
                ''',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ADMIN_EMAIL],
                fail_silently=True,
            )

            # Send confirmation email to user
            send_mail(
                subject='We received your message',
                message=f'''
Dear {contact.name},

Thank you for contacting us. We have received your message and will get back to you as soon as possible.

Best regards,
Your App Team
                ''',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[contact.email],
                fail_silently=True,
            )
        except Exception as e:
            print(f"Failed to send email notification: {str(e)}")