from sqlalchemy import Column, ForeignKey, Boolean, DateTime, String
from sqlalchemy.dialects.postgresql import UUID
import uuid
from .base import Base

class Ticket(Base):
    __tablename__ = "tickets"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    event_id = Column(UUID(as_uuid=True), ForeignKey('events.id'))
    qr_uuid = Column(UUID(as_uuid=True), unique=True, default=uuid.uuid4)
    qr_image = Column(String, nullable=True)
    is_valid = Column(Boolean, default=True)
    purchase_date = Column(DateTime)
