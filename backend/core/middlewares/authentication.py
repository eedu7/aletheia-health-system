from typing import Tuple

from jose import JWTError
from starlette.authentication import AuthenticationBackend
from starlette.middleware.authentication import (
    AuthenticationMiddleware as BaseAuthenticationMiddleware,
)
from starlette.requests import HTTPConnection

from app.schemas.extra import CurrentUser, TokenType
from core.security import JWTHandler


class AuthBackend(AuthenticationBackend):
    async def authenticate(self, conn: HTTPConnection) -> Tuple[bool, CurrentUser]:
        current_user = CurrentUser()  # type: ignore
        authorization: str | None = conn.headers.get("Authorization")

        try:
            if authorization:
                scheme, token = authorization.split(" ")
                if scheme.lower() != "bearer":
                    token = None
            else:
                token = None
        except ValueError:
            token = None

        if not token:
            token = conn.cookies.get(TokenType.ACCESS_TOKEN)

        if not token:
            return False, current_user

        try:
            payload = JWTHandler.decode(token)
            current_user.id = payload["user"]["sub"]
            return True, current_user
        except JWTError:
            return False, current_user


class AuthenticationMiddleware(BaseAuthenticationMiddleware):
    pass
