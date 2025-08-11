from fastapi import APIRouter

from api.v1.health import health_router

v1_router = APIRouter()

v1_router.include_router(health_router, prefix="/health", tags=["Health"])

__all__ = ["v1_router"]
