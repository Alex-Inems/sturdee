import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { updateSession } from "@/lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const isProtected =
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/admin") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/auth") ||
        pathname.startsWith("/book") ||
        pathname.startsWith("/workspace") ||
        pathname.startsWith("/integrate") ||
        pathname.startsWith("/my-credentials");

    if (isProtected) {
        return updateSession(request);
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: [
        "/((?!_next|.*\\..*).*)",
    ],
};
