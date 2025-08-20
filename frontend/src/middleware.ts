import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/", "/auth"];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/static")) {
		return NextResponse.next();
	}

	if (PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(path))) {
		return NextResponse.next();
	}

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/profile`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			cookie: request.headers.get("cookie") || "",
		},
	});

	if (res.ok) {
		return NextResponse.next();
	}

	const loginUrl = new URL(process.env.NEXT_PUBLIC_AFTER_SIGN_OUT_URL!, request.url);
	return NextResponse.redirect(loginUrl);
}

export const config = {
	matcher: ["/((?!_next|api|static).*)"],
};
