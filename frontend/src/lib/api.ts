// frontend/src/lib/api.ts
import type { BaseResponse, ApiError, HealthResponse, ApiTestResponse, ApiInfoResponse } from '@/types'

// API 기본 URL 설정
const getApiBaseUrl = () => {
  if (typeof window === 'undefined') {
    // 서버사이드에서는 환경변수 사용
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  }
  
  // 클라이언트사이드에서는 현재 호스트 기반
  const { protocol, hostname } = window.location
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:8000'
  }
  
  // 프로덕션에서는 같은 호스트의 8000 포트 또는 별도 API 서버
  return `${protocol}//${hostname}:8000`
}

const API_BASE_URL = getApiBaseUrl()

class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = API_BASE_URL
    console.log('🔗 API Base URL:', this.baseUrl)
  }

  // 기본 fetch 래퍼
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        detail: `HTTP ${response.status}: ${response.statusText}`
      }))
      throw new Error(error.detail)
    }

    return response.json()
  }

  // GET 요청
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  // POST 요청
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  // PUT 요청
  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // DELETE 요청
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }

  // ========== 기본 API 메서드들 ==========
  async healthCheck() {
    return this.get('/health')
  }

  async testApi(): Promise<BaseResponse> {
    return this.get<BaseResponse>('/api/test')
  }

  async getApiInfo() {
    return this.get('/api/info')
  }

  // TODO: 실제 프로젝트 API들 추가
  // 예시:
  // async getUsers() { return this.get('/api/users') }
  // async createUser(userData) { return this.post('/api/users', userData) }
}

// 전역 API 클라이언트 인스턴스
export const api = new ApiClient()

// 기본 내보내기
export default api