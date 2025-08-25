from enum import StrEnum
from pathlib import Path

from pydantic import PostgresDsn
from pydantic_settings import BaseSettings


class EnvironmentType(StrEnum):
    DEVELOPMENT = "development"
    PRODUCTION = "production"
    TEST = "test"


class BaseConfig(BaseSettings):
    class Config:
        case_sensitive = True
        env_file = Path(__file__).parent.parent / ".env"
        env_file_encoding = "utf-8"


class Config(BaseConfig):
    ENVIRONMENT: str = EnvironmentType.DEVELOPMENT
    DATABASE_URL: PostgresDsn | str = (
        "postgresql+asyncpg://postgres:postgres@localhost:5432/aletheia-health-system-db"
    )
    TEST_DATABASE_URL: PostgresDsn | str = (
        "postgresql://postgres:postgres@localhost:5434/aletheia-health-system-test-db"
    )
    JWT_SECRET_KEY: str = "super-secret-key"
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    JWT_REFRESH_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7


config: Config = Config()
