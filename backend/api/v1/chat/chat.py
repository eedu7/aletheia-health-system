from fastapi import APIRouter

router = APIRouter()


@router.post("/send")
async def chat():
    # TODO: Send message to chat
    return {"message": "Send message"}


@router.get("/history")
async def chat_history():
    # TODO: Get chat history
    return {"message": "Get chat history"}
