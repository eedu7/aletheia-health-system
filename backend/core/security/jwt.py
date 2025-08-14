from http import HTTPStatus
from typing import Any, Dict, Literal

from core.exceptions import CustomException


class JWTDecodeError(CustomException):
    code = HTTPStatus.UNAUTHORIZED
    message = "Invalid token"


class JWTExpiredError(CustomException):
    code = HTTPStatus.UNAUTHORIZED
    message = "Token expired"


TokenType = Literal["access", "refresh"]


class JWTHandler:
    @classmethod
    def encode(cls, token_type: TokenType, payload: Dict[str, Any]) -> str:
        pass

    @classmethod
    def decode(cls, token: str, verify_expired: bool = True) -> Dict[str, Any]:
        pass
