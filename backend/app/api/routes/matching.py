from fastapi import APIRouter

from ...schemas.common import ApiSuccess
from ...schemas.matching import SkillMatchData, SkillMatchRequest
from ...services.skill_matching import calculate_skill_match

router = APIRouter(prefix="/skill-match", tags=["skill matching"])


@router.post("", response_model=ApiSuccess[SkillMatchData])
async def match_skills(payload: SkillMatchRequest) -> ApiSuccess[SkillMatchData]:
    result = calculate_skill_match(payload.student_skills, payload.required_skills)
    return ApiSuccess(data=SkillMatchData.model_validate(result))