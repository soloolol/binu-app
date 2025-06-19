import { PlaceDetails } from "@/types/Place";

const placeDetails: PlaceDetails = {
  id: "123",
  name: "피자 하우스",
  subtitle: "이탈리안",
  binuScore: 4.8,
  starScore: 4.7,
  tags: ["hasSoap", "hasToiletPaper", "genderSeparated", "hasDiaperTable"],
  bookmark: true,
  reviews: [
    {
      id: "123",
      userNick: "깐깐한북어",
      date: "2025-06-10",
      binuScore: 4,
      content: "비누, 화장지 있어요 두 칸 밖에 없어서 기다려야 할 때 있어요",
      profileImgUrl: "/images/orange.png",
    },
    {
      id: "456",
      userNick: "섹시한캥거루",
      date: "2025-05-01",
      binuScore: 5,
      content:
        "연휴에 아이들 데리고 근처 식당 찾다가 기저귀 교환대 있다고해서 왔어요 매우 만족합니다 ~ 👍🏻 ",
      profileImgUrl: "/images/mint.png",
    },
  ],
};

export default async function fetchPlaceDetailsById(
  id: string
): Promise<PlaceDetails> {
  // const res = await fetch(`${process.env.API_BASE_URL}/place/${id}`, {
  //   // next: { revalidate: 60 }, // ISR 사용 시
  // });
  // const tagList: TagInfo[] = await res.json();
  return placeDetails;
}
