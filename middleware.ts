import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const session = request.cookies.get("auth-session");
    const { pathname } = request.nextUrl;

    // Protect /admin
    if (pathname.startsWith("/admin")) {
        if (!session) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // Redirect authenticated users from /login to /admin
    if (pathname === "/login") {
        if (session) {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/login"],
};
