from pydantic import EmailStr

from app.models import User
from core.repository import BaseRepository


class UserRepository(BaseRepository[User]):
    async def get_by_full_name(
        self, full_name: str, join_: set[str] | None = None
    ) -> User | None:
        return await self.get_by("full_name", full_name, join_)

    async def get_by_email(
        self, email: EmailStr, join_: set[str] | None = None
    ) -> User | None:
        return await self.get_by("email", email, join_)
