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

## Step 2 demo API

The current MVP uses an in-memory repository seeded from the teammate's demo
student data. Data resets when the backend restarts; PostgreSQL is intentionally
reserved for the next milestone.

The backend now includes a connection-only PostgreSQL probe at
`GET /api/db-health`. It reads `DATABASE_URL` from the environment and does not
create tables or persist application data yet.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Confirm the API is running |
| GET | `/api/db-health` | Safely check the PostgreSQL connection |
| POST | `/api/students` | Create a validated student profile |
| GET | `/api/students` | List student profiles |
| GET | `/api/students/{student_id}` | Get one student profile |
| POST | `/api/skill-match` | Compare student and required skills |
| GET | `/api/internships` | List demo internships |
| GET | `/api/internships/{internship_id}` | Get one internship |
| POST | `/api/internships/{internship_id}/match` | Match student skills to an internship |

## Foundation scope

This milestone intentionally includes only the public landing page and API foundation. Authentication, database tables, user profiles, matching, jobs, internships, applications and analytics are reserved for later milestones.