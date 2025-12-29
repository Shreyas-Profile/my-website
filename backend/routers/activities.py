from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import os
import shutil
from pathlib import Path
from datetime import datetime

from database import get_db
from models import Activity
from schemas import ActivityResponse, ActivityCreate, FileInfo

router = APIRouter(prefix="/api/activities", tags=["activities"])

# Create uploads directory if it doesn't exist
# Use absolute path relative to this file's directory
UPLOAD_DIR = Path(__file__).parent.parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)


def save_uploaded_file(file: UploadFile) -> dict:
    """Save uploaded file and return file info"""
    # Generate unique filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_extension = Path(file.filename).suffix
    unique_filename = f"{timestamp}_{file.filename}"
    file_path = UPLOAD_DIR / unique_filename

    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Return file info
    return {
        "name": file.filename,
        "type": file.content_type or "application/octet-stream",
        "size": file_path.stat().st_size,
        "url": f"/uploads/{unique_filename}"
    }


@router.get("", response_model=List[ActivityResponse])
def get_activities(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all activities"""
    activities = db.query(Activity).order_by(Activity.created_at.desc()).offset(skip).limit(limit).all()
    return activities


@router.get("/{activity_id}", response_model=ActivityResponse)
def get_activity(activity_id: int, db: Session = Depends(get_db)):
    """Get a single activity by ID"""
    activity = db.query(Activity).filter(Activity.id == activity_id).first()
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")
    return activity


@router.post("", response_model=ActivityResponse, status_code=201)
async def create_activity(
    title: str = Form(...),
    description: str = Form(...),
    category: str = Form(...),
    files: Optional[List[UploadFile]] = File(None),
    db: Session = Depends(get_db)
):
    """Create a new activity with optional file uploads"""
    # Process uploaded files
    file_infos = []
    if files:
        for file in files:
            if file.filename:
                file_info = save_uploaded_file(file)
                file_infos.append(file_info)

    # Create activity
    activity = Activity(
        title=title,
        description=description,
        category=category,
        files=file_infos
    )
    
    db.add(activity)
    db.commit()
    db.refresh(activity)
    
    return activity


@router.delete("/{activity_id}", status_code=204)
def delete_activity(activity_id: int, db: Session = Depends(get_db)):
    """Delete an activity by ID"""
    activity = db.query(Activity).filter(Activity.id == activity_id).first()
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")
    
    # Delete associated files
    if activity.files:
        for file_info in activity.files:
            if file_info.get("url"):
                file_path = UPLOAD_DIR / Path(file_info["url"]).name
                if file_path.exists():
                    file_path.unlink()
    
    db.delete(activity)
    db.commit()
    return None

