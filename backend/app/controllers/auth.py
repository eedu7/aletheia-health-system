from pydantic import EmailStr

from app.models import User
from app.repositories import UserRepository
from app.schemas.extra import Token
from core.controller import BaseController
from core.exceptions import BadRequestException
from core.security import JWTHandler, PasswordHandler


class AuthController(BaseController[User]):
    def __init__(self, user_repository: UserRepository) -> None:
        super().__init__(model=User, repository=user_repository)
        self.user_repository = user_repository

    async def register(self, email: EmailStr, password: str, full_name: str) -> User:
        user: User | None = await self.user_repository.get_by_email(email)

        if user:
            raise BadRequestException("User already exists with this email.")

        hashed_password = PasswordHandler.hash_password(password)

        return await self.create(
            {
                "email": email,
                "password": hashed_password,
                "full_name": full_name,
            }
        )

    async def login(self, email: EmailStr, password: str) -> Token:
        user: User | None = await self.user_repository.get_by_email(email)

        if not user or not PasswordHandler.verify_password(
            password=password, hashed_password=str(user.password)
        ):
            raise BadRequestException("Invalid credentials.")

        payload = {
            "id": str(user.id),
            "email": str(user.email),
            "full_name": str(user.full_name),
            "token_type": "access",
        }
        access_token = JWTHandler.encode(payload=payload)

        payload["token_type"] = "refresh"
        refresh_token = JWTHandler.encode(payload=payload, token_type="refresh")

        return Token(access_token=access_token, refresh_token=refresh_token)
