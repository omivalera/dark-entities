
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.core.dependencies import get_db, get_current_normal_user, get_current_admin, get_all_users
from app.models.user import User
from app.schemas.user import UserUpdate, UserRead


router = APIRouter()

@router.get("/profile")
def user_profile(current_user=Depends(get_current_normal_user)):
    return {
        "email": current_user.email,
        "name": current_user.name,
        "last_name": current_user.last_name,
        "birthdate": current_user.birthdate,
        "role": current_user.role
    }

@router.put("/profile")
def update_profile(
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_normal_user)
):
    user: User = db.query(User).filter(User.id == current_user.id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.name = user_update.name
    user.last_name = user_update.last_name
    user.birthdate = user_update.birthdate
    db.commit()
    db.refresh(user)
    return {
        "email": user.email,
        "name": user.name,
        "last_name": user.last_name,
        "birthdate": user.birthdate,
        "role": user.role
    }


@router.get("/", response_model=UserRead)
def list_users(
    
    users=Depends(get_all_users)
):
    return users

@router.put("/{user_id}", response_model=UserRead)
def update_user(
    user_id: int,
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    user.name = user_update.name
    user.last_name = user_update.last_name
    user.birthdate = user_update.birthdate
    user.role = user_update.role
    db.commit()
    db.refresh(user)
    return user

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    db.delete(user)
    db.commit()