# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

(Edit this for your specific project)

- **What**: FastAPI + Next.js 14 fullstack web app
- **Domain**: 
- **Status**: 

## Stack

- **Backend**: FastAPI + Pydantic + Uvicorn
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Infra**: Docker Compose + Nginx (production)
- **Database** (optional): PostgreSQL / SQLite
- **Cache** (optional): Redis

## Architecture

```
project/
├── backend/        # FastAPI
│   └── app/
│       ├── main.py        # Entry
│       ├── core/config.py # Settings
│       ├── api/           # Route handlers
│       ├── models/        # Pydantic schemas
│       ├── services/      # Business logic
│       └── utils/
├── frontend/       # Next.js
│   └── src/
│       ├── app/           # Pages (App Router)
│       ├── components/    # React components
│       ├── services/      # API clients (per feature)
│       ├── contexts/      # Global state (if needed)
│       ├── lib/           # Generic utilities
│       ├── types/         # TS types
│       └── config/env.ts  # Env config central
├── nginx/          # Production reverse proxy
├── scripts/        # Deploy + utility scripts
├── docker-compose.yml      # Production
└── docker-compose.dev.yml  # Development override
```

## Development Commands

### Local (recommended for fast iteration)
```bash
# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # edit as needed
uvicorn app.main:app --reload --port 8000

# Frontend
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

### Docker (full stack)
```bash
# Dev (with hot reload)
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Prod (nginx + optimized builds)
docker-compose up -d --build
```

## Conventions

### Backend
- Route handlers in `app/api/<feature>.py`, mounted in `app/main.py`
- Pydantic models in `app/models/schemas.py` (or per-feature)
- Business logic in `app/services/`
- Settings via `app/core/config.py` (pydantic-settings, reads `.env`)

### Frontend
- Pages in `app/<route>/page.tsx`
- Reusable components in `components/<group>/<Name>.tsx`
- API calls in `services/<feature>Service.ts` (NOT in components)
- Env vars accessed via `config/env.ts` (central)
- Tailwind for styling (no inline CSS unless necessary)

### Environment variables
- `.env.example` always tracked (template)
- `.env` / `.env.local` / `.env.production` always gitignored
- Backend: `app/core/config.py` uses `pydantic-settings` to load
- Frontend: `NEXT_PUBLIC_*` prefix for client-exposed vars, accessed via `config/env.ts`

### Production deployment
- `scripts/deploy.sh` for AWS EC2 deployment
- Nginx routes `/api/*` → backend, `/ws/*` → backend WebSocket, rest → frontend
- Use `docker-compose.yml` (production), not `.dev.yml`

## Notes for Claude Code

- Don't commit secrets — `.env*` files (except `.env.example`) are gitignored
- When adding a new feature: create both backend route handler (`app/api/<feature>.py`) and frontend service (`services/<feature>Service.ts`)
- Path aliases configured in `tsconfig.json`: `@/*` → `src/*`
