from uuid import UUID

from pydantic import BaseModel, Field


class ConversationCreateRequest(BaseModel):
    user_id: UUID = Field(
        ..., description="User ID", examples=["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
    )
    title: str = Field(
        ...,
        description="Conversation title",
        examples=["My first conversation"],
    )
