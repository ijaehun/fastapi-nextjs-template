# backend/app/core/config.py
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # 기본 설정
    APP_NAME: str = "My Web Template"
    DEBUG: bool = True
    ENVIRONMENT: str = "development"
    
    # 서버 설정
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # CORS 설정 (개발용 - 실제 배포시 수정 필요)
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*"
    ]
    
    # 데이터베이스 (필요시 추가)
    DATABASE_URL: str = "sqlite:///./app.db"
    
    # 보안 (실제 배포시 변경 필요)
    SECRET_KEY: str = "change-this-secret-key"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# 전역 설정 인스턴스
settings = Settings()