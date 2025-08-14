from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from core.config import config


class Base(DeclarativeBase):
    pass


engine = create_async_engine(
    str(config.DATABASE_URL), echo=True, pool_pre_ping=True, future=True
)

ASYNC_SESSION_LOCAL = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


async def get_async_session() -> AsyncGenerator[AsyncSession]:
    async with ASYNC_SESSION_LOCAL() as session:
        yield session
