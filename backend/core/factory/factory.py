from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.controllers import (
    AuthController,
    ConversationController,
    MessageController,
    UserController,
)
from app.models import Conversation, Message, User
from app.repositories import ConversationRepository, MessageRepository, UserRepository
from core.database import get_async_session


class Factory:
    # ====================
    # Repositories
    # ====================
    def get_user_repository(self, db_session: AsyncSession):
        return UserRepository(User, db_session)

    def get_conversation_repository(self, db_session: AsyncSession):
        return ConversationRepository(Conversation, db_session)

    def get_message_repository(self, db_session: AsyncSession):
        return MessageRepository(Message, db_session)

    # ====================
    # Controllers
    # ====================
    def get_auth_controller(
        self, db_session: AsyncSession = Depends(get_async_session)
    ):
        return AuthController(user_repository=self.get_user_repository(db_session))

    def get_user_controller(
        self, db_session: AsyncSession = Depends(get_async_session)
    ):
        return UserController(user_repository=self.get_user_repository(db_session))

    def get_conversation_controller(
        self, db_session: AsyncSession = Depends(get_async_session)
    ):
        return ConversationController(
            conversation_repository=self.get_conversation_repository(db_session)
        )

    def get_message_controller(
        self, db_session: AsyncSession = Depends(get_async_session)
    ):
        return MessageController(
            message_repository=self.get_message_repository(db_session)
        )
