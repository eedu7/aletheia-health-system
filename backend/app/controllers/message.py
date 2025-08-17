from typing import List

from app.models import Message
from app.repositories import MessageRepository
from core.controller import BaseController


class MessageController(BaseController[Message]):
    def __init__(self, message_repository: MessageRepository) -> None:
        super().__init__(model=Message, repository=message_repository)
        self.message_repository = message_repository

    async def get_by_conversation_id(self, conversation_id: str) -> List[Message]:
        return await self.message_repository.get_by_conversation_id(conversation_id)

    async def get_last_message(self, conversation_id: str) -> Message | None:
        return await self.message_repository.get_last_message(conversation_id)
