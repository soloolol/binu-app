export default async function deleteBookmarkById(id: string): Promise<boolean> {
  const res = await fetch(`/api/place/bookmark/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("서버 응답 실패: " + res.status);
  }
  try {
    return res.json();
  } catch (e) {
    return false;
  }
}
