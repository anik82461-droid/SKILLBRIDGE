from fastapi import APIRouter
from fastapi.responses import JSONResponse
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from ...core.database import (
    classify_database_error,
    database_is_configured,
    engine,
)

router = APIRouter(tags=["system"])


@router.get("/health")
async def health_check() -> dict[str, str | bool]:
    return {
        "success": True,
        "message": "SkillBridge API is running",
    }


@router.get("/db-health")
async def database_health_check() -> JSONResponse:
    if not database_is_configured() or engine is None:
        return JSONResponse(
            status_code=503,
            content={
                "success": False,
                "error": {
                    "message": "Database connection failed",
                    "category": "driver failure",
                },
            },
        )

    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
    except SQLAlchemyError as exc:
        category, sqlstate = classify_database_error(exc)
        # Never include the raw exception or connection details in logs or responses.
        return JSONResponse(
            status_code=503,
            content={
                "success": False,
                "error": {
                    "message": "Database connection failed",
                    "category": category,
                },
            },
        )

    return JSONResponse(
        status_code=200,
        content={
            "success": True,
            "message": "Database connection successful",
        },
    )