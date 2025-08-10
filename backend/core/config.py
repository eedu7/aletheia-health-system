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
    DATABASE_URL: PostgresDsn = "postgresql+asyncpg://postgres:postgres@localhost:5432/aletheia-health-system-db"


config: Config = Config()
print(config.DATABASE_URL)
