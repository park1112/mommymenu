import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 임시 권한 체크 - 실제로는 JWT 토큰이나 세션을 확인해야 합니다
function checkAdminAuth(request: NextRequest) {
  // 쿠키에서 admin 토큰 확인 (예시)
  const adminToken = request.cookies.get('admin-token')
  
  // 개발 환경에서는 항상 true (실제 환경에서는 제거)
  if (process.env.NODE_ENV === 'development') {
    return true
  }
  
  // 실제 권한 체크 로직
  return adminToken?.value === 'valid-admin-token'
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // /admin 경로 보호
  if (pathname.startsWith('/admin')) {
    const isAdmin = checkAdminAuth(request)
    
    if (!isAdmin) {
      // 권한이 없으면 로그인 페이지로 리다이렉트
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // 어드민 페이지들
    '/admin/:path*',
    // API 라우트 보호가 필요한 경우
    '/api/admin/:path*'
  ]
}