
from typing import List, Optional
import os
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict



def _parse_origins(raw: Optional[str] | List[str]) -> List[str]:
    """Split a comma-separated string into origins, dropping empty items."""
    if isinstance(raw, list):
        cleaned = [item.strip() for item in raw if item and item.strip()]
        return cleaned or ["*"]
    if not raw:
        return ["*"]
    parts = [part.strip() for part in raw.split(",")]
    cleaned = [part for part in parts if part]
    return cleaned or ["*"]


try:
    class Settings(BaseSettings):
        model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")
        PROJECT_NAME: str = "Dark Entities"
        ALLOW_ORIGINS: List[str] = ["*"]
        DATABASE_URL: str
        SECRET_KEY: str


        @field_validator("ALLOW_ORIGINS", mode="before")
        @classmethod
        def split_origins(cls, v):
            return _parse_origins(v)

except ModuleNotFoundError:
    # Fallback when pydantic-settings is not available
    class Settings:
        PROJECT_NAME: str = "Dark Entities"

        ALLOW_ORIGINS: List[str] = _parse_origins(os.getenv("ALLOW_ORIGINS"))

        ALLOW_ORIGINS: List[str] = os.getenv("ALLOW_ORIGINS", "*").split(",")

        DATABASE_URL: str = os.getenv(
            "DATABASE_URL", "postgresql://postgres:elsaye@localhost/darkentities"
        )
        SECRET_KEY: str = os.getenv("SECRET_KEY", "changeme")

settings = Settings()
