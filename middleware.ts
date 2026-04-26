import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Protect /dashboard and its sub-routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      // No token -> redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Decode JWT payload (payload is the second part of the token)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      const decoded = JSON.parse(jsonPayload);
      
      // Check role - redirect to home if not admin or System
      const role = decoded.role?.toLowerCase();
      if (role !== 'admin' && role !== 'system') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      // Invalid token -> redirect to login
      console.error("Error decoding token in middleware", error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Optional: Prevent logged in users from accessing login page
  if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')) {
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const decoded = JSON.parse(jsonPayload);
        const role = decoded.role?.toLowerCase();
        
        if (role === 'admin' || role === 'system') {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        } else {
          return NextResponse.redirect(new URL('/', request.url));
        }
      } catch (error) {
        // ignore if decoding fails
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
