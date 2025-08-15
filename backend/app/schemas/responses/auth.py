from pydantic import BaseModel

from app.schemas.extra import Token

from .user import UserResponse


class AuthResponse(BaseModel):
    user: UserResponse
    token: Token
