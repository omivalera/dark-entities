from pydantic import BaseModel
from datetime import datetime

class EventCreate(BaseModel):
    title: str
    description: str
    category: str
    city: str
    date: datetime
    location: str
    total_tickets: int

class EventRead(EventCreate):
    id: str
    tickets_sold: int
    organizer_id: str
