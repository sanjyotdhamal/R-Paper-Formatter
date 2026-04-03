import pdfplumber
import io

async def extract_text(file) -> str:
    contents = await file.read()
    text = ""
    
    with pdfplumber.open(io.BytesIO(contents)) as pdf:
        for page in pdf.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
    
    return text.strip()