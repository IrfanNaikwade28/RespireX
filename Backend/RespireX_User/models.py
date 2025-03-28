from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('N', 'Not Prefer to Say'),
    ]
    
    # Link to the built-in User model for authentication
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_profile', null=True, blank=True)
    # Remove username and email as they're already in the User model
    phone_number = models.CharField(max_length=15)
    full_name = models.CharField(max_length=255)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    age = models.PositiveIntegerField()
    
    def __str__(self):
        if self.user:
            return self.user.username
        return f"UserProfile {self.id}"



import hashlib

class APIUser(models.Model):
    ACCOUNT_TYPE_CHOICES = [
        ('0', 'Free'),
        ('1', 'Premium'),
        ('2', 'Enterprise'),
    ]
    
    # Link to the built-in User model, allowing null for migration purposes
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='api_profile', null=True, blank=True)
    account_type = models.CharField(max_length=1, choices=ACCOUNT_TYPE_CHOICES, default='0')
    total_hits = models.PositiveIntegerField(default=0)
    up_and_running_date = models.DateTimeField(auto_now_add=True)
    history = models.JSONField(default=dict,blank=True)
    auth_token = models.CharField(max_length=64, unique=True, editable=False)
    is_active = models.BooleanField(default=True)
    
    def save(self, *args, **kwargs):
        if not self.auth_token and self.user:
            self.auth_token = hashlib.sha256(self.user.username.encode()).hexdigest()
        super().save(*args, **kwargs)
    
    def __str__(self):
        if self.user:
            return self.user.username + " " + self.account_type + " " + self.auth_token
        return "APIUser " + self.account_type

