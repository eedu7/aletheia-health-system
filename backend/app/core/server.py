from sqlalchemy import text
from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.session import get_async_session


app = FastAPI()


@app.get("/")
async def read_root(db: AsyncSession = Depends(get_async_session)):
    result = await db.execute(text("SELECT 'Hello from Database!'"))
    return {"message": result.scalar_one()}
