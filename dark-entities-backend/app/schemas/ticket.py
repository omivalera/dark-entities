from pydantic import BaseModel

class TicketRead(BaseModel):
    id: str
    event_id: str
    user_id: str
    qr_uuid: str
    qr_image: str
    is_valid: bool
