from uuid import UUID

from pydantic import BaseModel


class ConversationCreateRequest(BaseModel):
    user_id: UUID
