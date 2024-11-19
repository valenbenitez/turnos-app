import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')

  // Si no hay sesión o el token está expirado
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    // Eliminar la cookie expirada
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('session')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}
