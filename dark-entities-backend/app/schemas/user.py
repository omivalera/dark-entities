from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    _id: Optional[int]
    email: EmailStr
    password: str
    role: Optional[str] = "user"   # Solo para admin

class UserRead(BaseModel):
    _id: Optional[int]
    email: EmailStr
    role: str

    class Config:
        orm_mode = True
