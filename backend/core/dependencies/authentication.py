from fastapi import Depends, Request, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.schemas.extra import TokenType
from core.exceptions import CustomException


class AuthenticationRequiredException(CustomException):
    code = status.HTTP_401_UNAUTHORIZED
    error_code = status.HTTP_401_UNAUTHORIZED
    message = "Authentication required"


class AuthenticationRequired:
    def __init__(
        self,
        request: Request,
        token: HTTPAuthorizationCredentials = Depends(HTTPBearer(auto_error=False)),
    ):
        if token:
            return

        token = request.cookies.get(TokenType.ACCESS_TOKEN)

        if token:
            return

        raise AuthenticationRequiredException()
