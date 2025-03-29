from django.urls import path
from . import views

urlpatterns = [
    
    # USER LOGIN
    path('login/', views.user_login, name='user_login'),
    path('level0/', views.level0Analysis, name='level0_analysis'),
    path('level1/', views.level1Analysis, name='level1_analysis'),
    path('getimg/', views.get_image, name='get_image'),
    path('gethistory/', views.get_history, name='get_history'),
    path('get_insight/', views.get_insight, name='get_insight'),
    # API CALLS
    path('0/<str:model_name>/', views.API_CALL, name='api_call'),
]
