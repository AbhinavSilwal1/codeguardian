from fastapi import APIRouter

from app.schemas.analysis import AnalysisResponse
from app.services.guardian_service import analyze_project


router = APIRouter(
    prefix="/api",
    tags=["Analysis"],
)


@router.post(
    "/analyze",
    response_model=AnalysisResponse,
)
def analyze(path: str):
    return analyze_project(path)