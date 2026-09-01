# SkillBridge

SkillBridge is a ₹0-cost Smart India Hackathon 2026 foundation for academic–industry collaboration around skills, internships and placement.

## Project structure

```text
frontend/     React + TypeScript + Vite + Tailwind CSS landing page
backend/      FastAPI application scaffold
```

## Run the frontend

```bash
npm run dev
```

The frontend listens on `http://localhost:5000`.

## Run the backend

From the project root:

```bash
uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
```

The API listens on `http://localhost:8000`. Swagger documentation is available at `/docs`, and the health check is at `/api/health`.

## Foundation scope

This milestone intentionally includes only the public landing page and API foundation. Authentication, database tables, user profiles, matching, jobs, internships, applications and analytics are reserved for later milestones.