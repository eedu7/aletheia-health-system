from typing import Any, Dict, Generic, Type, TypeVar

from app.repository import BaseRepository
from core.database import Base

ModelType = TypeVar("ModelType", bound=Base)


class BaseController(Generic[ModelType]):
    def __init__(self, model: Type[ModelType], repository: BaseRepository) -> None:
        self.model = model
        self.repository = repository

    async def get_all(self, skip: int = 0, limit: int = 100) -> list[ModelType]:
        try:
            return await self.repository.get_all(skip, limit)
        except Exception as e:
            raise e

    async def create(self, attributes: Dict[str, Any]):
        try:
            return await self.repository.create(**attributes)
        except Exception as e:
            raise e
