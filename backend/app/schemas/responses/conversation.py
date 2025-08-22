from typing import List
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.schemas.responses.message import BaseMessageResponse


class ConversationResponse(BaseModel):
    id: UUID
    title: str
    user_id: UUID
    messages: List[BaseMessageResponse]

    model_config = ConfigDict(from_attributes=True)
