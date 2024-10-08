import { NextResponse } from "next/server";
import { parseCookies } from "nookies";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  const { pathname } = req.nextUrl;

  if (!token && pathname == "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  if (token && pathname.startsWith("/auth")) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*"],
};
