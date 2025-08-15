from pydantic import EmailStr

from app.models import User
from app.repositories import UserRepository
from core.controller import BaseController


class UserController(BaseController[User]):
    def __init__(self, user_repository: UserRepository) -> None:
        super().__init__(model=User, repository=user_repository)
        self.user_repository = user_repository

    async def get_by_full_name(self, full_name: str) -> User:
        return await self.user_repository.get_by_full_name(full_name)

    async def get_by_email(self, email: EmailStr) -> User:
        return await self.user_repository.get_by_email(email)
