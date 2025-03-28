from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from .models import APIUser
import sys
import os
from pathlib import Path
import json
from Model_Traning.SymptoScan import SymptoScan
# Create your views here.
@csrf_exempt
def API_CALL(request, model_name):
    print(request.method)
    if request.method == 'GET':
        return JsonResponse({'result': 'GET request received! Invalid API call!'})
    
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    
    if 'auth_token' not in data:
        return JsonResponse({'error': 'Missing auth_token'}, status=400)
    
    auth_token = data['auth_token']
    user = APIUser.objects.filter(auth_token=auth_token).first()
    
    if user:
        if request.method == 'POST':
            if model_name == 'level0':
                model = SymptoScan()
                print(model.test())
                return JsonResponse({'result': 'POST request received! API call! ---- LEVEL 0'})
            elif model_name == 'level1':
                return JsonResponse({'result': 'POST request received! API call! ---- LEVEL 1'})
            else:
                return JsonResponse({'error': 'Invalid model name'}, status=400)
        else:
            return JsonResponse({'error': 'Invalid request method'}, status=405)
    else:
        return JsonResponse({'error': 'Invalid auth_token'}, status=401)
