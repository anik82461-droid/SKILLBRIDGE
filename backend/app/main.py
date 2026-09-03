import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .api.routes.health import router as health_router
from .api.routes.internships import router as internships_router
from .api.routes.matching import router as matching_router
from .api.routes.students import router as students_router
from .core.config import get_settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("skillbridge.api")
settings = get_settings()


@asynccontextmanager
async def lifespan(_: FastAPI):
    logger.info("SkillBridge API starting")
    yield
    logger.info("SkillBridge API shutting down")


app = FastAPI(
    title="SkillBridge API",
    description="Academic–industry collaboration for skill development, internships and placement.",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.frontend_url,
        "http://localhost:5000",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_: Request, exc: RequestValidationError) -> JSONResponse:
    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "error": {
                "message": "Request validation failed",
                "details": jsonable_encoder(exc.errors()),
            },
        },
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(_: Request, exc: HTTPException) -> JSONResponse:
    message = exc.detail if isinstance(exc.detail, str) else "Request failed"
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "error": {"message": message}},
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(_: Request, exc: Exception) -> JSONResponse:
    logger.exception("Unhandled API error: %s", exc)
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": {"message": "An unexpected server error occurred"},
        },
    )


app.include_router(health_router, prefix="/api")
app.include_router(students_router, prefix="/api")
app.include_router(matching_router, prefix="/api")
app.include_router(internships_router, prefix="/api")