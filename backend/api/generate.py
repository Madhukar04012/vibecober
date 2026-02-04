from fastapi import APIRouter
from pydantic import BaseModel
from backend.core.orchestrator import orchestrate

router = APIRouter(prefix="/generate", tags=["Project Generator"])

class ProjectRequest(BaseModel):
    idea: str
    mode: str = "full"  # simple, full, or production

@router.post("/project")
def generate_project(req: ProjectRequest):
    """Generate project using Team Lead Brain (Phase 2)"""
    result = orchestrate(req.idea, mode=req.mode, use_v2=True)
    return {
        "message": "Project generated successfully",
        "data": result
    }
