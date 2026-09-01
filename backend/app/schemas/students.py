from typing import Annotated

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

from .common import ApiSuccess


def clean_skill_list(value: list[str]) -> list[str]:
    if not value:
        raise ValueError("skills must contain at least one skill")

    cleaned: list[str] = []
    seen: set[str] = set()
    for skill in value:
        normalized = " ".join(skill.split())
        if not normalized:
            raise ValueError("skills cannot contain blank values")
        key = normalized.casefold()
        if key not in seen:
            cleaned.append(normalized)
            seen.add(key)
    return cleaned


class StudentCreate(BaseModel):
    name: Annotated[str, Field(min_length=2, max_length=120)]
    email: EmailStr
    college: Annotated[str, Field(min_length=2, max_length=180)]
    branch: Annotated[str, Field(min_length=2, max_length=120)]
    year: Annotated[int, Field(ge=1, le=8)]
    skills: Annotated[list[str], Field(min_length=1, max_length=30)]
    communication: str | None = Field(default=None, max_length=50)

    @field_validator("name", "college", "branch")
    @classmethod
    def strip_required_text(cls, value: str) -> str:
        cleaned = " ".join(value.split())
        if not cleaned:
            raise ValueError("value cannot be blank")
        return cleaned

    @field_validator("skills")
    @classmethod
    def validate_skills(cls, value: list[str]) -> list[str]:
        return clean_skill_list(value)


class StudentResponse(StudentCreate):
    model_config = ConfigDict(from_attributes=True)

    id: str
    recommended_domain: str
    recommended_internship: str
    skill_gaps: list[str]


StudentSuccess = ApiSuccess[StudentResponse]
StudentListSuccess = ApiSuccess[list[StudentResponse]]