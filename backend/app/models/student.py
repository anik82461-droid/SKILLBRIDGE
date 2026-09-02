from sqlalchemy import Integer, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from ..core.database import Base


class Student(Base):
    __tablename__ = "students"

    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True)
    name: Mapped[str] = mapped_column(Text, nullable=False)
    email: Mapped[str] = mapped_column(Text, nullable=False, unique=True)
    college: Mapped[str] = mapped_column(Text, nullable=False)
    branch: Mapped[str] = mapped_column(Text, nullable=False)
    year: Mapped[int] = mapped_column(Integer, nullable=False)
    skills: Mapped[list] = mapped_column(JSONB, nullable=False, default=list)
    communication: Mapped[str | None] = mapped_column(Text, nullable=True)
    recommended_domain: Mapped[str] = mapped_column(Text, nullable=False)
    recommended_internship: Mapped[str] = mapped_column(Text, nullable=False)
    skill_gaps: Mapped[list] = mapped_column(JSONB, nullable=False, default=list)
