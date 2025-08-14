from typing import List

from fastapi import FastAPI
from fastapi.middleware import Middleware

from api import router
from core.middlewares import AuthBackend, AuthenticationMiddleware, SQLAlchemyMiddleware


def init_routers(app: FastAPI) -> None:
    app.include_router(router=router)


def make_middleware() -> List[Middleware]:
    return [
        Middleware(SQLAlchemyMiddleware),
        Middleware(AuthenticationMiddleware, backend=AuthBackend()),
    ]


def create_app() -> FastAPI:
    app = FastAPI(
        title="Aletheia Health System",
        description="Aletheia Health System API",
        version="0.0.1",
        middleware=make_middleware(),
    )
    init_routers(app=app)

    return app


app: FastAPI = create_app()
