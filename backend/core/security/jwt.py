from enum import StrEnum
from http import HTTPStatus
from typing import Any, Dict, Optional

from jose import ExpiredSignatureError, JWTError, jwt

from app.models import User
from app.schemas.extra import Token
from core.config import config
from core.exceptions import CustomException
from core.exceptions.base import BadRequestException
from core.utils import get_timestamp


class JWTDecodeError(CustomException):
    code = HTTPStatus.UNAUTHORIZED
    message = "Invalid token"


class JWTExpiredError(CustomException):
    code = HTTPStatus.UNAUTHORIZED
    message = "Token expired"


class TokenType(StrEnum):
    ACCESS = "access"
    REFRESH = "refresh"


class JWTHandler:
    secret_key: str = config.JWT_SECRET_KEY
    algorithm: str = config.JWT_ALGORITHM
    access_token_expire_minutes: int = config.JWT_ACCESS_TOKEN_EXPIRE_MINUTES
    refresh_token_expire_minutes: int = config.JWT_REFRESH_TOKEN_EXPIRE_MINUTES

    @classmethod
    def encode(
        cls, payload: Dict[str, Any], token_type: TokenType = TokenType.ACCESS, expire_minutes: Optional[int] = None
    ) -> str:
        if expire_minutes is None:
            expire_minutes = (
                cls.access_token_expire_minutes if token_type == TokenType.ACCESS else cls.refresh_token_expire_minutes
            )

        expire = get_timestamp(minutes=expire_minutes)
        iat = get_timestamp()
        jwt_payload = {"iat": iat, "exp": expire, "token_type": token_type, "user": {**payload}}
        return jwt.encode(jwt_payload, cls.secret_key, algorithm=cls.algorithm)

    @classmethod
    def decode(cls, token: str, verify_exp: bool = True) -> Dict[str, Any]:
        try:
            payload = jwt.decode(
                token,
                cls.secret_key,
                algorithms=[cls.algorithm],
                options={"verify_exp": verify_exp},
            )

            # Ensure token_type exists and is valid
            if "token_type" not in payload:
                raise JWTDecodeError("Missing token_type in payload")

            return payload
        except ExpiredSignatureError as e:
            raise JWTExpiredError() from e
        except JWTError as e:
            raise JWTDecodeError() from e

    @classmethod
    def create_token(cls, payload: Optional[Dict[str, Any]] = None, user: Optional[User] = None) -> Token:
        if not user and not payload:
            raise BadRequestException("Either user or payload must be provided")

        if user:
            payload = {
                "sub": str(user.id),
                "email": user.email,
                "name": user.full_name,
            }

        access_token = cls.encode(payload=payload, token_type=TokenType.ACCESS)
        refresh_token = cls.encode(payload=payload, token_type=TokenType.REFRESH)

        return Token(access_token=access_token, refresh_token=refresh_token)
