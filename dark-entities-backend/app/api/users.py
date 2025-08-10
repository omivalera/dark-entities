from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_normal_user

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
