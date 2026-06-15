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
- **자동 배포**: `.github/workflows/deploy.yml` — main push 시 빌드 검사 후 서버에 SSH로 배포. 셋업은 `DEPLOY.md` 참고.
- **수동 배포**: `scripts/deploy.sh` (tar+scp) 또는 서버에서 `git pull && docker compose up -d --build`
- 프로덕션은 `docker-compose.yml` 사용 (`.dev.yml` 아님). 프론트는 **standalone 빌드**(`output: 'standalone'` + `node server.js`)로 실행됨 — 절대 `npm run dev`로 운영하지 말 것
- Nginx routes `/api/*` → backend, rest → frontend

## Notes for Claude Code

이 리포는 `fastapi-nextjs-template` 기반이다. 작업 시 아래 가이드라인을 따른다.

### 일반
- Don't commit secrets — `.env*` files (except `.env.example`) are gitignored. `.db` 파일, 빌드 산출물(`.next/`, `node_modules/`)도 커밋 금지.
- When adding a new feature: create both backend route handler (`app/api/<feature>.py`) and frontend service (`services/<feature>Service.ts`)
- Path aliases configured in `tsconfig.json`: `@/*` → `src/*`

### 배포가 깨지지 않게 (중요)
- **프론트 `next.config.js`의 `output: 'standalone'`을 절대 지우지 말 것** — 프로덕션 Dockerfile(`node server.js`)이 이걸 전제로 동작한다. 지우면 도커 빌드가 깨진다.
- **프로덕션 `docker-compose.yml`에 소스 bind-mount(`./frontend:/app` 등)를 추가하지 말 것** — standalone 실행을 덮어써서 망가진다. 핫리로드 마운트는 `docker-compose.dev.yml` 에만.
- 프론트 Dockerfile을 `npm run dev`로 바꾸지 말 것 (운영을 개발 모드로 돌리는 것). 빌드 타입 에러가 나면 dev로 우회하지 말고 **타입 에러 자체를 고친다**.
- `NEXT_PUBLIC_*`는 **빌드 시점에 박힌다**. 프로덕션은 nginx 뒤 상대경로(`/api`)를 쓰므로 `NEXT_PUBLIC_API_URL`은 보통 비워둔다.

### 변경 후 셀프 체크
- 배포에 영향 가는 변경(프론트 코드/타입/Dockerfile/compose)을 했으면, push 전에 로컬에서 `cd frontend && npm run build`가 통과하는지 확인한다 (CI 빌드 게이트와 동일한 검사).
- 백엔드 변경 시 `cd backend && python -c "import app.main"`로 import가 깨지지 않는지 확인.

### CI/CD
- 배포 파이프라인·서버 인증(Deploy Key / PAT)·Secrets 설정은 `DEPLOY.md`에 정리돼 있다. 배포 관련 질문/작업은 거기를 먼저 참고한다.
