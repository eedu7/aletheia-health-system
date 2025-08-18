from uuid import UUID

from pydantic import BaseModel, Field

from app.schemas.extra import SenderType


class MessageCreateRequest(BaseModel):
    conversation_id: UUID = Field(
        ...,
        description="Conversation ID",
        examples=["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
    )
    sender_type: SenderType = Field(default=SenderType.USER)
    content: str = Field(
        ..., description="Message content", examples=["Hello, how are you?"]
    )
