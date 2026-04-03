from google import genai
import json
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

async def analyze_content(raw_text: str) -> dict:
    prompt = f"""
    You are a research paper expert. 
    Extract and structure the following research paper text into a JSON object.
    
    Return ONLY a valid JSON object with these exact keys:
    - title (string)
    - authors (list of strings)
    - abstract (string)
    - keywords (list of strings)
    - introduction (string)
    - methodology (string)
    - results (string)
    - conclusion (string)
    - references (list of strings)
    
    If any section is not found, use an empty string or empty list.
    Do NOT include any text before or after the JSON.
    Do NOT use markdown code blocks.
    
    Research Paper Text:
    {raw_text}
    """
    
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    
    response_text = response.text.strip()
    
    # Clean response
    if response_text.startswith("```"):
        response_text = response_text.split("```")[1]
        if response_text.startswith("json"):
            response_text = response_text[4:]
    
    return json.loads(response_text)