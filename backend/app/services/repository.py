import uuid
from copy import deepcopy
from typing import Any

from sqlalchemy import select

from ..core.database import SessionLocal
from ..data.demo_data import DEMO_INTERNSHIPS, LEGACY_STUDENTS
from ..models import Internship, Student
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


class DatabaseRepository:
    """Persistent repository backed by Supabase PostgreSQL."""

    def __init__(self) -> None:
        self._seed_internships()

    def _require_session(self):
        if SessionLocal is None:
            raise RuntimeError("Database is not configured")
        return SessionLocal()

    def _seed_internships(self) -> None:
        with self._require_session() as db:
            existing = db.scalar(select(Internship.id).limit(1))
            if existing is not None:
                return

            for internship in DEMO_INTERNSHIPS:
                db.add(Internship(**deepcopy(internship)))

            db.commit()

    def _student_dict(self, student: Student) -> dict[str, Any]:
        return {
            "id": student.id,
            "name": student.name,
            "email": student.email,
            "college": student.college,
            "branch": student.branch,
            "year": student.year,
            "skills": deepcopy(student.skills),
            "communication": student.communication,
            "recommended_domain": student.recommended_domain,
            "recommended_internship": student.recommended_internship,
            "skill_gaps": deepcopy(student.skill_gaps),
        }

    def _internship_dict(self, internship: Internship) -> dict[str, Any]:
        return {
            "id": internship.id,
            "title": internship.title,
            "company": internship.company,
            "location": internship.location,
            "type": internship.type,
            "stipend": internship.stipend,
            "required_skills": deepcopy(internship.required_skills),
            "duration": internship.duration,
        }

    def create_student(self, student: dict[str, Any]) -> dict[str, Any]:
        insights = student_insights(student["skills"])

        record = {
            "id": str(uuid.uuid4()),
            **student,
            **insights,
        }

        with self._require_session() as db:
            db_student = Student(**record)
            db.add(db_student)
            db.commit()
            db.refresh(db_student)
            return self._student_dict(db_student)

    def list_students(self) -> list[dict[str, Any]]:
        with self._require_session() as db:
            students = db.scalars(select(Student).order_by(Student.name)).all()
            return [self._student_dict(student) for student in students]

    def get_student(self, student_id: str) -> dict[str, Any] | None:
        with self._require_session() as db:
            student = db.get(Student, student_id)
            return self._student_dict(student) if student else None

    def list_internships(self) -> list[dict[str, Any]]:
        with self._require_session() as db:
            internships = db.scalars(select(Internship).order_by(Internship.id)).all()
            return [self._internship_dict(internship) for internship in internships]

    def get_internship(self, internship_id: str) -> dict[str, Any] | None:
        with self._require_session() as db:
            internship = db.get(Internship, internship_id)
            return self._internship_dict(internship) if internship else None


repository = DatabaseRepository()
