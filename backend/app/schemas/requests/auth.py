import re

from pydantic import BaseModel, EmailStr, field_validator, Field


class LoginUserRequest(BaseModel):
    email: EmailStr = Field(..., description="User email address", examples=["john.doe@example.com"])
    password: str = Field(..., description="User password", examples=["Password@123"])

    @classmethod
    @field_validator("password")
    def validate_password(cls, v):
        if not re.search(r"[^a-zA-Z0-9]", v):
            raise ValueError("Password must contain special characters")
        if not re.search(r"[0-9]", v):
            raise ValueError("Password must contain numbers")
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain uppercase characters")
        if not re.search(r"[a-z]", v):
            raise ValueError("Password must contain lowercase characters")
        return v


class RegisterUserRequest(LoginUserRequest):
    full_name: str = Field(..., description="User full name", examples=["John Doe"])

    @classmethod
    @field_validator("full_name")
    def validate_username(cls, v: str) -> str:
        if re.search(r"[^a-zA-Z0-9]", v):
            raise ValueError(
                "Full name must not contain special characters (except spaces)"
            )
        return v
