// frontend/src/app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui'
import { api } from '@/lib/api'
import type { HealthResponse, ApiTestResponse } from '@/types'

export default function HomePage() {
  const [backendStatus, setBackendStatus] = useState<string>('확인 중...')
  const [apiTest, setApiTest] = useState<string>('')
  const [loading, setLoading] = useState(false)

  // 백엔드 연결 테스트
  const testBackend = async () => {
    setLoading(true)
    try {
      const health: HealthResponse = await api.get('/health')
      setBackendStatus(`✅ 연결됨: ${health.status}`)

      const apiResult: ApiTestResponse = await api.get('/api/test')
      setApiTest(`✅ ${apiResult.message}`)
    } catch (error) {
      setBackendStatus('❌ 연결 실패')
      setApiTest('❌ API 테스트 실패')
      console.error('Backend connection failed:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    testBackend()
  }, [])

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 My Web Template
          </h1>
          <p className="text-lg text-gray-600">
            FastAPI + Next.js 템플릿이 준비되었습니다!
          </p>
        </div>

        {/* 백엔드 연결 상태 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">🔗 백엔드 연결 상태</h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">헬스체크:</span>
              <span>{backendStatus}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">API 테스트:</span>
              <span>{apiTest}</span>
            </div>
          </div>

          <div className="mt-4">
            <Button onClick={testBackend} disabled={loading}>
              {loading ? '테스트 중...' : '다시 테스트'}
            </Button>
          </div>
        </div>

        {/* 시작 가이드 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">📖 시작 가이드</h2>

          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-lg mb-2">✅ 완료된 것들:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>FastAPI 백엔드 서버 실행</li>
                <li>Next.js 프론트엔드 연결</li>
                <li>기본 폴더 구조 생성</li>
                <li>API 통신 테스트</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">🚀 다음 단계:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>필요한 API 엔드포인트 추가</li>
                <li>데이터베이스 연결</li>
                <li>사용자 인증 구현</li>
                <li>비즈니스 로직 개발</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <Button
              onClick={() => window.open('http://localhost:8000/docs', '_blank')}
            >
              📚 API 문서 보기
            </Button>

            <Button
              variant="secondary"
              onClick={() => window.open('https://github.com/your-repo', '_blank')}
            >
              📖 README 보기
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}