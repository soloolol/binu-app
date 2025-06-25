import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("✅ Middleware activated:", req.nextUrl.pathname);
  console.log("REQ:", req);
  const cookieToken = req.cookies.get("accessToken")?.value;
  const cookieUserId = req.cookies.get("userId")?.value;

  const authHeader = req.headers.get("authorization");
  const userIdHeader = req.headers.get("binu-user-id");

  const headerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : undefined;

  // 2. 인증 없는 요청은 로그인 페이지로 리디렉트
  if (!cookieToken && !headerToken && !cookieUserId && !userIdHeader) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("Token (cookie):", cookieToken);
  console.log("UserId (cookie):", cookieUserId);
  console.log("Token (header):", headerToken);
  console.log("UserId (header):", userIdHeader);

  const res = NextResponse.next();
  res.headers.set("x-middleware-cache", "no-cache");

  // 헤더로 전달 받은 토큰/ID가 있을 땐 쿠키에 저장
  if ((headerToken && !cookieToken) || (userIdHeader && !cookieUserId)) {
    if (headerToken && !cookieToken) {
      const cookie = {
        name: "accessToken",
        value: headerToken,
        option: {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          path: "/",
        },
      };
      req.cookies.set(cookie);
      res.cookies.set(cookie);
    }
    if (userIdHeader && !cookieUserId) {
      const cookie = {
        name: "userId",
        value: userIdHeader,
        option: {
          httpOnly: false,
          secure: true,
          sameSite: "lax",
          path: "/",
        },
      };
      req.cookies.set(cookie);
      res.cookies.set(cookie);
    }
    console.log("Return");
    console.log("RES:", res);
    console.log("==============================");
    return res;
  }

  // 4. 쿠키가 존재하면 정상 요청 통과
  return res;
}

export const config = {
  matcher: [
    /*
     * 다음으로 시작하는 경로를 제외한 모든 요청 경로를 매칭합니다:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     * - fonts
     * - images
     * - login
     */
    "/((?!api|_next/static|_next/image|favicon.ico|fonts|images|login).*)",
  ],
};
