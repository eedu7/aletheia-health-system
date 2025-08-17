from typing import List

from app.models import Message
from core.repository import BaseRepository


class MessageRepository(BaseRepository[Message]):
    async def get_by_conversation(
        self, conversation_id: str, join_: set[str] | None = None
    ) -> List[Message]:
        return await self.get_by("conversation_id", conversation_id, join_)

    async def get_last_message(
        self, conversation_id: str, join_: set[str] | None = None
    ) -> Message | None:
        query = self._query(join_)
        query = await self._get_by(query, "conversation_id", conversation_id)
        query = query.order_by(Message.created_at.desc())
        return await self._first(query)
