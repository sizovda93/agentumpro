import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "CHANGE_ME_IN_PRODUCTION"
);

// Middleware: защита admin-роутов
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Защищаем все /admin/* кроме /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("session")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      // Невалидный или истёкший токен
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
      response.cookies.set("session", "", { maxAge: 0 });
      return response;
    }
  }

  // Защищаем admin API роуты
  if (pathname.startsWith("/api/admin")) {
    const token = request.cookies.get("session")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // Запрет прямого доступа к служебным папкам
  if (
    pathname.startsWith("/uploads/") ||
    pathname.startsWith("/backups/")
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/uploads/:path*", "/backups/:path*"],
};
