"""
Project Schemas - Pydantic models for API validation
"""

from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ProjectCreate(BaseModel):
    idea: str


class ProjectResponse(BaseModel):
    id: str
    user_id: str
    idea: str
    status: str
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True


class ProjectList(BaseModel):
    projects: list[ProjectResponse]
    total: int
