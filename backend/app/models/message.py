from __future__ import annotations

from enum import StrEnum
from uuid import uuid4

from sqlalchemy import Enum, ForeignKey, UnicodeText
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.database import Base
from core.database.mixins import TimestampMixin


class SenderType(StrEnum):
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"


class Message(Base, TimestampMixin):
    __tablename__ = "messages"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid4
    )
    conversation_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("conversations.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    sender: Mapped[SenderType] = mapped_column(
        Enum(SenderType), nullable=False, default=SenderType.USER.value
    )
    content: Mapped[str] = mapped_column(UnicodeText, nullable=False)

    conversation: Mapped["Conversation"] = relationship(back_populates="messages")  # type: ignore

    def __repr__(self):
        return f"<ID: {self.id}, Sender: {self.sender}, Content: {self.content[:10]}>"
