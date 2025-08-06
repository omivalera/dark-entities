from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_admin

router = APIRouter()

@router.get("/admin/dashboard")
def admin_dashboard(current_admin=Depends(get_current_admin)):
    return {"msg": "Admin dashboard. Stats, user management, etc."}
