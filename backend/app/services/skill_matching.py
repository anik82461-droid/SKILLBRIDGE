from math import floor
from typing import Any

AVAILABLE_SKILLS = [
    "Python",
    "SQL",
    "Java",
    "Web Development",
    "Data Analysis",
]

LEGACY_SKILL_FIELDS = {
    "python": "Python",
    "sql": "SQL",
    "java": "Java",
    "web": "Web Development",
    "data": "Data Analysis",
}


def normalize_skills(skills: list[str]) -> list[str]:
    """Normalize whitespace and case while retaining the first display label."""
    normalized: list[str] = []
    seen: set[str] = set()
    for skill in skills:
        cleaned = " ".join(skill.split())
        key = cleaned.casefold()
        if key and key not in seen:
            normalized.append(cleaned)
            seen.add(key)
    return normalized


def calculate_skill_match(
    student_skills: list[str],
    required_skills: list[str],
) -> dict[str, Any]:
    """Return an explainable required-skill match result."""
    student = normalize_skills(student_skills)
    required = normalize_skills(required_skills)
    student_lookup = {skill.casefold() for skill in student}

    matched = [skill for skill in required if skill.casefold() in student_lookup]
    missing = [skill for skill in required if skill.casefold() not in student_lookup]
    percentage = floor((len(matched) / len(required)) * 100 + 0.5)

    return {
        "match_percentage": percentage,
        "matched_skills": matched,
        "missing_skills": missing,
    }


def skills_from_legacy_student(student: dict[str, str]) -> list[str]:
    return [
        skill
        for field, skill in LEGACY_SKILL_FIELDS.items()
        if student.get(field, "").strip().casefold() == "yes"
    ]


def recommend_career_domain(skills: list[str]) -> tuple[str, str]:
    """Preserve the prototype's ordered career recommendation rules."""
    skill_keys = {skill.casefold() for skill in normalize_skills(skills)}

    if {"python", "data analysis"} <= skill_keys:
        return "Data Science / Data Analysis", "Data Analyst Intern"
    if {"python", "sql"} <= skill_keys:
        return "Software Development", "Python Developer Intern"
    if {"java", "sql"} <= skill_keys:
        return "Java Development", "Java Developer Intern"
    if "web development" in skill_keys:
        return "Web Development", "Web Developer Intern"
    if "python" in skill_keys:
        return "Python Development", "Python Developer Intern"
    return "Beginner Software Development", "Software Development Intern"


def identify_skill_gaps(skills: list[str]) -> list[str]:
    """Compare a student's skills against the prototype's available skills."""
    student_keys = {skill.casefold() for skill in normalize_skills(skills)}
    return [skill for skill in AVAILABLE_SKILLS if skill.casefold() not in student_keys]


def student_insights(skills: list[str]) -> dict[str, Any]:
    domain, internship = recommend_career_domain(skills)
    return {
        "recommended_domain": domain,
        "recommended_internship": internship,
        "skill_gaps": identify_skill_gaps(skills),
    }