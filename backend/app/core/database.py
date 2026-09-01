import os
from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker


def _get_sqlalchemy_url() -> str | None:
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        return None

    # SQLAlchemy with psycopg uses the explicit postgresql+psycopg dialect.
    # Accept the common postgres, postgresql, and legacy psycopg2 prefixes.
    for prefix in (
        "postgresql+psycopg2://",
        "postgresql+psycopg://",
        "postgresql://",
        "postgres://",
    ):
        if database_url.startswith(prefix):
            return "postgresql+psycopg://" + database_url.removeprefix(prefix)
    return database_url


SQLALCHEMY_DATABASE_URL = _get_sqlalchemy_url()
engine = (
    create_engine(SQLALCHEMY_DATABASE_URL, pool_pre_ping=True)
    if SQLALCHEMY_DATABASE_URL
    else None
)
SessionLocal = (
    sessionmaker(autocommit=False, autoflush=False, bind=engine)
    if engine is not None
    else None
)


class Base(DeclarativeBase):
    """Base class reserved for the schema milestone."""


def database_is_configured() -> bool:
    return engine is not None


def get_db() -> Generator[Session, None, None]:
    if SessionLocal is None:
        raise RuntimeError("Database is not configured")

    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()