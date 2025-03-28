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
from Model_Traning.XrayScan import DiseasePredictor
from datetime import datetime
import hashlib
import pandas as pd
import csv

# Create your views here.
@csrf_exempt
def API_CALL(request, model_name):
    print(request.method)
    if request.method == 'GET':
        return JsonResponse({'result': 'GET request received! Invalid API call!'})
    if model_name == 'level0':
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
        
        if 'auth_token' not in data:
            return JsonResponse({'error': 'Missing auth_token'}, status=400)
        auth_token = data['auth_token']
        
    else:
        auth_token = request.POST.get('auth_token')
        if not auth_token:
            return JsonResponse({'error': 'Missing auth_token'}, status=400)
    
    user = APIUser.objects.filter(auth_token=auth_token).first()
    
    if user:
        if user.account_type == '0':
            if user.total_hits >= 20:
                return JsonResponse({'status': False, 'message': 'Free account limit reached', 'method': 'POST', 'model': 'level0', 'account_type': user.account_type, 'total_hits': user.total_hits, 'hit_limit': 20, 'status_code': 400}, status=400)
        elif user.account_type == '1':
            if user.total_hits >= 2000:
                return JsonResponse({'status': False, 'message': 'Premium account limit reached', 'method': 'POST', 'model': 'level0', 'account_type': user.account_type, 'total_hits': user.total_hits, 'hit_limit': 2000, 'status_code': 400}, status=400)
        
        if request.method == 'POST':
            if model_name == 'level0':
                model = SymptoScan()
                symptoms = data['symptoms']
                symptoms = [i+1 for i in symptoms]
                symptoms[0] -= 1
                result = model.predict(symptoms)
                if result:
                    current_date_time = datetime.now()
                    historyadd = {f"{current_date_time}": {'status': True, 'message': 'Prediction successful', 'method': 'POST', 'model': 'level0', 'result': result, 'status_code': 200}}
                    user.history.update(historyadd)
                    user.total_hits += 1
                    user.save()
                    return JsonResponse({'status': True, 'message': 'Prediction successful', 'method': 'POST', 'model': 'level0', 'result': result, 'status_code': 200})
                else:
                    return JsonResponse({'status': False, 'message': 'Prediction failed', 'method': 'POST', 'model': 'level0', 'result': result, 'status_code': 400})
            elif model_name == 'level1':
                if 'file' not in request.FILES:
                    return JsonResponse({'error': 'Missing file in request'}, status=400)
                
                uploaded_file = request.FILES['file']
                base_dir = Path(__file__).resolve().parent.parent.parent
                upload_dir = os.path.join(base_dir, 'collected_files')
                csv_path = os.path.join(base_dir, 'collected_files', 'data.csv')
                model_path = os.path.join(base_dir, 'Backend', 'Model_Traning', 'model', 'multi_disease_model.json')
                model_path2 = os.path.join(base_dir, 'Backend', 'Model_Traning', 'model', 'team7_model.h5')

                os.makedirs(upload_dir, exist_ok=True)
                current_date_time = datetime.now()
                username = user.user
                filename_string = f"{username}_{current_date_time}"
                encrypted_filename = hashlib.sha256(filename_string.encode()).hexdigest()
                file_path = os.path.join(upload_dir, f"{encrypted_filename}.jpg")
                
                try:
                    with open(file_path, 'wb') as destination:
                        for chunk in uploaded_file.chunks():
                            destination.write(chunk)
                    
                    if os.path.exists(file_path) and os.path.getsize(file_path) > 0:
                        try:
                            predictor = DiseasePredictor(model_path, model_path2)
                            predictions = predictor.predict(file_path)
                            predictions = {k: float(v) for k, v in predictions.items()}
                            
                            # CSV handling
                            csv_columns = ['image_name', 'Atelectasis', 'Cardiomegaly', 'Consolidation', 
                                         'Edema', 'Effusion', 'Emphysema', 'Fibrosis', 'Hernia', 
                                         'Infiltration', 'Mass', 'Nodule', 'Pleural_Thickening', 
                                         'Pneumonia', 'Pneumothorax']
                            
                            # Create new record
                            record = {
                                'image_name': f"{encrypted_filename}.jpg",
                                'Atelectasis': predictions.get('Atelectasis', 0),
                                'Cardiomegaly': predictions.get('Cardiomegaly', 0),
                                'Consolidation': predictions.get('Consolidation', 0),
                                'Edema': predictions.get('Edema', 0),
                                'Effusion': predictions.get('Effusion', 0),
                                'Emphysema': predictions.get('Emphysema', 0),
                                'Fibrosis': predictions.get('Fibrosis', 0),
                                'Hernia': predictions.get('Hernia', 0),
                                'Infiltration': predictions.get('Infiltration', 0),
                                'Mass': predictions.get('Mass', 0),
                                'Nodule': predictions.get('Nodule', 0),
                                'Pleural_Thickening': predictions.get('Pleural_Thickening', 0),
                                'Pneumonia': predictions.get('Pneumonia', 0),
                                'Pneumothorax': predictions.get('Pneumothorax', 0)
                            }
                            
                            # Check if CSV exists, if not create it with headers
                            file_exists = os.path.isfile(csv_path)
                            try:
                                with open(csv_path, mode='a', newline='') as csv_file:
                                    writer = csv.DictWriter(csv_file, fieldnames=csv_columns)
                                    if not file_exists:
                                        writer.writeheader()  # Write headers if file doesn't exist
                                    writer.writerow(record)
                            except Exception as e:
                                print(f"Error writing to CSV: {str(e)}")
                                
                        except Exception as e:
                            return JsonResponse({'status': False, 'message': f'Prediction error: {str(e)}'}, status=500)

                        historyadd = {f"{current_date_time}": {'status': True, 'message': 'File uploaded successfully', 'method': 'POST', 'model': 'level1', 'file_path': file_path, 'result': predictions, 'status_code': 200}}
                        user.history.update(historyadd)
                        user.total_hits += 1
                        user.save()
                        return JsonResponse(historyadd)
                    else:
                        return JsonResponse({'status': False, 'message': 'File upload failed - file not saved properly'}, status=500)
                except Exception as e:
                    return JsonResponse({'status': False, 'message': f'File upload error: {str(e)}'}, status=500)
            else:
                return JsonResponse({'error': 'Invalid model name'}, status=400)
        else:
            return JsonResponse({'error': 'Invalid request method'}, status=405)
    else:
        return JsonResponse({'error': 'Invalid auth_token'}, status=401)

def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        user = User.objects.filter(username=username, password=password).first()
        if user:
            return JsonResponse({'status': True, 'message': 'Login successful', 'method': 'POST', 'model': 'level0', 'account_type': '0', 'total_hits': 0, 'hit_limit': 20, 'status_code': 200})
        else:
            return JsonResponse({'status': False, 'message': 'Invalid username or password', 'method': 'POST', 'model': 'level0', 'account_type': '0', 'total_hits': 0, 'hit_limit': 20, 'status_code': 400}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
