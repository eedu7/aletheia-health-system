from uuid import uuid4

from sqlalchemy import Unicode
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from core.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid4
    )
    full_name: Mapped[str] = mapped_column(Unicode(255), nullable=False)
    email: Mapped[str] = mapped_column(
        Unicode(255), nullable=False, unique=True, index=True
    )
    password: Mapped[str] = mapped_column(Unicode(255), nullable=False)

    def __str__(self):
        return f"UUID: {self.id}, email: {self.email}, full: {self.full_name}"
