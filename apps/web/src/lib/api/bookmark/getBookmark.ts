export default async function getBookmark(
  userId: string | undefined,
  placeId: string
): Promise<string | null> {
  console.log("userId>>>>>", userId);
  if (!userId) {
    throw new Error("로그인 정보가 없습니다. userId가 존재하지 않음");
  }
  // const res = await fetch(
  //   `/api/place/bookmark?userId=${userId}&placeId=${placeId}`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //   }
  // );

  // if (!res.ok) {
  //   throw new Error("서버 응답 실패: " + res.status);
  // }

  // const text = await res.text();
  // if (!text) return null;

  // try {
  //   return JSON.parse(text);
  // } catch (e) {
  //   console.error("JSON 파싱 실패", e);
  //   return null;
  // }
  return null;
}
