from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_staff

router = APIRouter()

@router.get("/staff/validate-ticket/{ticket_id}")
def staff_validate(ticket_id: str, current_staff=Depends(get_current_staff)):
    # Aquí va la lógica para validar tickets
    return {"ticket_id": ticket_id, "status": "valid"}
