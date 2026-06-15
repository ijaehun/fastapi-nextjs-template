// frontend/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 프로덕션 Docker 빌드용: .next/standalone 생성 (Dockerfile의 node server.js 가 이걸 사용)
  output: 'standalone',

  // API 프록시 설정 (개발용)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*',
      },
    ]
  }
}

module.exports = nextConfig