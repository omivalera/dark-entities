from fastapi import APIRouter

router = APIRouter()

@router.post("/purchase/{event_id}")
async def purchase_ticket(event_id: str):
    return {"msg": f"Comprar ticket para evento {event_id}"}

@router.get("/my-tickets")
async def my_tickets():
    return [{"event": "Evento de prueba", "qr": "QR_BASE64"}]
