from typing import List

from fastapi import FastAPI, Request
from fastapi.responses import  JSONResponse
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware

from api import router
from core.exceptions import CustomException
from core.middlewares import AuthBackend, AuthenticationMiddleware, SQLAlchemyMiddleware


def init_routers(app: FastAPI) -> None:
    app.include_router(router=router)

def init_listeners(app: FastAPI) -> None:
    @app.exception_handler(CustomException)
    async def custom_exception_handler(request: Request, exc: CustomException):
        return JSONResponse(
            status_code=exc.code,
            content={"error": exc.error_code, "message": exc.message},
        )


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
    init_listeners(app=app)
    return app


app: FastAPI = create_app()
