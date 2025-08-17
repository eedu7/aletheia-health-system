from typing import List

from app.models import Conversation
from core.repository import BaseRepository


class ConversationRepository(BaseRepository[Conversation]):
    async def get_by_user(
        self, user_id: str, join_: set[str] | None = None
    ) -> List[Conversation]:
        return await self.get_by("user_id", user_id, join_)

    async def get_by_title(
        self, title: str, join_: set[str] | None = None
    ) -> Conversation | None:
        return await self.get_by("title", title, join_, unique=True, or_none=True)
