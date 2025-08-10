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
    email: EmailStr
    name: str
    last_name: str
    birthdate: str
    role: str

    class UserRead(BaseModel):
        id: int
        email: str
        name: str
        last_name: str
        birthdate: str
        role: str

        class Config:
            orm_mode = True
    role: str

    class Config:
        orm_mode = True


class UserUpdate(BaseModel):
    name: str
    last_name: str
    birthdate: str
