from fastapi import APIRouter, Depends

from app.models import User
from app.schemas.responses.user import UserResponse
from core.dependencies import AuthenticationRequired, get_current_user

router = APIRouter()


@router.get("/profile", dependencies=[Depends(AuthenticationRequired)])
def get_profile(
    user: User = Depends(get_current_user),
) -> UserResponse:
    return user
