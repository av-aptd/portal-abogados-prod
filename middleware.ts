import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let token = String(request.cookies.get("token")?.value);

  if (token == null || token == "undefined") {
    console.log("token null");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/portal/:path*",
};
