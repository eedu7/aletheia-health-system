from sqlalchemy import text

from app.models import User
from app.repositories import UserRepository
from core.controller import BaseController


class AuthController(BaseController[User]):
    def __init__(self, user_repository: UserRepository) -> None:
        super().__init__(model=User, repository=user_repository)
        self.user_repository = user_repository

    async def check_working(self):
        result = await self.user_repository.session.execute(
            text("SELECT 'Hello from Database!'")
        )
        return {"message": result.scalar_one()}
