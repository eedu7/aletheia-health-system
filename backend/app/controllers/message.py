from typing import List
from uuid import UUID

from app.integrations.ollama_client import OllamaClient
from app.models import Message
from app.repositories import MessageRepository
from app.schemas.responses.message import MessageResponse
from core.controller import BaseController


class MessageController(BaseController[Message]):
    def __init__(self, message_repository: MessageRepository) -> None:
        super().__init__(model=Message, repository=message_repository)
        self.message_repository = message_repository

    async def create_message(
        self, conversation_id: UUID, sender: str, content: str
    ) -> MessageResponse:
        message: Message = await self.create(
            {
                "conversation_id": conversation_id,
                "sender": sender,
                "content": content,
            }
        )
        return MessageResponse.model_validate(message)

    async def create_with_ai_response(
        self, conversation_id: UUID, user_content: str, ollama_client: OllamaClient
    ):
        pass

    async def get_by_conversation_id(self, conversation_id: str) -> List[Message]:
        return await self.message_repository.get_by_conversation_id(conversation_id)

    async def get_last_message(self, conversation_id: str) -> Message | None:
        return await self.message_repository.get_last_message(conversation_id)
