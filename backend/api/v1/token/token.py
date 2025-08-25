from fastapi import APIRouter, Request, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

from app.models.user import User
from app.schemas.extra import Token, TokenType
from core.exceptions.base import BadRequestException, UnauthorizedException
from core.security.jwt import JWTHandler

router = APIRouter()


class VerifyToken(BaseModel):
    access_token: str | None = Field(None, description="Access token to verify", examples=[""])


class RefreshToken(BaseModel):
    refresh_token: str | None = Field(None, description="Refresh token to refresh", examples=[""])


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
async def refresh_token(request: Request, request_data: RefreshToken) -> Token:
    refresh_token = request_data.refresh_token or request.cookies.get(TokenType.REFRESH_TOKEN)

    if not refresh_token:
        raise UnauthorizedException("Token is missing")

    try:
        payload = JWTHandler.decode(refresh_token, verify_exp=False)

        if payload.get("token_type") != "refresh":
            raise BadRequestException("Invalid token type")

        user = User(
            id=payload["user"]["sub"],
            email=payload["user"]["email"],
            full_name=payload["user"]["full_name"],
        )

        return JWTHandler.create_token(user)

    except Exception:
        raise BadRequestException("Invalid refresh token")
