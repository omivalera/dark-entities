from .base import CRUDBase
from app.models.event import Event

event_crud = CRUDBase(Event)
