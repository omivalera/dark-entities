from fastapi import APIRouter

router = APIRouter()

@router.get("/{qr_id}")
async def validate_qr(qr_id: str):
    return {"msg": f"Validar QR {qr_id}"}
