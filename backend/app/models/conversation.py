from __future__ import annotations

from uuid import uuid4

from sqlalchemy import ForeignKey, Unicode
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.database import Base
from core.database.mixins import TimestampMixin


class Conversation(Base, TimestampMixin):
    __tablename__ = "conversations"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid4
    )
    user_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    title: Mapped[str] = mapped_column(Unicode(255), nullable=False)

    user: Mapped["User"] = relationship(back_populates="conversations")  # type: ignore
    messages: Mapped[list["Message"]] = relationship(  # type: ignore
        back_populates="conversation", cascade="all, delete-orphan", lazy="selectin"
    )  # type: ignore

    def __repr__(self):
        return f"ID: {self.id}, Title: {self.title}"
