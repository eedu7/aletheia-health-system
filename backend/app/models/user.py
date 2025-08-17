from __future__ import annotations

from typing import List
from uuid import uuid4

from sqlalchemy import Unicode
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.database import Base
from core.database.mixins import TimestampMixin


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid4
    )
    full_name: Mapped[str] = mapped_column(Unicode(255), nullable=False)
    email: Mapped[str] = mapped_column(
        Unicode(255), nullable=False, unique=True, index=True
    )
    password: Mapped[str] = mapped_column(Unicode(255), nullable=False)

    conversations: Mapped[List["Conversation"]] = relationship(back_populates="user")  # type: ignore

    def __repr__(self):
        return f"ID: {self.id}, email: {self.email}, full: {self.full_name}"
