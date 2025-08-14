from fastapi import APIRouter, Depends, status

from app.controllers import AuthController
from app.schemas.requests.auth import LoginUserRequest, RegisterUserRequest
from app.schemas.responses.auth import RegisterUserResponse
from core.factory import Factory

router = APIRouter()


# NOTE: Factory() instantiation inside the route is not ideal; it creates a new factory for every request
@router.post("/register", status_code=201)
async def register_user(
    register_user_request: RegisterUserRequest,
    auth_controller: AuthController = Depends(Factory().get_auth_controller),
) -> RegisterUserResponse:
    return await auth_controller.register(
        email=register_user_request.email,
        password=register_user_request.password,
        full_name=register_user_request.full_name,
    )


@router.post("/login", status_code=status.HTTP_200_OK)
async def login(
    login_user_request: LoginUserRequest,
    auth_controller: AuthController = Depends(Factory().get_auth_controller),
):
    return await auth_controller.login(
        email=login_user_request.email, password=login_user_request.password
    )


@router.post("/social/google")
async def google_login():
    # TODO: Google Login
    return {"message": "Google Login"}
