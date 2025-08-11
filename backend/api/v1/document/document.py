from fastapi import APIRouter

router = APIRouter()


@router.post("/upload")
async def upload_document():
    # TODO: Upload document
    return {"message": "Upload document"}


@router.get("/status/{document_id}")
async def get_document_status(document_id: str):
    # TODO: Get document status
    return {"message": "Get document status"}


@router.post("/analyze/{document_id}")
async def analyze_document(document_id: str, analysis_type: str = "full"):
    # TODO: Analyze document

    return {"message": "Analyze document"}
