import uuid
from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Response, status, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import jwt, JWTError

from app.models.user import User
from app.schemas.user import UserCreate, UserRead
from app.core.dependencies import get_db
from app.core.security import get_password_hash, verify_password
from app.core.config import settings

router = APIRouter()

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 1 día
COOKIE_NAME = "access_token"

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def _set_no_cache(resp: Response):
    resp.headers["Cache-Control"] = "no-store"

def _set_auth_cookie(resp: Response, token: str):
    resp.set_cookie(
        key=COOKIE_NAME,
        value=token,            # guarda solo el JWT
        httponly=True,
        samesite="lax",         # perfecto para localhost navegando entre páginas
        secure=False,           # en prod (HTTPS) => True
        path="/",
        max_age=60 * 60 * 24 * 7,
    )

def _clear_auth_cookie(resp: Response):
    resp.delete_cookie(COOKIE_NAME, path="/")

def _token_from_request(request: Request) -> str | None:
    # 1) Cookie
    token = request.cookies.get(COOKIE_NAME)
    if token:
        return token
    # 2) Authorization: Bearer
    auth = request.headers.get("Authorization", "")
    if auth.startswith("Bearer "):
        return auth.split(" ", 1)[1]
    return None

def _decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido") from e

@router.post("/login")
def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    access_token = create_access_token(
        data={"sub": str(user.id), "role": user.role},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )

    # Seteamos cookie + evitamos cache (para que no te devuelva 304)
    _set_auth_cookie(response, access_token)
    _set_no_cache(response)

    # Opcional: también puedes devolver el token por body si lo usas en header
    return {
        "ok": True,
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "last_name": user.last_name,
            "birthdate": user.birthdate,
            "role": user.role,
        },
    }

@router.post("/logout")
def logout(response: Response):
    _clear_auth_cookie(response)
    _set_no_cache(response)
    return {"ok": True}

@router.get("/me")
def me(request: Request, db: Session = Depends(get_db), response: Response = None):
    token = _token_from_request(request)
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No token")

    payload = _decode_token(token)
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Token sin sub")

    user = db.query(User).get(user_id)
    if not user:
        raise HTTPException(status_code=401, detail="Usuario no encontrado")

    if response:
        _set_no_cache(response)

    return {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "last_name": user.last_name,
        "birthdate": user.birthdate,
        "role": user.role,
    }

@router.post("/register", response_model=UserRead)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user_in.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    user_obj = User(
        id=str(uuid.uuid4()),
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        name=user_in.name,
        last_name=user_in.last_name,
        birthdate=user_in.birthdate,
        role=user_in.role,
    )
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj
