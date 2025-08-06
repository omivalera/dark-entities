from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_normal_user

router = APIRouter()

@router.get("/profile")
def user_profile(current_user=Depends(get_current_normal_user)):
    return {"email": current_user.email, "role": current_user.role}
