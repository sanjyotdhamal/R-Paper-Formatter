from groq import Groq
import json
import os
from dotenv import load_dotenv
import asyncio
from concurrent.futures import ThreadPoolExecutor

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError("❌ GROQ_API_KEY not found in .env file!")

client = Groq(api_key=api_key)

def _call_groq_api(raw_text: str) -> dict:
    """Synchronous function to call Groq API"""
    prompt = f"""
You are an expert research paper analyzer. Your job is to carefully read the research paper text below and extract all sections accurately.

IMPORTANT RULES:
1. Extract the EXACT content from the paper - do not summarize or modify
2. Return ONLY a valid JSON object - no extra text
3. Do not use markdown code blocks
4. If a section is missing, use empty string ""
5. For authors and keywords, return as list of strings
6. For references, return each reference as a separate item in the list

Extract these sections:
- title: The full title of the paper
- authors: List of all author names
- abstract: The complete abstract text
- keywords: List of keywords
- introduction: The complete introduction section
- methodology: The methodology/methods section (may be called "Methods", "Proposed Method", "Approach")
- results: The results/experiments section (may be called "Results", "Experiments", "Evaluation")
- conclusion: The conclusion section
- references: List of all references

Research Paper Text:
{raw_text[:6000]}

Return ONLY this JSON structure:
{{
    "title": "...",
    "authors": ["...", "..."],
    "abstract": "...",
    "keywords": ["...", "..."],
    "introduction": "...",
    "methodology": "...",
    "results": "...",
    "conclusion": "...",
    "references": ["...", "..."]
}}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are a research paper extraction expert. Always return valid JSON only. Never add any text before or after the JSON."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.1,
        max_tokens=4000,
    )

    response_text = response.choices[0].message.content.strip()

    # Clean response - remove any markdown
    if "```json" in response_text:
        response_text = response_text.split("```json")[1].split("```")[0]
    elif "```" in response_text:
        response_text = response_text.split("```")[1].split("```")[0]
    
    response_text = response_text.strip()

    try:
        return json.loads(response_text)
    except json.JSONDecodeError:
        # Return empty structure if parsing fails
        return {
            "title": "",
            "authors": [],
            "abstract": "",
            "keywords": [],
            "introduction": "",
            "methodology": "",
            "results": "",
            "conclusion": "",
            "references": []
        }

async def analyze_content(raw_text: str) -> dict:
    """Async wrapper for Groq API call"""
    loop = asyncio.get_event_loop()
    with ThreadPoolExecutor() as executor:
        return await loop.run_in_executor(executor, _call_groq_api, raw_text)