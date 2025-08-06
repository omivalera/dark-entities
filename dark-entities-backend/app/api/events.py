from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def list_events():
    return [{"title": "Evento de prueba"}]

@router.post("/")
async def create_event():
    return {"msg": "Crear evento (sólo organizador)"}
