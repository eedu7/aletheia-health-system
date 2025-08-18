from typing import List
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
    ) -> ConversationResponse | None:
        try:
            conversation = await self.create(
                {
                    "user_id": user_id,
                    "title": title,
                }
            )
            return ConversationResponse.model_validate(conversation)
        except IntegrityError as exc:
            orig = getattr(exc, "orig", None)

            if isinstance(orig, ForeignKeyViolation):
                raise NotFoundException(
                    f"User with id '{user_id}' does not exist."
                ) from exc

        except Exception as exception:
            raise BadRequestException("Error in create conversation: " + str(exception))

    async def get_by_user(self, user_id: str) -> List[Conversation]:
        return await self.conversation_repository.get_by_user(user_id)

    async def get_by_title(self, title: str) -> Conversation | None:
        return await self.conversation_repository.get_by_title(title)
