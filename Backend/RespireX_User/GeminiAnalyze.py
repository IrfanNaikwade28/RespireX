import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

def summarize_with_gemini(true_false_data, xray_analysis_result):
    prompt = f"""
    Prompt:

You are an expert medical analyst.

You will receive clinical notes, symptom data in a true/false format, and differential diagnosis data in numerical values. Additionally, you may receive X-ray or imaging analysis results.

Task:
Analyze all the provided medical data.

Identify correlations between symptoms and possible diagnoses.

Provide an in-depth medical report with structured insights.

Include professional recommendations and any necessary next steps for diagnosis or treatment.

Output Format:
Use Markdown format to structure the report.

Include titles and subtitles to separate sections.

Maintain clear paragraph spacing for readability.

Ensure a professional medical tone throughout the report.

Break down findings logically, covering symptoms, imaging results, and differential diagnosis.

Data Example (Input):
Symptom Data: {true_false_data}

X-ray Analysis Results: {xray_analysis_result}

Expected Output Structure:
Patient Medical Analysis Report
1. Patient Symptoms Overview

Detailed breakdown of reported symptoms.

2. Imaging/X-ray Findings

Interpretation and observations from medical imaging.

3. Differential Diagnosis Analysis

Probability-based assessment of potential conditions.

4. Conclusion & Recommendations

Professional medical advice and next steps.

Ensure that the response is concise, well-structured, and medically accurate. Avoid unnecessary explanations and focus on clinical relevance.









    """
    response = model.generate_content(prompt)
    print(response.text)
    return response.text


def take_opinion(user_query, available_data):
    prompt = f"""
    There Are Two Inputs:
    1. User Query {user_query}
    2. Available Data {available_data}

    User Query is the query that the user has entered.
    Available Data is the data that is available in the database.

    You Need to Check If The User Query Matches With Any Of The Data In The Available Data.
    If It Matches, Return True.
    If It Does Not Match, Return False.
    
    """
    response = model.generate_content(prompt)
    return response.text



