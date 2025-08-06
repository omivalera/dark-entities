# from sqlalchemy import Column, String, Enum
# from sqlalchemy.dialects.postgresql import UUID
# import uuid
# from .base import Base

# class User(Base):
#     __tablename__ = "users"
#     id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
#     email = Column(String, unique=True, index=True)
#     hashed_password = Column(String, nullable=False)
#     role = Column(Enum('user', 'organizer', name='user_roles'), nullable=False, default='user')

from sqlalchemy import Column, String, Enum
from sqlalchemy.dialects.postgresql import UUID
import uuid
from .base import Base

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum('user', 'organizer', 'admin', 'staff', name='user_roles'), nullable=False, default='user')
