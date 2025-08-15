from pydantic import EmailStr

from app.models import User
from app.repositories import UserRepository
from app.schemas.responses.auth import AuthResponse
from app.schemas.responses.user import UserResponse
from core.controller import BaseController
from core.exceptions import BadRequestException
from core.security import JWTHandler, PasswordHandler


class AuthController(BaseController[User]):
    def __init__(self, user_repository: UserRepository) -> None:
        super().__init__(model=User, repository=user_repository)
        self.user_repository = user_repository

    async def register(
        self, email: EmailStr, password: str, full_name: str
    ) -> AuthResponse:
        user: User | None = await self.user_repository.get_by_email(email)

        if user:
            raise BadRequestException("User already exists with this email.")

        hashed_password = PasswordHandler.hash_password(password)

        new_user: User = await self.create(
            {
                "email": email,
                "password": hashed_password,
                "full_name": full_name,
            }
        )
        token = JWTHandler.create_token(new_user)

        return AuthResponse(user=UserResponse.model_validate(new_user), token=token)

    async def login(self, email: EmailStr, password: str) -> AuthResponse:
        user: User | None = await self.user_repository.get_by_email(email)

        if not user or not PasswordHandler.verify_password(
            password=password, hashed_password=str(user.password)
        ):
            raise BadRequestException("Invalid credentials.")
        token = JWTHandler.create_token(user)
        return AuthResponse(user=UserResponse.model_validate(user), token=token)
