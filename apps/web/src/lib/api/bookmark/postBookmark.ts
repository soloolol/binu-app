import { Bookmark } from "@/types/Bookmark";

export default async function postBookmark(
  userId: string | undefined,
  placeId: string
): Promise<Bookmark> {
  if (!userId) {
    throw new Error("로그인 정보가 없습니다. userId가 존재하지 않음");
  }

  const res = await fetch(`${process.env.API_BASE_URL}/bookmarks`, {
    method: "POST",
    body: JSON.stringify({ userId, placeId }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return res.json();
}
