from django.urls import path
from . import views

urlpatterns = [
    path('0/<str:model_name>/', views.API_CALL, name='api_call'),
]
