from fastapi import FastAPI

from api import router


def init_routers(app: FastAPI) -> None:
    app.include_router(router=router)


def create_app() -> FastAPI:
    app = FastAPI(
        title="Aletheia Health System",
        description="Aletheia Health System API",
        version="0.0.1",
    )
    init_routers(app=app)
    return app


app: FastAPI = create_app()
