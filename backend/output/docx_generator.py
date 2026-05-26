import os
from docx import Document
from docx.shared import Pt, Inches, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.section import WD_SECTION
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
import copy

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'outputs')
os.makedirs(OUTPUT_DIR, exist_ok=True)


def set_font(run, font_name, font_size, bold=False, italic=False):
    run.font.name = font_name
    run.font.size = Pt(font_size)
    run.font.bold = bold
    run.font.italic = italic


def generate_ieee(content: dict, job_id: str) -> str:
    doc = Document()

    # Page setup — A4, narrow margins
    section = doc.sections[0]
    section.page_width = Cm(21)
    section.page_height = Cm(29.7)
    section.left_margin = Cm(1.57)
    section.right_margin = Cm(1.57)
    section.top_margin = Cm(1.9)
    section.bottom_margin = Cm(2.54)

    # Title
    title_para = doc.add_paragraph()
    title_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
    title_run = title_para.add_run(content.get('title', ''))
    set_font(title_run, 'Times New Roman', 24, bold=False)
    title_para.space_after = Pt(12)

    # Authors
    authors_para = doc.add_paragraph()
    authors_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
    authors = content.get('authors', [])
    authors_text = ', '.join(authors) if isinstance(authors, list) else authors
    authors_run = authors_para.add_run(authors_text)
    set_font(authors_run, 'Times New Roman', 10)
    authors_para.space_after = Pt(12)

    # Abstract heading
    abstract_heading = doc.add_paragraph()
    abstract_heading.alignment = WD_ALIGN_PARAGRAPH.CENTER
    abstract_run = abstract_heading.add_run('Abstract')
    set_font(abstract_run, 'Times New Roman', 10, bold=True, italic=True)

    # Abstract text
    abstract_para = doc.add_paragraph()
    abstract_para.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    abstract_text = abstract_heading.add_run(
        f"—{content.get('abstract', '')}"
    )
    set_font(abstract_text, 'Times New Roman', 10, italic=True)
    abstract_para.space_after = Pt(6)

    # Keywords
    keywords_para = doc.add_paragraph()
    keywords = content.get('keywords', [])
    keywords_text = ', '.join(keywords) if isinstance(keywords, list) else keywords
    kw_run = keywords_para.add_run(f"Keywords—{keywords_text}")
    set_font(kw_run, 'Times New Roman', 10, italic=True)
    keywords_para.space_after = Pt(12)

    # Sections
    sections_data = [
        ('I. INTRODUCTION', 'introduction'),
        ('II. METHODOLOGY', 'methodology'),
        ('III. RESULTS', 'results'),
        ('IV. CONCLUSION', 'conclusion'),
    ]

    for heading_text, key in sections_data:
        # Section heading
        heading_para = doc.add_paragraph()
        heading_para.alignment = WD_ALIGN_PARAGRAPH.LEFT
        heading_run = heading_para.add_run(heading_text)
        set_font(heading_run, 'Times New Roman', 10, bold=True)
        heading_para.space_before = Pt(6)
        heading_para.space_after = Pt(3)

        # Section content
        content_para = doc.add_paragraph()
        content_para.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        content_run = content_para.add_run(content.get(key, ''))
        set_font(content_run, 'Times New Roman', 10)
        content_para.space_after = Pt(6)

    # References
    ref_heading = doc.add_paragraph()
    ref_run = ref_heading.add_run('REFERENCES')
    set_font(ref_run, 'Times New Roman', 10, bold=True)
    ref_heading.alignment = WD_ALIGN_PARAGRAPH.CENTER
    ref_heading.space_before = Pt(6)

    references = content.get('references', [])
    if isinstance(references, list):
        for i, ref in enumerate(references):
            ref_para = doc.add_paragraph()
            ref_run = ref_para.add_run(f"[{i+1}] {ref}")
            set_font(ref_run, 'Times New Roman', 8)
            ref_para.space_after = Pt(2)
    else:
        ref_para = doc.add_paragraph()
        ref_run = ref_para.add_run(references)
        set_font(ref_run, 'Times New Roman', 8)

    output_path = os.path.join(OUTPUT_DIR, f"{job_id}_ieee.docx")
    doc.save(output_path)
    return output_path


