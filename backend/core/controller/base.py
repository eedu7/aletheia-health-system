from typing import Any, Dict, Generic, Type, TypeVar
from uuid import UUID

from core.database import Base, Propagation, Transactional
from core.repository import BaseRepository

ModelType = TypeVar("ModelType", bound=Base)


# TODO: Add exception handling to the methods
class BaseController(Generic[ModelType]):
    def __init__(self, model: Type[ModelType], repository: BaseRepository) -> None:
        self.model = model
        self.repository = repository

    async def get_by_id(self, uuid: UUID) -> ModelType | None:
        return await self.repository.session.get(uuid)

    async def get_all(self, skip: int = 0, limit: int = 100) -> list[ModelType]:
        try:
            return await self.repository.get_all(skip, limit)
        except Exception as e:
            raise e

    @Transactional(propagation=Propagation.REQUIRED)
    async def create(self, attributes: Dict[str, Any]) -> ModelType:
        return await self.repository.create(**attributes)
