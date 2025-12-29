from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class FileInfo(BaseModel):
    name: str
    type: str
    size: int
    url: Optional[str] = None


class ActivityBase(BaseModel):
    title: str
    description: str
    category: str


class ActivityCreate(ActivityBase):
    files: List[FileInfo] = []


class ActivityResponse(ActivityBase):
    id: int
    files: List[FileInfo]
    created_at: datetime

    class Config:
        from_attributes = True

