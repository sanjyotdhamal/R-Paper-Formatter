from groq import Groq
import json
import os
import time
from dotenv import load_dotenv

load_dotenv(override=True)

def get_client():
    return Groq(api_key=os.getenv("GROQ_API_KEY"))

async def analyze_content(raw_text: str) -> dict:
    prompt = f"""
    You are a research paper content extractor. Extract EXACT text from the paper below.
    DO NOT summarize. DO NOT paraphrase. Copy EXACT words from paper.

    RULES:
    - title: Full paper title
    - authors: ALL author names. Look carefully at top of paper near title/affiliation
    - abstract: Complete abstract word for word
    - keywords: All keywords
    - introduction: ALL text from Introduction section
    - methodology: ALL text from Methodology OR System Architecture OR Implementation section
    - results: ALL text from Results OR Results and Discussion OR Experiments OR Case Study section
    - conclusion: ALL text from Conclusion OR Future Scope section
    - references: Copy EACH complete reference exactly as written

    IMPORTANT: 
    - For authors: look for names near title or "Department" lines
    - For results: this paper may call it "Results and Discussion" or "Case Study"
    - For references: copy FULL reference text not just author names
    - Never write "not found" - always extract closest matching section

    Paper text:
    {raw_text[:9000]}

    Return ONLY this JSON:
    {{
        "title": "...",
        "authors": ["Author 1", "Author 2"],
        "abstract": "complete abstract...",
        "keywords": ["kw1", "kw2"],
        "introduction": "complete introduction...",
        "methodology": "complete methodology...",
        "results": "complete results...",
        "conclusion": "complete conclusion...",
        "references": ["full reference 1", "full reference 2"]
    }}
    """

    for attempt in range(3):
        try:
            client = get_client()
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {
                        "role": "system",
                        "content": "You are a research paper text extractor. Extract EXACT text from each section. Never summarize. Never say 'not found' - always extract whatever is closest to that section. Return valid JSON only."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0,
                max_tokens=6000,
            )

            response_text = response.choices[0].message.content.strip()

            if "```json" in response_text:
                response_text = response_text.split("```json")[1].split("```")[0]
            elif "```" in response_text:
                response_text = response_text.split("```")[1].split("```")[0]

            response_text = response_text.strip()
            result = json.loads(response_text)

            # Fix empty sections
            for key in ["title", "abstract", "introduction", "methodology", "results", "conclusion"]:
                if not result.get(key) or "not found" in str(result.get(key, "")).lower():
                    result[key] = ""

            if not result.get("authors"):
                result["authors"] = []
            if not result.get("keywords"):
                result["keywords"] = []
            if not result.get("references"):
                result["references"] = []

            return result

        except Exception as e:
            print(f"Attempt {attempt + 1} failed: {str(e)}")
            if attempt < 2:
                time.sleep(5)
            else:
                return {
                    "title": "", "authors": [], "abstract": "",
                    "keywords": [], "introduction": "", "methodology": "",
                    "results": "", "conclusion": "", "references": []
                }