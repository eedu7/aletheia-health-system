from typing import List

from app.models import Conversation
from app.repositories import ConversationRepository
from core.controller import BaseController


class ConversationController(BaseController[Conversation]):
    def __init__(self, conversation_repository: ConversationRepository) -> None:
        super().__init__(model=Conversation, repository=conversation_repository)
        self.conversation_repository = conversation_repository

    async def get_by_user(self, user_id: str) -> List[Conversation]:
        return await self.conversation_repository.get_by_user(user_id)

    async def get_by_title(self, title: str) -> Conversation | None:
        return await self.conversation_repository.get_by_title(title)
