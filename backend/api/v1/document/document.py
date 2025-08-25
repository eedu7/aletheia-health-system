import os
from pathlib import Path
from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, File, UploadFile
from pydantic import BaseModel, Field

from core.dependencies.authentication import AuthenticationRequired

router = APIRouter(dependencies=[Depends(AuthenticationRequired)])

UPLOAD_DIR = Path(__file__).parent.parent.parent.parent / "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


class DocumentUploadRequest(BaseModel):
    conversation_id: UUID = Field(..., description="Conversation ID")


@router.post("/upload")
async def upload_document(request_body: DocumentUploadRequest, files: List[UploadFile] = File(...)):
    saved_files = []

    for file in files:
        ext = os.path.splitext(file.filename)[1]

        filename = f"{uuid.uuid4().hex}{ext}"
        file_path = os.path.join(UPLOAD_DIR, filename)

        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        saved_files.append({"filename": file.filename, "url": f"{UPLOAD_DIR}/{filename}"})

    return {"files": saved_files, "document": request_body}
