import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check if the request is for the protected route
  if (request.nextUrl.pathname.startsWith('/protected')) {
    // Get the API key from the URL
    const apiKey = request.nextUrl.searchParams.get('key');
    
    // If no API key is provided in URL, redirect to playground
    if (!apiKey) {
      return NextResponse.redirect(new URL('/playground', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/protected/:path*',
}; 