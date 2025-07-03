import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
    console.log('Token from cookie:', token);
  if(token) {
    console.log("lấy được token")
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    '/user-manage/:path*',
    '/company-manage/:path*',
  ],
}
