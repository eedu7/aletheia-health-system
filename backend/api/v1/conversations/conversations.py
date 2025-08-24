from uuid import UUID

from fastapi import APIRouter, Depends, Request

from app.controllers import ConversationController
from app.schemas.extra.pagination import PaginatedResponse
from app.schemas.requests.conversation import ConversationCreateRequest
from app.schemas.responses.conversation import ConversationResponse, CreateConversationResponse
from core.dependencies import AuthenticationRequired
from core.factory import Factory

router = APIRouter(
    dependencies=[Depends(AuthenticationRequired)],
)


@router.post("/", response_model=CreateConversationResponse)
async def create_conversation(
    request: Request,
    conversation_request_data: ConversationCreateRequest,
    conversation_controller: ConversationController = Depends(Factory().get_conversation_controller),
) -> CreateConversationResponse:
    return await conversation_controller.create_conversation(
        user_id=request.user.id,
        title=conversation_request_data.title,
    )


@router.get("/")
async def get_conversations(
    conversation_controller: ConversationController = Depends(Factory().get_conversation_controller),
):
    return await conversation_controller.get_all()


@router.get("/user/", response_model=PaginatedResponse[ConversationResponse])
async def get_all_user_conversations(
    request: Request,
    skip: int = 0,
    limit: int = 10,
    conversation_controller: ConversationController = Depends(Factory().get_conversation_controller),
) -> PaginatedResponse[ConversationResponse]:
    return await conversation_controller.get_user_conversations(user_id=request.user.id, skip=skip, limit=limit)


@router.get("/{conversation_id}")
async def get_conversation(
    conversation_id: UUID,
    conversation_controller: ConversationController = Depends(Factory().get_conversation_controller),
) -> ConversationResponse:
    return await conversation_controller.get_conversation_by_id(conversation_id)


@router.put("/")
async def update_conversation(): ...


@router.delete("/")
async def delete_conversation(): ...
