from typing import List

from fastapi import FastAPI
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware

from api import router
from core.middlewares import AuthBackend, AuthenticationMiddleware, SQLAlchemyMiddleware


def init_routers(app: FastAPI) -> None:
    app.include_router(router=router)


def make_middleware() -> List[Middleware]:
    return [
        Middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        ),
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
