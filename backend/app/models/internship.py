from sqlalchemy import Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from ..core.database import Base


class Internship(Base):
    __tablename__ = "internships"

    id: Mapped[str] = mapped_column(Text, primary_key=True)
    title: Mapped[str] = mapped_column(Text, nullable=False)
    company: Mapped[str] = mapped_column(Text, nullable=False)
    location: Mapped[str] = mapped_column(Text, nullable=False)
    type: Mapped[str] = mapped_column(Text, nullable=False)
    stipend: Mapped[str | None] = mapped_column(Text, nullable=True)
    required_skills: Mapped[list] = mapped_column(
        JSONB,
        nullable=False,
        default=list,
    )
    duration: Mapped[str | None] = mapped_column(Text, nullable=True)
