# My Web Template - 빠른 웹 개발 시작 템플릿 🚀

## 🎯 프로젝트 개요
FastAPI + Next.js 기반의 풀스택 웹 개발 템플릿입니다. 폴더 구조는 확장 가능한 완성형으로 만들어져 있지만, 각 파일은 최소 기능만 포함하여 부담 없이 시작할 수 있습니다.

## 🛠️ 기술 스택

### 백엔드 (✅ 완성)
- **FastAPI** - 고성능 Python 웹 프레임워크
- **Pydantic** - 데이터 검증 및 설정 관리
- **Uvicorn** - ASGI 웹 서버

### 프론트엔드 (✅ 완성)
- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** - 유틸리티 퍼스트 CSS 프레임워크
- **React 18** - 컴포넌트 기반 UI

### 배포 & 인프라
- **Docker & Docker Compose** - 컨테이너화
- **PostgreSQL** (선택사항) - 데이터베이스
- **Redis** (선택사항) - 캐싱

## ✅ 포함된 기능들

### 백엔드 기능
- ✅ FastAPI 기반 REST API 서버
- ✅ 자동 API 문서화 (Swagger)
- ✅ CORS 설정 및 미들웨어
- ✅ 환경 변수 관리 (Pydantic Settings)
- ✅ 모듈화된 라우터 구조
- ✅ 헬스체크 엔드포인트
- ✅ 에러 처리 및 로깅

### 프론트엔드 기능
- ✅ 반응형 웹 디자인
- ✅ 타입스크립트 완벽 지원
- ✅ API 통신 클라이언트
- ✅ 재사용 가능한 UI 컴포넌트
- ✅ 레이아웃 시스템
- ✅ 백엔드 연동 테스트 페이지

## 📁 프로젝트 구조

```
my-web-template/
├── backend/                          # FastAPI 백엔드
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                   # FastAPI 앱 진입점
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   └── config.py             # 설정 관리
│   │   ├── api/                      # API 라우터들
│   │   │   ├── __init__.py
│   │   │   ├── main.py              # 기본 API
│   │   │   ├── admin.py             # 관리자 API (스켈레톤)
│   │   │   └── webhook.py           # 웹훅 API (스켈레톤)
│   │   ├── models/                   # 데이터 모델
│   │   │   ├── __init__.py
│   │   │   └── schemas.py           # Pydantic 스키마
│   │   ├── services/                 # 비즈니스 로직
│   │   │   ├── __init__.py
│   │   │   ├── core_service.py      # 핵심 서비스
│   │   │   ├── session_manager.py   # 세션 관리 (스켈레톤)
│   │   │   ├── cache_service.py     # 캐싱 (스켈레톤)
│   │   │   └── external_api.py      # 외부 API 연동 (스켈레톤)
│   │   └── utils/                    # 유틸리티
│   │       ├── __init__.py
│   │       └── helpers.py
│   ├── requirements.txt              # Python 의존성
│   ├── .env.example                  # 환경변수 예시
│   └── Dockerfile                    # Docker 이미지
│
├── frontend/                         # Next.js 프론트엔드
│   ├── src/
│   │   ├── app/                      # App Router
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx            # 루트 레이아웃
│   │   │   ├── page.tsx              # 메인 페이지 (백엔드 연동 테스트)
│   │   │   └── loading.tsx           # 로딩 페이지
│   │   ├── components/               # 컴포넌트들
│   │   │   ├── ui/                   # 기본 UI 컴포넌트
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Loading.tsx
│   │   │   │   └── index.ts
│   │   │   └── layout/               # 레이아웃 컴포넌트
│   │   │       ├── Header.tsx
│   │   │       ├── Footer.tsx
│   │   │       ├── Layout.tsx
│   │   │       └── index.ts
│   │   ├── lib/                      # 라이브러리
│   │   │   ├── api.ts               # API 클라이언트
│   │   │   └── utils.ts             # 유틸리티 함수
│   │   └── types/                    # 타입 정의
│   │       └── index.ts
│   ├── package.json                  # Node.js 의존성
│   ├── next.config.js               # Next.js 설정
│   ├── tailwind.config.js           # Tailwind CSS 설정
│   ├── tsconfig.json                # TypeScript 설정
│   └── Dockerfile                   # Docker 이미지
│
├── docker-compose.yml               # Docker Compose 설정
├── .gitignore                       # Git 제외 파일들
└── README.md                        # 이 파일
```

## 🚀 빠른 시작

### 방법 1: 로컬 개발 환경

#### 1. 백엔드 서버 실행

```bash
# 백엔드 디렉토리로 이동
cd backend

# 가상환경 생성 및 활성화 (권장)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt

# 환경변수 설정
cp .env.example .env
# .env 파일을 편집하여 필요한 값들 설정

# 서버 실행
uvicorn app.main:app --reload
```

#### 2. 프론트엔드 서버 실행

```bash
# 새 터미널에서 프론트엔드 디렉토리로 이동
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 방법 2: Docker로 실행 (추천)

```bash
# 전체 서비스 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 서비스 중지
docker-compose down
```

### 3. 서비스 접속

- **웹 인터페이스**: http://localhost:3000
- **백엔드 API 문서**: http://localhost:8000/docs
- **백엔드 헬스체크**: http://localhost:8000/health

## 💬 현재 사용 가능한 기능

### 웹 인터페이스
1. 브라우저에서 `http://localhost:3000` 접속
2. 백엔드 연결 상태 실시간 확인
3. API 테스트 버튼으로 통신 테스트
4. API 문서 바로가기 링크

