from copy import deepcopy
from typing import Any

from ..data.demo_data import DEMO_INTERNSHIPS, LEGACY_STUDENTS
from .skill_matching import skills_from_legacy_student, student_insights


def _legacy_student_record(student_id: str, student: dict[str, str], position: int) -> dict[str, Any]:
    skills = skills_from_legacy_student(student)
    return {
        "id": student_id,
        "name": student["name"].title(),
        "email": f"{student['name'].lower()}{position}@example.com",
        "college": "SkillBridge Demo College",
        "branch": "Computer Science",
        "year": 3,
        "skills": skills,
        "communication": student.get("communication"),
        **student_insights(skills),
    }


class InMemoryRepository:
    """Temporary repository for the pre-database MVP."""

    def __init__(self) -> None:
        self._students: list[dict[str, Any]] = [
            _legacy_student_record(f"student-{index}", student, index)
            for index, student in enumerate(LEGACY_STUDENTS, start=1)
        ]
        self._internships: list[dict[str, Any]] = deepcopy(DEMO_INTERNSHIPS)

    def create_student(self, student: dict[str, Any]) -> dict[str, Any]:
        record = {
            "id": f"student-{len(self._students) + 1}",
            **student,
            **student_insights(student["skills"]),
        }
        self._students.append(record)
        return deepcopy(record)

    def list_students(self) -> list[dict[str, Any]]:
        return deepcopy(self._students)

    def get_student(self, student_id: str) -> dict[str, Any] | None:
        for student in self._students:
            if student["id"] == student_id:
                return deepcopy(student)
        return None

    def list_internships(self) -> list[dict[str, Any]]:
        return deepcopy(self._internships)

    def get_internship(self, internship_id: str) -> dict[str, Any] | None:
        for internship in self._internships:
            if internship["id"] == internship_id:
                return deepcopy(internship)
        return None


repository = InMemoryRepository()