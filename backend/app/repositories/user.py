from app.models import User
from core.repository import BaseRepository


class UserRepository(BaseRepository[User]):
    async def get_by_username(
        self, username: str, join_: set[str] | None = None
    ) -> User | None:
        return await self.get_by("username", username, join_)

    async def get_by_email(
        self, email: str, join_: set[str] | None = None
    ) -> User | None:
        return await self.get_by("email", email, join_)
