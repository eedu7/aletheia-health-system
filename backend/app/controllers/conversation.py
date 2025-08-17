from app.models import Conversation
from app.repositories import ConversationRepository
from core.controller import BaseController


class ConversationController(BaseController[Conversation]):
    def __init__(self, conversation_repository: ConversationRepository) -> None:
        super().__init__(model=Conversation, repository=conversation_repository)
        self.conversation_repository = conversation_repository
