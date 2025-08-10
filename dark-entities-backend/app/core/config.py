from typing import List
import os

try:
    from pydantic_settings import BaseSettings, SettingsConfigDict

    class Settings(BaseSettings):
        model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")
        PROJECT_NAME: str = "Dark Entities"
        ALLOW_ORIGINS: List[str] = ["*"]
        DATABASE_URL: str
        SECRET_KEY: str
except ModuleNotFoundError:
    # Fallback when pydantic-settings is not available
    class Settings:
        PROJECT_NAME: str = "Dark Entities"
        ALLOW_ORIGINS: List[str] = os.getenv("ALLOW_ORIGINS", "*").split(",")
        DATABASE_URL: str = os.getenv(
            "DATABASE_URL", "postgresql://postgres:elsaye@localhost/darkentities"
        )
        SECRET_KEY: str = os.getenv("SECRET_KEY", "changeme")

settings = Settings()
