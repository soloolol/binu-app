import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { cookies } from "next/headers";

export async function setAuthCookie(
  headers: ReadonlyHeaders
): Promise<boolean> {
  const token = headers.get("authorization")?.split(" ")[1];
  const userId = headers.get("binu-user-id");
  const cookieStore = await cookies();

  if (!(token && userId)) return false;

  cookieStore.set("accessToken", token, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "lax",
  });
  cookieStore.set("userId", userId, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "lax",
  });

  return true;
}
