import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("authToken");
  const url = req.nextUrl.clone();

  if (!token && url.pathname !== "/auth/login") {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
