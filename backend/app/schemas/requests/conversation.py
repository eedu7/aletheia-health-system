from pydantic import BaseModel, Field


# TODO: Give a proper example
class ConversationCreateRequest(BaseModel):
    title: str = Field(
        ...,
        description="Conversation title",
        examples=["My first conversation"],
    )
