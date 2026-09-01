from fastapi import APIRouter, HTTPException

from ...schemas.internships import (
    InternshipListSuccess,
    InternshipMatchData,
    InternshipMatchSuccess,
    InternshipResponse,
    InternshipSuccess,
)
from ...schemas.matching import InternshipMatchRequest
from ...services.repository import repository
from ...services.skill_matching import calculate_skill_match

router = APIRouter(prefix="/internships", tags=["internships"])


@router.get("", response_model=InternshipListSuccess)
async def list_internships() -> InternshipListSuccess:
    internships = [
        InternshipResponse.model_validate(internship)
        for internship in repository.list_internships()
    ]
    return InternshipListSuccess(data=internships)


@router.get("/{internship_id}", response_model=InternshipSuccess)
async def get_internship(internship_id: str) -> InternshipSuccess:
    internship = repository.get_internship(internship_id)
    if internship is None:
        raise HTTPException(status_code=404, detail="Internship not found")
    return InternshipSuccess(data=InternshipResponse.model_validate(internship))


@router.post("/{internship_id}/match", response_model=InternshipMatchSuccess)
async def match_internship(
    internship_id: str,
    payload: InternshipMatchRequest,
) -> InternshipMatchSuccess:
    internship = repository.get_internship(internship_id)
    if internship is None:
        raise HTTPException(status_code=404, detail="Internship not found")

    result = calculate_skill_match(payload.student_skills, internship["required_skills"])
    data = InternshipMatchData(
        internship=InternshipResponse.model_validate(internship),
        **result,
    )
    return InternshipMatchSuccess(data=data)