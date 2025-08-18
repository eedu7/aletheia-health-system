from fastapi import APIRouter

from app.schemas.requests.conversation import ConversationCreateRequest

router = APIRouter()


@router.post("/conversations")
async def create_conversation(conversation_request_data: ConversationCreateRequest):
    return {"message": "Create conversation", "data": conversation_request_data}
