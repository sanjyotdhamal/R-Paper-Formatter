from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from database.connection import connect_db, close_db, jobs_collection, papers_collection
from database.models import FormattingJob, ExtractedPaper, JobStatus, FormatType
from parser.pdf_extractor import extract_text
from ai.content_analyzer import analyze_content
from output.docx_generator import generate_docx
import uuid
from datetime import datetime

app = FastAPI(title="R-Paper Formatter API")

# Allow React frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await connect_db()

@app.on_event("shutdown")
async def shutdown():
    await close_db()

@app.get("/")
async def root():
    return {"message": "R-Paper Formatter API is running!"}

@app.post("/format")
async def format_paper(
    file: UploadFile = File(...),
    format_type: str = Form(...),
):
    job_id = str(uuid.uuid4())

    try:
        # Save job to MongoDB
        job = FormattingJob(
            job_id=job_id,
            original_filename=file.filename,
            format_type=format_type,
            status=JobStatus.PROCESSING
        )
        await jobs_collection.insert_one(job.dict())

        # Step 1 — Extract text from PDF
        raw_text = await extract_text(file)

        if not raw_text:
            raise HTTPException(status_code=400, detail="Could not extract text from PDF")

        # Step 2 — AI structures the content
        structured = await analyze_content(raw_text)

        # Save extracted paper to MongoDB
        paper = ExtractedPaper(
            job_id=job_id,
            raw_text=raw_text,
            structured_content=structured
        )
        await papers_collection.insert_one(paper.dict())

        # Step 3 — Generate formatted DOCX
        output_path = generate_docx(structured, format_type, job_id)

        # Update job status
        await jobs_collection.update_one(
            {"job_id": job_id},
            {"$set": {
                "status": JobStatus.COMPLETED,
                "completed_at": datetime.utcnow(),
                "output_file_path": output_path
            }}
        )

        return FileResponse(
            output_path,
            filename=f"formatted_{format_type}.docx",
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        )

    except Exception as e:
        # Update job status to failed
        await jobs_collection.update_one(
            {"job_id": job_id},
            {"$set": {
                "status": JobStatus.FAILED,
                "error_message": str(e)
            }}
        )
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/jobs")
async def get_all_jobs():
    jobs = await jobs_collection.find().to_list(100)
    for job in jobs:
        job["_id"] = str(job["_id"])
    return jobs


@app.get("/jobs/{job_id}")
async def get_job(job_id: str):
    job = await jobs_collection.find_one({"job_id": job_id})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    job["_id"] = str(job["_id"])
    return job