### API 엔드포인트
- `GET /` - 서비스 기본 정보
- `GET /health` - 헬스체크
- `GET /api/test` - API 테스트
- `GET /api/info` - API 정보
- `GET /api/admin/status` - 관리자 상태 (스켈레톤)
- `POST /api/webhook/external` - 웹훅 처리 (스켈레톤)

## 🔧 개발 가이드

### 새로운 API 추가하기

1. **모델 정의** (`backend/app/models/schemas.py`)
```python
class NewItem(BaseModel):
    name: str
    description: str
```

2. **API 엔드포인트 추가** (`backend/app/api/main.py`)
```python
@router.post("/items", response_model=NewItem)
async def create_item(item: NewItem):
    # 비즈니스 로직 구현
    return item
```

3. **프론트엔드 API 클라이언트** (`frontend/src/lib/api.ts`)
```typescript
async createItem(item: NewItem) {
  return this.post('/api/items', item)
}
```

### 새로운 페이지 추가하기

1. **페이지 컴포넌트** (`frontend/src/app/new-page/page.tsx`)
```tsx
export default function NewPage() {
  return <div>새 페이지</div>
}
```

2. **네비게이션 추가** (`frontend/src/components/layout/Header.tsx`)

## 📝 주요 의존성

### 백엔드
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
pydantic-settings==2.1.0
httpx==0.25.2
```

### 프론트엔드
```json
{
  "next": "14.0.3",
  "react": "^18.2.0",
  "typescript": "^5.2.2",
  "tailwindcss": "^3.3.5",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0"
}
```

## 🐳 Docker 사용법

### 기본 명령어
```bash
# 서비스 실행
docker-compose up -d

# 특정 서비스만 실행
docker-compose up backend frontend

# 로그 확인
docker-compose logs backend
docker-compose logs frontend

# 서비스 재시작
docker-compose restart backend

# 볼륨 포함 완전 삭제
docker-compose down -v
```

### 개발 시 유용한 명령어
```bash
# 이미지 재빌드
docker-compose build --no-cache

# 컨테이너 내부 접속
docker-compose exec backend bash
docker-compose exec frontend sh
```

## 🎯 확장 계획

### 즉시 추가 가능한 기능들 (주석 해제만 하면 됨)
- [ ] **PostgreSQL** 데이터베이스 연동
- [ ] **Redis** 캐싱 시스템
- [ ] **Nginx** 리버스 프록시

### 개발 예정 기능들
- [ ] 사용자 인증 시스템 (JWT)
- [ ] 데이터베이스 마이그레이션 (Alembic)
- [ ] 이메일 발송 기능
- [ ] 파일 업로드 처리
- [ ] 소셜 로그인 (OAuth2)
- [ ] API 버전 관리
- [ ] 로깅 및 모니터링
- [ ] 자동 테스트 스위트

## 🚨 트러블슈팅

### 자주 발생하는 문제들

1. **CORS 에러**
   - 확인: `backend/app/core/config.py`의 `ALLOWED_ORIGINS` 설정
   - 해결: `http://localhost:3000` 포함되어 있는지 확인

2. **API 연결 실패**
   - 확인: 백엔드 서버가 8000 포트에서 실행 중인지
   - 해결: `uvicorn app.main:app --reload` 실행

3. **프론트엔드 빌드 오류**
   - 확인: Node.js 버전 (18+ 권장)
   - 해결: `rm -rf node_modules package-lock.json && npm install`

4. **Docker 컨테이너 실행 오류**
   - 확인: Docker Desktop 실행 상태
   - 해결: `docker-compose down && docker-compose up --build`

### 개발 도구 추천
- **API 테스트**: http://localhost:8000/docs (FastAPI 자동 문서)
- **프론트엔드 디버깅**: 브라우저 개발자 도구
- **API 클라이언트**: Postman, Insomnia, 또는 curl
- **DB 관리**: pgAdmin (PostgreSQL 사용시)
- **Redis 관리**: RedisInsight (Redis 사용시)

## 🎉 주요 특징

- ✅ **확장 가능한 구조**: 폴더는 완성형, 기능은 점진적 추가
- ✅ **타입 안전성**: TypeScript 완벽 지원
- ✅ **개발 생산성**: 자동 리로드, API 문서 자동 생성
- ✅ **배포 준비**: Docker 컨테이너화 완료
- ✅ **코드 품질**: ESLint, Prettier, 타입 체크
- ✅ **반응형 디자인**: 모바일/데스크톱 모두 지원

## 📞 지원 및 기여

### 이슈 리포팅
버그나 개선사항이 있으면 GitHub Issues에 등록해주세요.

### 기여 방법
1. Fork 후 새 브랜치 생성
2. 기능 개발 또는 버그 수정
3. 테스트 작성 및 실행
4. Pull Request 제출

### 라이선스
MIT License - 자유롭게 사용, 수정, 배포 가능

---

*마지막 업데이트: 2024년 12월*  
*템플릿 버전: v1.0.0*  
*개발 상태: 프로덕션 준비 완료*