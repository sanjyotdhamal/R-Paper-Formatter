from groq import Groq
import json
import os
import time
from dotenv import load_dotenv

load_dotenv(override=True)


def get_client():
    return Groq(api_key=os.getenv("GROQ_API_KEY"))


async def analyze_content(raw_text: str) -> dict:
    # Send up to 16000 chars so full papers are captured
    text_chunk = raw_text[:16000]

    prompt = f"""
You are a precise research paper content extractor. Extract EXACT text from the paper below.
DO NOT summarize. DO NOT paraphrase. Copy EXACT words from the paper as they appear.

EXTRACTION RULES:
- title: Full paper title exactly as written
- authors: ALL author names as a list. Look near the title, at the top of the paper.
- affiliation: The institution / university / department line(s) near authors. Example: "Department of Computer Science, IIT Bombay"
- email: Author email address(es) if present. Example: "john@iitb.ac.in"
- abstract: Complete abstract, word for word
- keywords: All listed keywords as a list
- introduction: ALL text from the Introduction section. PRESERVE paragraph breaks by using \\n\\n between each paragraph.
- related_work: ALL text from Related Work OR Literature Review section. Use \\n\\n between paragraphs. Leave empty string if no such section.
- methodology: ALL text from Methodology OR System Design OR Proposed Method OR Implementation section. Use \\n\\n between paragraphs.
- results: ALL text from Results OR Results and Discussion OR Experiments OR Evaluation section. Use \\n\\n between paragraphs.
- conclusion: ALL text from Conclusion OR Future Work OR Summary section. Use \\n\\n between paragraphs.
- references: Copy EACH complete reference exactly as written. Each reference is one string in the list.

IMPORTANT RULES:
1. For body sections (introduction, methodology, results, conclusion): separate each paragraph with \\n\\n
2. For authors: return as a JSON list of strings like ["Name 1", "Name 2"]
3. For references: return as a JSON list, one complete reference per item
4. Never write "not found" or "N/A" - leave as empty string "" if truly absent
5. Copy text EXACTLY — do not change words, fix grammar, or add anything

Paper text:
{text_chunk}

Return ONLY this JSON (no explanation, no markdown, just the raw JSON):
{{
    "title": "...",
    "authors": ["Author 1", "Author 2"],
    "affiliation": "...",
    "email": "...",
    "abstract": "complete abstract word for word...",
    "keywords": ["keyword1", "keyword2"],
    "introduction": "paragraph 1...\\n\\nparagraph 2...\\n\\nparagraph 3...",
    "related_work": "paragraph 1...\\n\\nparagraph 2...",
    "methodology": "paragraph 1...\\n\\nparagraph 2...",
    "results": "paragraph 1...\\n\\nparagraph 2...",
    "conclusion": "paragraph 1...\\n\\nparagraph 2...",
    "references": ["full reference 1", "full reference 2", "full reference 3"]
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
                        "content": (
                            "You are an expert research paper content extractor. "
                            "Extract EXACT text from each section preserving paragraph structure. "
                            "Separate paragraphs in body sections with \\n\\n. "
                            "Return valid JSON only, no markdown code blocks, no extra text."
                        )
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0,
                max_tokens=8000,
            )

            response_text = response.choices[0].message.content.strip()

            # Strip markdown code fences if present
            if "```json" in response_text:
                response_text = response_text.split("```json")[1].split("```")[0]
            elif "```" in response_text:
                response_text = response_text.split("```")[1].split("```")[0]

            response_text = response_text.strip()
            result = json.loads(response_text)

            # Sanitize string fields — replace "not found" / "N/A" with empty
            for key in ["title", "affiliation", "email", "abstract", "introduction",
                        "related_work", "methodology", "results", "conclusion"]:
                val = result.get(key, "")
                if not val or any(x in str(val).lower() for x in ["not found", "n/a", "not available", "not present"]):
                    result[key] = ""
                else:
                    result[key] = str(val).strip()

            # Sanitize list fields
            for key in ["authors", "keywords", "references"]:
                val = result.get(key, [])
                if not isinstance(val, list):
                    result[key] = [str(val)] if val else []
                else:
                    result[key] = [str(v).strip() for v in val if v and str(v).strip()]

            # Ensure related_work exists (older extractions may not have it)
            if "related_work" not in result:
                result["related_work"] = ""

            print(f"[AI] Extraction complete. Title: {result.get('title', 'N/A')[:60]}")
            print(f"[AI] Authors: {result.get('authors', [])}")
            print(f"[AI] Sections found: intro={bool(result.get('introduction'))}, "
                  f"methodology={bool(result.get('methodology'))}, "
                  f"results={bool(result.get('results'))}, "
                  f"conclusion={bool(result.get('conclusion'))}")
            print(f"[AI] References count: {len(result.get('references', []))}")

            return result

        except Exception as e:
            print(f"[AI] Attempt {attempt + 1} failed: {str(e)}")
            if attempt < 2:
                time.sleep(5)
            else:
                print("[AI] All attempts failed. Returning empty structure.")
                return {
                    "title": "", "authors": [], "affiliation": "", "email": "",
                    "abstract": "", "keywords": [], "introduction": "",
                    "related_work": "", "methodology": "", "results": "",
                    "conclusion": "", "references": []
                }