from sqlalchemy.orm import Session

class CRUDBase:
    def __init__(self, model):
        self.model = model

    def get(self, db: Session, id):
        return db.query(self.model).get(id)

    def get_all(self, db: Session, skip=0, limit=100):
        return db.query(self.model).offset(skip).limit(limit).all()

    def create(self, db: Session, obj_in):
        db_obj = self.model(**obj_in.dict())
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(self, db: Session, db_obj, obj_in):
        obj_data = obj_in.dict(exclude_unset=True)
        for field, value in obj_data.items():
            setattr(db_obj, field, value)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, id):
        obj = db.query(self.model).get(id)
        db.delete(obj)
        db.commit()
        return obj
