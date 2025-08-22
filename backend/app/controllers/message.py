from typing import List
from uuid import UUID

from app.integrations.ollama_client import OllamaClient
from app.models import Message
from app.repositories import MessageRepository
from app.schemas.extra import SenderType
from app.schemas.responses.message import MessageResponse
from core.controller import BaseController


class MessageController(BaseController[Message]):
    def __init__(self, message_repository: MessageRepository) -> None:
        super().__init__(model=Message, repository=message_repository)
        self.message_repository = message_repository

    async def create_message(self, conversation_id: UUID, content: str, ollama_client: OllamaClient):
        await self.create(
            {
                "conversation_id": conversation_id,
                "sender": SenderType.USER.value,
                "content": content,
            }
        )

        ai_reply_text = await ollama_client.generate(content)
        ai_message: Message | None = await self.create(
            {
                "conversation_id": conversation_id,
                "sender": SenderType.ASSISTANT.value,
                "content": ai_reply_text,
            }
        )
        return MessageResponse.model_validate(ai_message)

    async def get_by_conversation_id(self, conversation_id: str) -> List[Message]:
        return await self.message_repository.get_by_conversation_id(conversation_id)

    async def get_last_message(self, conversation_id: str) -> Message | None:
        return await self.message_repository.get_last_message(conversation_id)
