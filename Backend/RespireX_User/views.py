from django.shortcuts import render
from django.http import JsonResponse, FileResponse, HttpResponse
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
import requests
from requests_toolbelt.multipart import MultipartEncoder
from .GeminiAnalyze import summarize_with_gemini
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
    if not user.is_active:
        return JsonResponse({'status': False, 'message': 'Account is not active', 'method': 'POST', 'model': 'level0', 'account_type': user.account_type, 'total_hits': user.total_hits, 'hit_limit': 20, 'status_code': 400}, status=400)
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
                print("-------------------------------------",symptoms)
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

                        historyadd = {
                            f"{current_date_time}": {
                                'status': True, 
                                'message': 'File uploaded successfully', 
                                'method': 'POST', 
                                'model': 'level1', 
                                'file_path': file_path, 
                                'result': predictions, 
                                'status_code': 200
                            },
                            'result': predictions,
                            'file_path': file_path,
                        }
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

@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['email']
        password = data['password']
        user = User.objects.filter(username=username).first()
        api_data = APIUser.objects.filter(user=user).first()
        username = user.username
        auth_token = api_data.auth_token
        account_type = api_data.account_type

        if user:
            return JsonResponse({'status': True, 'message': 'Login successful', 'method': 'POST', 'model': 'level0', 'account_type': account_type, 'total_hits': 0, 'hit_limit': 20, 'status_code': 200, 'auth_token': auth_token})
        else:
            return JsonResponse({'status': False, 'message': 'Invalid username or password', 'method': 'POST', 'model': 'level0', 'account_type': '0', 'total_hits': 0, 'hit_limit': 20, 'status_code': 400}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def level0Analysis(request):
    print(request.method,request.body)
    if request.method == 'POST':
        data = json.loads(request.body)
        symptoms = data['symptoms']
        clinical_notes = data['clinical_notes']
        symptoms_data = []
        symptoms_data.append(1 if data['gender'] == 'Male' else 0)
        symptoms_data.append(data['age'])
        all_symptoms = ["SMOKING",
            "YELLOW FINGERS", 
            "ANXIETY",
            "PEER PRESSURE",
            "CHRONIC DISEASE",
            "FATIGUE",
            "ALLERGY", 
            "WHEEZING",
            "ALCOHOL CONSUMING",
            "COUGHING",
            "SHORTNESS OF BREATH",
            "SWALLOWING DIFFICULTY",
            "CHEST PAIN",
            ]
        for i in all_symptoms:
            if i in symptoms:
                symptoms_data.append(1)
            else:
                symptoms_data.append(0)
        
        print(symptoms_data)
        auth_token = data['auth_token']
        user = APIUser.objects.filter(auth_token=auth_token).first()
        if user:
            model = SymptoScan()
            symptoms = symptoms_data
            true_false_data = {}
            true_false_data['gender'] = data['gender']
            true_false_data['age'] = symptoms[1]
            true_false_data['symptoms'] = {}
            for i,j in zip(symptoms[2:],all_symptoms):
                if i == 1:
                    true_false_data['symptoms'][j] = True
                else:
                    true_false_data['symptoms'][j] = False
            symptoms = [i+1 for i in symptoms]
            symptoms[1] -= 1

            result = model.predict(symptoms)
            try:
                current_date_time = datetime.now()
                historyadd = {f"{current_date_time}": {'status': True, 'message': 'Prediction successful 868686', 'method': 'POST', 'model': 'level0', 'result': result, 'clinical_notes': clinical_notes, 'status_code': 200}}
                user.history.update(historyadd)
                user.total_hits += 1
                user.save()
                return JsonResponse({'status': True, 'message': 'Prediction successful  fgrfhtfyhfyfy', 'method': 'POST', 'model': 'level0', 'result': result, 'status_code': 200, 'clinical_notes': clinical_notes,'true_false_data': true_false_data})
            except Exception as e:
                return JsonResponse({'status': False, 'message': 'Prediction failed', 'method': 'POST', 'model': 'level0', 'result': result, 'status_code': 400})
    
        return JsonResponse({'status': True, 'message': 'Analysis successful'})
    return JsonResponse({'status': False, 'message': 'Invalid request method'}, status=405)

@csrf_exempt
def level1Analysis(request):
    print(request.method, request.FILES, request.POST)
    if request.method == 'POST':
        try:
            # Extract the image file from the request
            image_file = request.FILES.get('image')
            if not image_file:
                return JsonResponse({'status': False, 'message': 'No image file found'}, status=400)
            
            auth_token = request.POST.get('auth_token', '')
            clinical_notes = request.POST.get('clinical_notes', '')
            patient_data = request.POST.get('patient_data', '{}')
            
            # Save a copy of the image for sending in the response
            import base64
            from io import BytesIO
            
            # Reset file pointer to beginning
            image_file.seek(0)
            image_data = image_file.read()
            encoded_image = base64.b64encode(image_data).decode('utf-8')
            
            # Reset file pointer again for the API request
            image_file.seek(0)
            
            # Create a new request to the API endpoint
            api_url = 'http://127.0.0.1:8000/api/0/level1/'
            
            # Create a new MultipartEncoder for sending files
            multipart_data = MultipartEncoder(
                fields={
                    'file': (image_file.name, image_file.read(), image_file.content_type),
                    'auth_token': auth_token,
                    'clinical_notes': clinical_notes,
                    'patient_data': patient_data
                }
            )
            
            # Make the API request
            response = requests.post(
                api_url, 
                data=multipart_data,
                headers={'Content-Type': multipart_data.content_type}
            )
            print("----------------------------------------------------------------------------")
            # Check if the request was successful
            if response.status_code == 200:
                # Add the image to the response
                response_data = response.json()
                return JsonResponse(response_data)
            else:
                # Return error if API request failed
                return JsonResponse({
                    'status': False, 
                    'message': f'API Error: {response.status_code}',
                    'details': response.text
                }, status=500)
            
        except Exception as e:
            import traceback
            print(f"Error processing request: {str(e)}")
            print(traceback.format_exc())  # Print the full stack trace
            return JsonResponse({'status': False, 'message': f'Error: {str(e)}'}, status=500)
    
    return JsonResponse({'status': False, 'message': 'Invalid request method'}, status=405)

@csrf_exempt
def get_image(request):
    """
    Serve an image file from the file system based on the path parameter.
    Path should be URL-encoded and provided as a query parameter 'path'.
    """
    try:
        # Get file path from request query parameters
        file_path = request.GET.get('path')
        print(file_path)
        if not file_path:
            return HttpResponse('No file path provided', status=400)
        
        # Check if file exists
        if not os.path.exists(file_path):
            return HttpResponse('File not found', status=404)
        
        # Security check to ensure the path is within the collected_files directory
        base_dir = Path(__file__).resolve().parent.parent.parent
        collected_files_dir = os.path.join(base_dir, 'collected_files')
        
        # Normalize paths for comparison
        file_path = os.path.normpath(file_path)
        collected_files_dir = os.path.normpath(collected_files_dir)
        
        # Check if the file is within the allowed directory
        if not file_path.startswith(collected_files_dir):
            return HttpResponse('Access denied', status=403)
            
        # Determine content type based on file extension
        content_type = 'image/jpeg'  # Default to JPEG
        if file_path.lower().endswith('.png'):
            content_type = 'image/png'
        elif file_path.lower().endswith('.gif'):
            content_type = 'image/gif'
            
        # Serve the file
        return FileResponse(open(file_path, 'rb'), content_type=content_type)
        
    except Exception as e:
        import traceback
        print(f"Error serving image: {str(e)}")
        print(traceback.format_exc())
        return HttpResponse(f'Error: {str(e)}', status=500)

def get_history(request):
    if request.method == 'GET':
        auth_token = request.GET.get('auth_token')
        print(auth_token)
        user = APIUser.objects.filter(auth_token=auth_token).first()
        used_token = user.total_hits
        if user.account_type == '2':
            total_token = 1000
        elif user.account_type == '1':
            total_token = 100
        else:
            total_token = 1
        is_premium = True if user.account_type == '1' else False
        is_active = True if user.is_active else False
        print(used_token, total_token, is_premium, is_active)
        graph_data = {
            "usage": {
                "used": used_token,
                "limit": total_token
            },
            "user": {
                "isPremium": is_premium,
                "isActive": is_active
            }
        }
        return JsonResponse({'status': True, 'message': 'History fetched successfully', 'method': 'GET', 'model': 'level0', 'graph_data': graph_data, 'history': user.history})
    return JsonResponse({'status': False, 'message': 'Invalid request method'}, status=405)
@csrf_exempt
def get_insight(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        true_false_data = data['true_false_data']
        xray_analysis_result = data['xray_analysis_result']
        text = summarize_with_gemini(true_false_data, xray_analysis_result)
        print(text)
        return JsonResponse({'status': True, 'message': 'Insight fetched successfully', 'method': 'POST', 'model': 'level0', 'insight': text})
    return JsonResponse({'status': False, 'message': 'Invalid request method'}, status=405)
