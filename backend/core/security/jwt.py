from http import HTTPStatus
from typing import Any, Dict, Literal

from jose import ExpiredSignatureError, JWTError, jwt

from app.models import User
from app.schemas.extra import Token
from core.config import config
from core.exceptions import CustomException
from core.utils import get_timestamp


class JWTDecodeError(CustomException):
    code = HTTPStatus.UNAUTHORIZED
    message = "Invalid token"


class JWTExpiredError(CustomException):
    code = HTTPStatus.UNAUTHORIZED
    message = "Token expired"


TokenType = Literal["access", "refresh"]


class JWTHandler:
    secret_key: str = config.JWT_SECRET_KEY
    algorithm: str = config.JWT_ALGORITHM
    access_token_expire_minutes: int = config.JWT_ACCESS_TOKEN_EXPIRE_MINUTES
    refresh_token_expire_minutes: int = config.JWT_REFRESH_TOKEN_EXPIRE_MINUTES

    @classmethod
    def encode(cls, payload: Dict[str, Any], token_type: TokenType = "access") -> str:
        expire_minutes: int = cls.access_token_expire_minutes
        if token_type == "refresh":
            expire_minutes = cls.refresh_token_expire_minutes

        expire = get_timestamp(minutes=expire_minutes)
        iat = get_timestamp()
        jwt_payload = {"iat": iat, "exp": expire, "token_type": token_type, **payload}
        return jwt.encode(jwt_payload, cls.secret_key, algorithm=cls.algorithm)

    @classmethod
    def decode(cls, token: str, verify_exp: bool = True) -> Dict[str, Any]:
        try:
            return jwt.decode(
                token,
                cls.secret_key,
                algorithms=[
                    cls.algorithm,
                ],
                options={"verify_exp": verify_exp},
            )
        except ExpiredSignatureError as e:
            raise JWTExpiredError() from e
        except JWTError as e:
            raise JWTDecodeError() from e

    @classmethod
    def create_token(cls, user: User) -> Token:
        payload = {
            "id": str(user.id),
            "email": user.email,
            "full_name": user.full_name,
        }
        access_token = cls.encode(payload=payload, token_type="access")
        refresh_token = cls.encode(payload=payload, token_type="refresh")
        return Token(access_token=access_token, refresh_token=refresh_token)
