import os
from docx import Document
from docx.shared import Pt, Inches
from copy import deepcopy
import uuid

TEMPLATES_DIR = os.path.join(os.path.dirname(__file__), '..', 'templates')
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'outputs')

# Create outputs folder if not exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

def fill_template(template_path: str, structured_content: dict, job_id: str) -> str:
    doc = Document(template_path)
    
    # Replace placeholders in paragraphs
    for para in doc.paragraphs:
        replace_placeholder(para, structured_content)
    
    # Replace placeholders in tables
    for table in doc.tables:
        for row in table.rows:
            for cell in row.cells:
                for para in cell.paragraphs:
                    replace_placeholder(para, structured_content)
    
    output_path = os.path.join(OUTPUT_DIR, f"{job_id}_formatted.docx")
    doc.save(output_path)
    return output_path


def replace_placeholder(para, content: dict):
    placeholders = {
        '{{TITLE}}': content.get('title', ''),
        '{{AUTHORS}}': ', '.join(content.get('authors', [])),
        '{{ABSTRACT}}': content.get('abstract', ''),
        '{{KEYWORDS}}': ', '.join(content.get('keywords', [])),
        '{{INTRODUCTION}}': content.get('introduction', ''),
        '{{METHODOLOGY}}': content.get('methodology', ''),
        '{{RESULTS}}': content.get('results', ''),
        '{{CONCLUSION}}': content.get('conclusion', ''),
        '{{REFERENCES}}': '\n'.join(content.get('references', [])),
    }
    
    for placeholder, value in placeholders.items():
        if placeholder in para.text:
            for run in para.runs:
                if placeholder in run.text:
                    run.text = run.text.replace(placeholder, value)


def generate_docx(structured_content: dict, format_type: str, job_id: str) -> str:
    template_map = {
        'ieee': os.path.join(TEMPLATES_DIR, 'ieee_template.docx'),
        'springer': os.path.join(TEMPLATES_DIR, 'springer_template.docx'),
        'elsevier': os.path.join(TEMPLATES_DIR, 'elsevier_template.docx'),
    }
    
    template_path = template_map.get(format_type.lower())
    
    if not template_path or not os.path.exists(template_path):
        raise FileNotFoundError(f"Template not found for format: {format_type}")
    
    return fill_template(template_path, structured_content, job_id)