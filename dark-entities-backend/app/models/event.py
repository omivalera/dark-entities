from sqlalchemy import Column, String, Integer, ForeignKey, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID
import uuid
from .base import Base

class Event(Base):
    __tablename__ = "events"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(Text)
    category = Column(String)
    city = Column(String)
    date = Column(DateTime)
    location = Column(String)
    total_tickets = Column(Integer, default=0)
    tickets_sold = Column(Integer, default=0)
    organizer_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
