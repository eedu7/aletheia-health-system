from sqlalchemy.ext.asyncio import AsyncSession
from app.controllers import AuthController
from app.models import User
from app.repositories import UserRepository
from .base import BaseFactory


class AuthFactory(BaseFactory):
    def get_repository(self, db_session: AsyncSession):
        return UserRepository(User, db_session)

    def get_controller(self, db_session: AsyncSession):
        return AuthController(user_repository=self.get_repository(db_session))
