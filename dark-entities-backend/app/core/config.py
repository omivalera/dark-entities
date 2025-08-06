import os

class Settings:
    PROJECT_NAME: str = "Dark Entities"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost/darkentities")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "changeme")

settings = Settings()