def generate_springer(content: dict, job_id: str) -> str:
    doc = Document()

    # Page setup
    section = doc.sections[0]
    section.page_width = Cm(15.5)
    section.page_height = Cm(23.5)
    section.left_margin = Cm(4.3)
    section.right_margin = Cm(3.3)
    section.top_margin = Cm(6.3)
    section.bottom_margin = Cm(6.3)

    # Title
    title_para = doc.add_paragraph()
    title_para.alignment = WD_ALIGN_PARAGRAPH.LEFT
    title_run = title_para.add_run(content.get('title', ''))
    set_font(title_run, 'Times New Roman', 14, bold=True)
    title_para.space_after = Pt(16)

    # Authors
    authors_para = doc.add_paragraph()
    authors = content.get('authors', [])
    authors_text = ', '.join(authors) if isinstance(authors, list) else authors
    authors_run = authors_para.add_run(authors_text)
    set_font(authors_run, 'Times New Roman', 10)
    authors_para.space_after = Pt(16)

    # Abstract heading
    abstract_para = doc.add_paragraph()
    abstract_run = abstract_para.add_run('Abstract. ')
    set_font(abstract_run, 'Times New Roman', 10, bold=True)
    abstract_text_run = abstract_para.add_run(content.get('abstract', ''))
    set_font(abstract_text_run, 'Times New Roman', 10)
    abstract_para.space_after = Pt(8)

    # Keywords
    keywords_para = doc.add_paragraph()
    keywords = content.get('keywords', [])
    keywords_text = ', '.join(keywords) if isinstance(keywords, list) else keywords
    kw_bold = keywords_para.add_run('Keywords: ')
    set_font(kw_bold, 'Times New Roman', 10, bold=True)
    kw_run = keywords_para.add_run(keywords_text)
    set_font(kw_run, 'Times New Roman', 10)
    keywords_para.space_after = Pt(16)

    # Sections
    sections_data = [
        ('1 Introduction', 'introduction'),
        ('2 Methodology', 'methodology'),
        ('3 Results', 'results'),
        ('4 Conclusion', 'conclusion'),
    ]

    for heading_text, key in sections_data:
        heading_para = doc.add_paragraph()
        heading_run = heading_para.add_run(heading_text)
        set_font(heading_run, 'Times New Roman', 12, bold=True)
        heading_para.space_before = Pt(8)
        heading_para.space_after = Pt(4)

        content_para = doc.add_paragraph()
        content_para.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        content_run = content_para.add_run(content.get(key, ''))
        set_font(content_run, 'Times New Roman', 10)
        content_para.space_after = Pt(6)

    # References
    ref_heading = doc.add_paragraph()
    ref_run = ref_heading.add_run('References')
    set_font(ref_run, 'Times New Roman', 12, bold=True)
    ref_heading.space_before = Pt(8)

    references = content.get('references', [])
    if isinstance(references, list):
        for i, ref in enumerate(references):
            ref_para = doc.add_paragraph()
            ref_run = ref_para.add_run(f"{i+1}. {ref}")
            set_font(ref_run, 'Times New Roman', 8)
            ref_para.space_after = Pt(2)
    else:
        ref_para = doc.add_paragraph()
        ref_run = ref_para.add_run(references)
        set_font(ref_run, 'Times New Roman', 8)

    output_path = os.path.join(OUTPUT_DIR, f"{job_id}_springer.docx")
    doc.save(output_path)
    return output_path


def generate_docx(structured_content: dict, format_type: str, job_id: str) -> str:
    format_type = format_type.lower()

    if 'ieee' in format_type:
        return generate_ieee(structured_content, job_id)
    elif 'springer' in format_type:
        return generate_springer(structured_content, job_id)
    else:
        return generate_ieee(structured_content, job_id)