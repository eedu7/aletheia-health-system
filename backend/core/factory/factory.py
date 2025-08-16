from fastapi import Depends
from core.database import get_async_session
from sqlalchemy.ext.asyncio import AsyncSession

from .user import UserFactory
from .auth import AuthFactory


class Factory:
    def __init__(self):
        self.user = UserFactory()
        self.auth = AuthFactory()

    def get_user_controller(self, db_session: AsyncSession = Depends(get_async_session)):
        return self.user.get_controller(db_session)

    def get_auth_controller(self, db_session: AsyncSession = Depends(get_async_session)):
        return self.auth.get_controller(db_session)
