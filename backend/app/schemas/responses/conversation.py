from typing import List
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.schemas.responses.message import BaseMessageResponse


class BaseConversationResponse(BaseModel):
    id: UUID
    title: str

    model_config = ConfigDict(from_attributes=True)


class CreateConversationResponse(BaseConversationResponse):
    pass


class ConversationResponse(BaseConversationResponse):
    messages: List[BaseMessageResponse]
