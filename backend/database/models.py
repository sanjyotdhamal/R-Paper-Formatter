from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime
from enum import Enum


class JobStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class FormatType(str, Enum):
    IEEE = "ieee"
    SPRINGER = "springer"
    ELSEVIER = "elsevier"
    JOURNAL = "journal"


class FormattingJob(BaseModel):
    job_id: str
    original_filename: str
    format_type: FormatType
    status: JobStatus = JobStatus.PENDING
    created_at: datetime = Field(default_factory=datetime.utcnow)
    completed_at: Optional[datetime] = None
    error_message: Optional[str] = None
    output_file_path: Optional[str] = None


class ExtractedPaper(BaseModel):
    job_id: str
    raw_text: str
    structured_content: Optional[Dict[str, Any]] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)