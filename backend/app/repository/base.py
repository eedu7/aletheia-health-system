from typing import Generic, List, Type, TypeVar, cast
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import Base

ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository(Generic[ModelType]):
    def __init__(self, model: Type[ModelType], session: AsyncSession) -> None:
        self.model = model
        self.session = session

    async def get(self, uuid: UUID) -> ModelType | None:
        try:
            return await self.session.get(self.model, uuid)
        except SQLAlchemyError as e:
            raise e

    async def get_all(self, skip: int = 0, limit: int = 100) -> List[ModelType]:
        try:
            stmt = select(self.model).offset(skip).limit(limit)
            result = await self.session.execute(stmt)
            return cast(List[ModelType], result.scalars().all())
        except SQLAlchemyError as e:
            raise e

    async def create(self, **kwargs) -> ModelType:
        try:
            instance = self.model(**kwargs)
            self.session.add(instance)
            await self.session.commit()
            await self.session.refresh(instance)
            return instance
        except SQLAlchemyError as e:
            await self.session.rollback()
            raise e
