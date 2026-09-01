from fastapi import APIRouter, HTTPException, status

from ...schemas.students import (
    StudentCreate,
    StudentListSuccess,
    StudentResponse,
    StudentSuccess,
)
from ...services.repository import repository

router = APIRouter(prefix="/students", tags=["students"])


@router.post("", response_model=StudentSuccess, status_code=status.HTTP_201_CREATED)
async def create_student(payload: StudentCreate) -> StudentSuccess:
    student = repository.create_student(payload.model_dump())
    return StudentSuccess(data=StudentResponse.model_validate(student))


@router.get("", response_model=StudentListSuccess)
async def list_students() -> StudentListSuccess:
    students = [StudentResponse.model_validate(student) for student in repository.list_students()]
    return StudentListSuccess(data=students)


@router.get("/{student_id}", response_model=StudentSuccess)
async def get_student(student_id: str) -> StudentSuccess:
    student = repository.get_student(student_id)
    if student is None:
        raise HTTPException(status_code=404, detail="Student not found")
    return StudentSuccess(data=StudentResponse.model_validate(student))