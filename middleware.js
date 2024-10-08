import { NextResponse } from "next/server";
import { parseCookies } from "nookies";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  console.log("token", token);
  const { pathname } = req.nextUrl;

  console.log("pathname", pathname);

  if (!token && pathname == "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // If the user is authenticated and trying to access the login page, redirect to home
  if (token && pathname.startsWith("/auth")) {
    const url = req.nextUrl.clone();
    url.pathname = "/"; // Redirect to the home page
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*"],
};
