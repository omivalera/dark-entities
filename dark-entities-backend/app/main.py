from fastapi import FastAPI
from app.api import auth, events, tickets, validate, admin, staff, users
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Dark Entities API",
    description="Venta y validación de entradas para eventos con QR",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # o ["*"] para pruebas
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(events.router, prefix="/events", tags=["events"])
app.include_router(tickets.router, prefix="/tickets", tags=["tickets"])
app.include_router(validate.router, prefix="/validate", tags=["validate"])
app.include_router(admin.router, prefix="/admin", tags=["admin"])
app.include_router(staff.router, prefix="/staff", tags=["staff"])
app.include_router(users.router, prefix="/users", tags=["users"])

