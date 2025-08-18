from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.schemas.extra import SenderType


class MessageResponse(BaseModel):
    id: UUID
    conversation_id: UUID
    sender_type: SenderType
    content: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
