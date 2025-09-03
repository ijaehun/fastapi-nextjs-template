# backend/app/api/main.py
from fastapi import APIRouter, HTTPException
from app.models.schemas import BaseResponse
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.get("/test", response_model=BaseResponse)
async def test_endpoint():
    """API 테스트 엔드포인트"""
    return BaseResponse(
        message="API가 정상적으로 작동합니다!",
        success=True
    )

@router.get("/info")
async def get_api_info():
    """API 정보 조회"""
    return {
        "api_name": "My Web Template API",
        "version": "1.0.0",
        "status": "active",
        "endpoints": [
            "/api/test",
            "/api/info",
            "/health"
        ]
    }

# TODO: 추가 엔드포인트들을 여기에 구현