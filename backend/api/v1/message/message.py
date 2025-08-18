from fastapi import APIRouter, Depends

from app.controllers import MessageController
from app.integrations import OllamaClient
from app.schemas.requests.message import MessageCreateRequest
from app.schemas.responses.message import MessageResponse
from core.dependencies import AuthenticationRequired
from core.exceptions import BadRequestException
from core.factory import Factory

router = APIRouter(
    dependencies=[Depends(AuthenticationRequired)],
)


@router.post("/", response_model=MessageResponse)
async def create_message(
    message_request_data: MessageCreateRequest,
    message_controller: MessageController = Depends(Factory().get_message_controller),
) -> MessageResponse:
    try:
        return await message_controller.create_message(
            message_request_data.conversation_id,
            message_request_data.content,
            OllamaClient(),
        )
    except Exception as e:
        raise BadRequestException(f"Error: {e}")
