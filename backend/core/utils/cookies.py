from datetime import UTC, datetime, timedelta
from typing import Any, Dict, Literal

from fastapi import Response

from app.schemas.extra import Token, TokenType
from core.config import config

SameSite = Literal["lax", "strict", "none"]


class Cookie:
    def __init__(
        self,
        httponly: bool = True,
        secure: bool = True,
        path: str = "/",
    ):
        self.httponly = httponly
        self.secure = secure
        self.path = path

    def _get_attributes(self) -> Dict[str, Any]:
        return {
            "httponly": self.httponly,
            "secure": self.secure,
            "path": self.path,
        }

    def set_cookie(
        self,
        response: Response,
        key: str,
        value: str,
        max_age: int,
        samesite: SameSite = "lax",
    ) -> None:
        expires_at = datetime.now(UTC) + timedelta(seconds=max_age)
        response.set_cookie(
            key=key,
            value=value,
            max_age=max_age,
            expires=expires_at,
            samesite=samesite,
            **self._get_attributes(),
        )

    def delete_cookie(
        self,
        response: Response,
        key: str,
        samesite: SameSite = "lax",
    ) -> None:
        response.delete_cookie(
            key=key,
            samesite=samesite,
            **self._get_attributes(),
        )

    def set_auth_cookie(
        self,
        response: Response,
        token: Token,
        access_samesite: SameSite = "lax",
        refresh_samesite: SameSite = "strict",
    ) -> None:
        self.set_cookie(
            response,
            key=TokenType.ACCESS_TOKEN,
            value=token.access_token,
            max_age=config.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            samesite=access_samesite,
        )
        self.set_cookie(
            response,
            key=TokenType.REFRESH_TOKEN,
            value=token.refresh_token,
            max_age=config.JWT_REFRESH_TOKEN_EXPIRE_MINUTES * 60,
            samesite=refresh_samesite,
        )

    def delete_auth_cookie(
        self,
        response: Response,
        access_samesite: SameSite = "lax",
        refresh_samesite: SameSite = "strict",
    ) -> None:
        self.delete_cookie(
            response,
            key=TokenType.ACCESS_TOKEN,
            samesite=access_samesite,
        )
        self.delete_cookie(
            response, key=TokenType.REFRESH_TOKEN, samesite=refresh_samesite
        )
