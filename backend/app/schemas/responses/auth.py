from uuid import UUID

from pydantic import BaseModel, EmailStr, Field

from app.schemas.extra import Token


class User(BaseModel):
    id: UUID = Field(
        ..., description="User ID", example="3fa85f64-5717-4562-b3fc-2c963f66afa6"
    )
    full_name: str = Field(..., description="Full name of the user", example="John Doe")
    email: EmailStr = Field(
        ..., description="User email address", example="john.doe@example.com"
    )

    class Config:
        form_attributes = True


class AuthResponse(BaseModel):
    user: User
    token: Token
