from fastapi import APIRouter, Depends, Response, status

from app.controllers import AuthController
from app.schemas.requests.auth import LoginUserRequest, RegisterUserRequest
from app.schemas.responses.auth import AuthResponse
from core.factory import Factory
from core.utils import set_auth_cookie

router = APIRouter()


# NOTE: Factory() instantiation inside the route is not ideal; it creates a new factory for every request
@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
    response_model=AuthResponse,
)
async def register_user(
    register_user_request: RegisterUserRequest,
    response: Response,
    auth_controller: AuthController = Depends(Factory().get_auth_controller),
) -> AuthResponse:
    auth_model = await auth_controller.register(
        email=register_user_request.email,
        password=register_user_request.password,
        full_name=register_user_request.full_name,
    )

    # Setting Up Auth Cookies
    set_auth_cookie(response, auth_model.token)
    return auth_model


@router.post(
    "/login",
    status_code=status.HTTP_200_OK,
    response_model=AuthResponse,
)
async def login(
    login_user_request: LoginUserRequest,
    response: Response,
    auth_controller: AuthController = Depends(Factory().get_auth_controller),
) -> AuthResponse:
    auth_model = await auth_controller.login(
        email=login_user_request.email, password=login_user_request.password
    )
    # Setting Up Auth Cookies
    set_auth_cookie(response, auth_model.token)

    return auth_model


@router.post("/social/google")
async def google_login():
    # TODO: Google Login
    return {"message": "Google Login"}
