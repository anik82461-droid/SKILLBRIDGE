from typing import Annotated

from pydantic import BaseModel, Field, field_validator

from .students import clean_skill_list


class SkillMatchRequest(BaseModel):
    student_skills: Annotated[list[str], Field(min_length=1, max_length=50)]
    required_skills: Annotated[list[str], Field(min_length=1, max_length=50)]

    @field_validator("student_skills", "required_skills")
    @classmethod
    def validate_skill_values(cls, value: list[str]) -> list[str]:
        return clean_skill_list(value)


class SkillMatchData(BaseModel):
    match_percentage: int = Field(ge=0, le=100)
    matched_skills: list[str]
    missing_skills: list[str]


class InternshipMatchRequest(BaseModel):
    student_skills: Annotated[list[str], Field(min_length=1, max_length=50)]

    @field_validator("student_skills")
    @classmethod
    def validate_student_skills(cls, value: list[str]) -> list[str]:
        return clean_skill_list(value)