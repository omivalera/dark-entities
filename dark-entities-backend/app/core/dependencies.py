from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from app.schemas.user import UserRead
from app.models.user import User
from app.database import SessionLocal
from sqlalchemy.orm import Session
import os

SECRET_KEY = os.getenv("SECRET_KEY", "changeme")
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception
    return user

def role_required(role: str):
    def dependency(user: User = Depends(get_current_user)):
        if user.role != role:
            raise HTTPException(status_code=403, detail=f"Access forbidden for role: {user.role}")
        return user
    return dependency

def get_current_admin(user: User = Depends(get_current_user)):
    return role_required("admin")(user)

def get_current_staff(user: User = Depends(get_current_user)):
    return role_required("staff")(user)

def get_current_organizer(user: User = Depends(get_current_user)):
    return role_required("organizer")(user)

def get_current_normal_user(user: User = Depends(get_current_user)):
    return role_required("user")(user)
