from .base import CRUDBase
from app.models.ticket import Ticket

ticket_crud = CRUDBase(Ticket)
