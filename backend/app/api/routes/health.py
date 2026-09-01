from fastapi import APIRouter

router = APIRouter(tags=["system"])


@router.get("/health")
async def health_check() -> dict[str, str | bool]:
    return {
        "success": True,
        "message": "SkillBridge API is running",
    }