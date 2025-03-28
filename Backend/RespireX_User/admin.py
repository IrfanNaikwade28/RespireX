from django.contrib import admin
from .models import UserProfile, APIUser

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(APIUser)
