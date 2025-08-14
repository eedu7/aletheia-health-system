from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_async_session

router = APIRouter()


@router.get("/")
async def health(session: AsyncSession = Depends(get_async_session)):
    services = {}
    try:
        message = await session.execute(text("SELECT 'ok'"))
        services["database"] = message.scalar_one()
    except SQLAlchemyError as e:
        services["database"] = f"Error: {e}"

    if all(status == "ok" for status in services.values()):
        over_all_status = "ok"
    elif any(status == "ok" for status in services.values()):
        over_all_status = "degraded"
    else:
        over_all_status = "error"

    return {"status": over_all_status, "services": services}
