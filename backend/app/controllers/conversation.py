from typing import Sequence
from uuid import UUID

from psycopg.errors import ForeignKeyViolation
from sqlalchemy.exc import IntegrityError

from app.models import Conversation
from app.repositories import ConversationRepository
from app.schemas.responses.conversation import ConversationResponse
from core.controller import BaseController
from core.exceptions import BadRequestException, NotFoundException


class ConversationController(BaseController[Conversation]):
    def __init__(self, conversation_repository: ConversationRepository) -> None:
        super().__init__(model=Conversation, repository=conversation_repository)
        self.conversation_repository = conversation_repository

    async def create_conversation(
        self, user_id: UUID, title: str
    ) -> ConversationResponse:
        try:
            conversation: Conversation | None = await self.create(
                {
                    "user_id": user_id,
                    "title": title,
                }
            )

            if not conversation:
                raise BadRequestException("Error in saving a conversation")

            return ConversationResponse.model_validate(conversation)

        except IntegrityError as exc:
            orig = getattr(exc, "orig", None)

            if isinstance(orig, ForeignKeyViolation):
                raise NotFoundException(
                    f"User with id '{user_id}' does not exist."
                ) from exc
            raise BadRequestException(
                "Integrity error while creating conversation"
            ) from exc

        except Exception as exception:
            raise BadRequestException("Error in create conversation: " + str(exception))

    async def get_conversation_by_id(
        self, conversation_id: UUID
    ) -> Conversation | None:
        return await self.get_by_id(conversation_id)

    async def get_user_conversations(
        self, user_id: UUID, skip: int = 0, limit: int = 10
    ) -> Sequence[Conversation]:
        try:
            return await self.conversation_repository.get_user_conversations(
                user_id, skip, limit
            )
        except IntegrityError as exc:
            orig = getattr(exc, "orig", None)

            if isinstance(orig, ForeignKeyViolation):
                raise NotFoundException(f"User with id '{user_id}' not found") from exc
            raise BadRequestException(
                "Integrity error while creating conversation"
            ) from exc
        except Exception as exc:
            raise BadRequestException(f"Error in fetching conversations: {exc}")

    async def get_by_title(self, title: str) -> Conversation | None:
        return await self.conversation_repository.get_by_title(title)
