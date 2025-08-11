from fastapi import APIRouter

from .auth import auth_router
from .chat import chat_router
from .document import document_router
from .health import health_router
from .user import user_router

v1_router = APIRouter()

v1_router.include_router(health_router, prefix="/health", tags=["Health"])
v1_router.include_router(auth_router, prefix="/auth", tags=["Auth"])
v1_router.include_router(chat_router, prefix="/chat", tags=["Chat"])
v1_router.include_router(user_router, prefix="/user", tags=["User"])
v1_router.include_router(document_router, prefix="/document", tags=["Document"])

__all__ = ["v1_router"]
