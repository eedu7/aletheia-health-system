from fastapi import Response

from app.schemas.extra import Token, TokenType
from core.config import config


def set_auth_cookie(
    response: Response,
    token: Token,
    httponly: bool = True,
) -> None:
    response.set_cookie(
        key=TokenType.ACCESS_TOKEN,
        value=token.access_token,
        httponly=False,
        secure=True,
        samesite="lax",
        max_age=config.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )
    response.set_cookie(
        key=TokenType.REFRESH_TOKEN,
        value=token.refresh_token,
        httponly=False,
        secure=True,
        samesite="lax",
        max_age=config.JWT_REFRESH_TOKEN_EXPIRE_MINUTES * 60,
    )
