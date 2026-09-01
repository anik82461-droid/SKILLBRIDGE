import os
from collections.abc import Generator
from importlib.util import find_spec
from re import fullmatch
from typing import Any

from sqlalchemy import create_engine
from sqlalchemy.engine import URL, make_url
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker


SUPPORTED_DATABASE_SCHEMES = (
    "postgres://",
    "postgresql://",
    "postgresql+psycopg://",
    "postgresql+psycopg2://",
)

FAILURE_CATEGORIES = (
    "DNS/hostname resolution failure",
    "TCP/network connection failure",
    "Connection timeout",
    "SSL/TLS failure",
    "PostgreSQL authentication failure",
    "PostgreSQL database does not exist",
    "PostgreSQL permission failure",
    "PostgreSQL driver/configuration failure",
    "Unknown OperationalError",
)


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


def _parse_database_url() -> tuple[URL | None, bool]:
    database_url = os.getenv("DATABASE_URL")
    if not database_url or not database_url.startswith(SUPPORTED_DATABASE_SCHEMES):
        return None, False

    try:
        parsed = make_url(database_url)
    except Exception:
        return None, False

    format_is_valid = (
        parsed.drivername in {"postgresql", "postgresql+psycopg", "postgresql+psycopg2"}
        and bool(parsed.host)
        and parsed.port is not None
        and 1 <= parsed.port <= 65535
        and bool(parsed.database)
        and bool(parsed.username)
    )
    return parsed, format_is_valid


def database_url_format_is_valid() -> bool:
    _, format_is_valid = _parse_database_url()
    return format_is_valid


def postgres_driver_is_installed() -> bool:
    # psycopg is the driver used by the normalized SQLAlchemy URL.
    return find_spec("psycopg") is not None


def _safe_sqlstate(error: BaseException) -> str | None:
    original = getattr(error, "orig", error)
    sqlstate = getattr(original, "sqlstate", None) or getattr(original, "pgcode", None)
    if isinstance(sqlstate, str) and fullmatch(r"[0-9A-Z]{5}", sqlstate):
        return sqlstate
    return None


def classify_database_error(error: BaseException) -> tuple[str, str | None]:
    """Classify an error without returning or logging its raw message."""
    sqlstate = _safe_sqlstate(error)
    original = getattr(error, "orig", error)
    message = str(original).lower()

    if sqlstate:
        if sqlstate.startswith("28"):
            return "PostgreSQL authentication failure", sqlstate
        if sqlstate == "3D000":
            return "PostgreSQL database does not exist", sqlstate
        if sqlstate == "42501":
            return "PostgreSQL permission failure", sqlstate
        if sqlstate.startswith("08"):
            return "TCP/network connection failure", sqlstate

    if any(signal in message for signal in ("could not translate host", "name or service not known", "nodename nor servname")):
        return "DNS/hostname resolution failure", sqlstate
    if any(signal in message for signal in ("timeout", "timed out")):
        return "Connection timeout", sqlstate
    if any(signal in message for signal in ("ssl", "tls", "certificate")):
        return "SSL/TLS failure", sqlstate
    if any(signal in message for signal in ("password authentication", "authentication failed", "invalid password", "tenant or user not found")):
        return "PostgreSQL authentication failure", sqlstate
    if any(signal in message for signal in ("database does not exist", "invalid_catalog_name")):
        return "PostgreSQL database does not exist", sqlstate
    if any(signal in message for signal in ("permission denied", "insufficient privilege")):
        return "PostgreSQL permission failure", sqlstate
    if any(signal in message for signal in ("no module named", "invalid dsn", "could not load", "unsupported")):
        return "PostgreSQL driver/configuration failure", sqlstate
    if any(signal in message for signal in ("connection refused", "network is unreachable", "connection reset", "server closed the connection")):
        return "TCP/network connection failure", sqlstate
    return "Unknown OperationalError", sqlstate


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


def database_diagnostic() -> dict[str, Any]:
    """Return only safe, non-secret connection diagnostics."""
    _, format_is_valid = _parse_database_url()
    return {
        "database_url_format_valid": format_is_valid,
        "postgresql_driver_installed": postgres_driver_is_installed(),
    }


def get_db() -> Generator[Session, None, None]:
    if SessionLocal is None:
        raise RuntimeError("Database is not configured")

    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()