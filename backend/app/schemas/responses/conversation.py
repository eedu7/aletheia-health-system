from datetime import datetime
from typing import List
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.schemas.responses.message import BaseMessageResponse


class ConversationResponse(BaseModel):
    id: UUID
    title: str
    user_id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AllConversationsResponse(ConversationResponse):
    messages: List[BaseMessageResponse]
