
from abc import ABC, abstractmethod
from sqlalchemy.ext.asyncio import AsyncSession


class BaseFactory(ABC):
    @abstractmethod
    def get_repository(self, db_session: AsyncSession):
        "Return repository instance"
        raise NotImplementedError

    @abstractmethod
    def get_controller(self, db_session: AsyncSession):
        """Return controller instance"""
        raise NotImplementedError