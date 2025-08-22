from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.schemas.extra import SenderType


class BaseMessageResponse(BaseModel):
    id: UUID
    sender: SenderType
    content: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class MessageResponse(BaseModel):
    conversation_id: UUID
