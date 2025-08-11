from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_async_session

router = APIRouter()


@router.get("/")
async def health(session: AsyncSession = Depends(get_async_session)):
    message = await session.execute(text("SELECT 'ok'"))
    return {"status": "ok", "services": {"database": message.scalar_one()}}
