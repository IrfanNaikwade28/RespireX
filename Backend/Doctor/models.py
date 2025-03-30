from django.db import models

# Create your models here.
class Doctor(models.Model):
    username = models.CharField(max_length=150, unique=True)
    speciality = models.CharField(max_length=100)
    keywords = models.TextField(blank=True) 
    experience = models.PositiveIntegerField() 
    cases_handled = models.PositiveIntegerField(default=0) 
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00) 

    def __str__(self):
        return self.username





