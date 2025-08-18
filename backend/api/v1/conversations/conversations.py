from uuid import UUID

from fastapi import APIRouter, Depends

from app.controllers import ConversationController
from app.schemas.requests.conversation import ConversationCreateRequest
from app.schemas.responses.conversation import ConversationResponse
from core.dependencies import AuthenticationRequired
from core.factory import Factory

router = APIRouter(
    dependencies=[Depends(AuthenticationRequired)],
)


@router.post("/", response_model=ConversationResponse)
async def create_conversation(
    conversation_request_data: ConversationCreateRequest,
    conversation_controller: ConversationController = Depends(
        Factory().get_conversation_controller
    ),
) -> ConversationResponse:
    return await conversation_controller.create_conversation(
        user_id=conversation_request_data.user_id,
        title=conversation_request_data.title,
    )


@router.get("/{conversation_id}")
async def get_conversation(
    conversation_id: UUID,
    conversation_controller: ConversationController = Depends(
        Factory().get_conversation_controller
    ),
):
    return await conversation_controller.get_conversation_by_id(conversation_id)
