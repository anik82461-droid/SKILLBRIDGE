from typing import Annotated

from pydantic import BaseModel, ConfigDict, Field

from .common import ApiSuccess
from .matching import SkillMatchData


class InternshipResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    title: Annotated[str, Field(min_length=2)]
    company: Annotated[str, Field(min_length=2)]
    location: Annotated[str, Field(min_length=2)]
    type: Annotated[str, Field(min_length=2)]
    stipend: Annotated[str, Field(min_length=1)]
    required_skills: list[str] = Field(min_length=1)
    duration: Annotated[str, Field(min_length=1)]


class InternshipMatchData(SkillMatchData):
    internship: InternshipResponse


InternshipListSuccess = ApiSuccess[list[InternshipResponse]]
InternshipSuccess = ApiSuccess[InternshipResponse]
InternshipMatchSuccess = ApiSuccess[InternshipMatchData]