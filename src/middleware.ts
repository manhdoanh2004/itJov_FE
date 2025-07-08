import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const isLogin = request.cookies.get("isLogin")?.value;
  console.log(request.cookies);
  console.log("isLogin", isLogin);
  if(isLogin == "1") {
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
