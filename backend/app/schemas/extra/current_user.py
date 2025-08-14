from uuid import UUID

from pydantic import BaseModel, Field


class CurrentUser(BaseModel):
    id: UUID | None = Field(None, description="User ID")

    class Config:
        validate_assignment = True
