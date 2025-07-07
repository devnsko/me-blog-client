import { NextResponse, NextRequest, userAgent } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname, searchParams } = url;
  // Check if the user is trying to access a protected route (e.g., /me)
  if (pathname.startsWith('/me')) {
    const token = request.cookies.get('jwt'); // Retrieve the auth token from cookies
    // If no token is found, redirect to the login page
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Avoid loop: only rewrite if 'viewport' is not already set
  if (!searchParams.has('viewport')) {
    console.log('Setting viewport based on user agent');
    const { device } = userAgent(request)
    const viewport = device.type || 'desktop'
    url.searchParams.set('viewport', viewport)
    return NextResponse.rewrite(url)
  }

  // If the user is authenticated, continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/me/:path*', '/me'],
}
