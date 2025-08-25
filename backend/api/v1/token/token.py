from fastapi import APIRouter, Request, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

from app.schemas.extra.token_type import TokenType
from core.exceptions.base import UnauthorizedException
from core.security.jwt import JWTHandler

router = APIRouter()


class VerifyToken(BaseModel):
    access_token: str | None = Field(None, description="Access token to verify", examples=[""])


@router.post("/verify")
async def verify_token(request: Request, request_data: VerifyToken) -> JSONResponse:
    access_token = request_data.access_token or request.cookies.get(TokenType.ACCESS_TOKEN)

    if access_token is None:
        raise UnauthorizedException("Token is missing")

    try:
        JWTHandler.decode(access_token)
    except Exception:
        raise UnauthorizedException("Invalid or expired token")

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "valid": True,
        },
    )


@router.post("/refresh")
async def refresh_token():
    # TODO: Refresh the token
    pass
