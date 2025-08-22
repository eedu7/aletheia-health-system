from collections.abc import Sequence
from typing import List, Tuple
from uuid import UUID

from sqlalchemy import Result, Select, select

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

    async def get_user_conversations(
        self, user_id: UUID, skip: int = 0, limit: int = 10
    ) -> Sequence[Conversation]:
        query: Select[Tuple[Conversation]] = (
            select(Conversation)
            .where(Conversation.user_id == user_id)
            .offset(skip)
            .limit(limit)
        )

        results: Result[Tuple[Conversation]] = await self.session.execute(query)

        return results.scalars().all()
