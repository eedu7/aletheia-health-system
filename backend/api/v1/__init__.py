from fastapi import APIRouter

from .auth import auth_router
from .conversations import conversation_router
from .document import document_router
from .health import health_router
from .message import message_router
from .user import user_router

v1_router = APIRouter()

v1_router.include_router(health_router, prefix="/health", tags=["Health"])
v1_router.include_router(auth_router, prefix="/auth", tags=["Auth"])
v1_router.include_router(
    conversation_router, prefix="/conversations", tags=["Conversations"]
)
v1_router.include_router(message_router, prefix="/messages", tags=["Messages"])
v1_router.include_router(user_router, prefix="/user", tags=["User"])
v1_router.include_router(document_router, prefix="/document", tags=["Document"])

__all__ = ["v1_router"]
