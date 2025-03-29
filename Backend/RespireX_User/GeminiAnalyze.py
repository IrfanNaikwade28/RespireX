import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

def summarize_with_gemini(true_false_data, xray_analysis_result):
    prompt = f"""
    You are a medical expert.
    You are given with clinical notes, symptoms data in true false format, differential diagnosis data in float value.
    You need to analyze the all given data and provide a detailed analysis of the data.
    OUTPUT FORMAT: USE MARKDOWN FORMAT.
    Do not add anything like ```html or ``` in response.
    Data like
    {true_false_data}
    {xray_analysis_result}

    Generate a detailed analysis of the data.
    Use Proper Markdown Format.I want data in professional medical report format.
    Use Markdown add Spacing between paragraphs. Use Title and Subtitle to separate sections.
    Use Space Between Different Paragraph and data you can use html tags.
    Format the response like a professional medical report.
    Do not add image path in response.
    Add Space Between Different Paragraph and data you can use html tags.
    replace ** by bold in response. use h1 h2 h3 h4 h5 h6 tags for headings.
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



