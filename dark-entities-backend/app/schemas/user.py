from pydantic import BaseModel, EmailStr
from typing import Optional


class UserCreate(BaseModel):
    id: Optional[str] = None
    email: EmailStr
    password: str
    role: Optional[str] = "user"   # Solo para admin


class UserRead(BaseModel):
    id: Optional[str] = None
    email: EmailStr
    role: str

    class Config:
        orm_mode = True
