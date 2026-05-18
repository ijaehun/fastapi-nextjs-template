# FastAPI + Next.js Template

빠른 웹 개발 시작용 풀스택 템플릿. NEXUS / COMPASS / HELM에서 검증된 구조 반영.

## 🎯 사용법

```bash
# 1. 템플릿 복사 (또는 GitHub에서 새 repo로 fork)
cp -r fastapi-nextjs-template/ <your-new-project>/
cd <your-new-project>/

# 2. .env 파일 준비
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# 3. git 초기화
rm -rf .git
git init
git add .
git commit -m "init: from fastapi-nextjs-template"

# 4. 개발 시작
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

## 🛠️ 기술 스택

### Backend
- **FastAPI** + Pydantic + Uvicorn
- **pydantic-settings** — `.env` 자동 로드
- Optional: PostgreSQL, Redis, OpenAI API

### Frontend
- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS**
- **axios** (services/api.ts)
- React 18

### Infrastructure
- **Docker + Docker Compose**
- **Nginx** — 프로덕션 리버스 프록시 (api/ws/frontend 라우팅)

## 📁 구조

```
project/
├── README.md, CLAUDE.md, LICENSE
├── .env.example
├── docker-compose.yml          # 프로덕션
├── docker-compose.dev.yml      # 개발 override (hot reload)
│
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── .env.example
│   └── app/
│       ├── main.py             # FastAPI 엔트리
│       ├── core/config.py      # 환경변수 (pydantic-settings)
│       ├── api/                # 라우터 (feature별)
│       │   ├── main.py
│       │   ├── admin.py        # 관리자 라우터 (스켈레톤)
│       │   └── webhook.py      # 웹훅 (스켈레톤)
│       ├── models/             # Pydantic 스키마
│       ├── services/           # 비즈니스 로직
│       └── utils/
│
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── .env.example
│   └── src/
│       ├── app/                # Next.js App Router 페이지
│       ├── components/
│       │   ├── ui/             # Button, Card, Loading
│       │   └── layout/         # Header, Footer, Layout
│       ├── services/           # 🆕 API 클라이언트 (feature별)
│       │   ├── api.ts          # axios base
│       │   └── README.md
│       ├── contexts/           # 🆕 전역 상태 (필요시)
│       │   └── README.md
│       ├── config/             # 🆕 환경변수 중앙
│       │   └── env.ts
│       ├── lib/                # 일반 유틸
│       │   ├── api.ts          # legacy (services/로 옮기는 거 권장)
│       │   └── utils.ts
│       └── types/              # TypeScript 타입
│
├── nginx/
│   └── nginx.conf              # 🆕 리버스 프록시 (api/ws/frontend)
│
└── scripts/
    └── deploy.sh               # 🆕 EC2 배포 스크립트
```

## 🚀 빠른 시작

### 방법 1: 로컬 개발 (빠른 iteration)

```bash
# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Frontend (새 터미널)
cd frontend
npm install
npm run dev
```

### 방법 2: Docker 개발 (전체 스택, hot reload)
```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

### 방법 3: Docker 프로덕션 (nginx 포함)
```bash
docker-compose up -d --build
```

### 접속
- **개발**: Frontend http://localhost:3000, Backend http://localhost:8000
- **프로덕션**: http://localhost (nginx 통합)
- **API 문서**: http://localhost:8000/docs (Swagger UI)

## 📐 구조 원칙

### Backend "4-folder rule"
```
api/        라우터 (feature별)
core/       설정 / 미들웨어
models/     Pydantic 스키마
services/   비즈니스 로직
```
+ optional: `utils/`, `db/`, `tasks/` (Celery 쓰면)

### Frontend "services 분리"
- API call은 `services/<feature>Service.ts`에 (컴포넌트에 직접 fetch 금지)
- 환경변수는 `config/env.ts`로 중앙화
- 전역 상태는 `contexts/` (필요할 때만)

### 환경 변수
- `.env.example` 항상 tracked (실 값 없음)
- `.env*` (실 값) 항상 gitignored
- Backend: `pydantic-settings`가 자동 로드
- Frontend: `NEXT_PUBLIC_*` 접두사 (클라이언트 노출용)

### Docker 분리
- `docker-compose.yml` — 프로덕션 (이미지 빌드 + nginx)
- `docker-compose.dev.yml` — 개발 override (bind mount + hot reload)

## 🌐 Nginx 라우팅 (프로덕션)

`nginx/nginx.conf`가 다음 분기:
- `/api/*` → backend:8000
- `/ws/*` → backend:8000 (WebSocket upgrade)
- `/docs`, `/openapi.json` → backend:8000
- 나머지 → frontend:3000

## 🚢 배포

```bash
# AWS EC2 등
EC2_HOST=your.server.ip \
EC2_USER=ubuntu \
KEY_FILE=~/.ssh/key.pem \
APP_NAME=my-app \
bash scripts/deploy.sh
```

`scripts/deploy.sh`를 본인 환경에 맞게 커스터마이즈.

## 📝 어디 적용했나

- **NEXUS** (스마트팩토리 모니터링)
- **COMPASS** (창원대 학생성공지원)
- **HELM** (KRISO LAM 시스템 — Django + Channels로 변형)
- **CURC** (창원대 RAG 챗봇)
- **SEF** (부산 학교 예측)
- **AIRTECH** (LG ES VPD PoC)

## 📜 라이선스

MIT. fork/clone 자유롭게.
