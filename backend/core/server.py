from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from core.database.session import get_async_session

app = FastAPI()


@app.get("/")
async def read_root(db: AsyncSession = Depends(get_async_session)):
    result = await db.execute(text("SELECT 'Hello from Database!'"))
    return {"message": result.scalar_one()}
