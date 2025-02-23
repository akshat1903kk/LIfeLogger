from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from routes.auth import get_current_user, db_dependency
from boilerplate import get_summary
from models import Journal
from pydantic import BaseModel
from typing import Annotated

router = APIRouter(
    prefix="/journal",
    tags=["journal"]
)

user_dependency = Annotated[dict, Depends(get_current_user)]

class JournalBody(BaseModel):
    description: str

@router.get("/summary")
def get_journal_summary(user : user_dependency):
    return get_summary(user.get('id'))

@router.get("/")
def get_journals(db: db_dependency, user:user_dependency):
    return db.query(Journal).filter(Journal.user_id == user.get('id')).all()

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_journal(user: user_dependency, journal_request: JournalBody, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    
    new_journal = Journal(**journal_request.model_dump(), user_id=user.get('id'))
    db.add(new_journal)
    db.commit()
    db.refresh(new_journal)
    return new_journal

@router.delete("/{id}")
def delete_journal(id: int, db:db_dependency, user: user_dependency):
    journal_entry = db.query(Journal).filter(Journal.id == id, Journal.user_id == user.get('id')).one_or_none()
    
    if not journal_entry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Journal not found")
    
    db.delete(journal_entry)
    db.commit()
    return {"message": "Journal deleted successfully"}
