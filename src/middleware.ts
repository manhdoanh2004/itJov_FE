import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
export async function middleware(request: NextRequest) {
   const cookieStore = await cookies()
  // const token = request.cookies.get("token")?.value;
  const token = cookieStore.has('token')
    console.log('Token from cookie:', token);
    console.log(cookieStore.getAll())
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
