from pydantic import BaseModel, EmailStr
from typing import Optional



class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str
    last_name: str
    birthdate: str  # formato YYYY-MM-DD
    role: Optional[str] = "user"   # Solo para admin



class UserRead(BaseModel):
    email: str
    name: Optional[str] = None
    last_name: Optional[str] = None
    birthdate: Optional[str] = None
    role: str

    class Config:
        from_attributes = True



class UserUpdate(BaseModel):
    name: str
    last_name: str
    birthdate: str
