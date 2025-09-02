import { PlaceDetails } from "@/types/Place";

const placeDetails: PlaceDetails = {
  id: "123",
  name: "주점은붕어",
  subtitle: "퓨전 음식점",
  binuScore: 4.8,
  starScore: 4.7,
  tags: ["hasSoap",
      "hasToiletPaper",
      "genderSeparated",
      "hasBidet",
      "hasWarmWater",],
  reviews: [
    {
      id: "123",
      userId: "tester123",
      userNick: "깐깐한북어",
      date: "2025-06-10",
      binuScore: 4,
      content: "비누, 화장지 있어요 한 칸 밖에 없어서 기다려야 할 때 있어요",
      profileImgUrl: "/images/orange.png",
    },
    {
      id: "456",
      userId: "soloolol222@gmail.com",
      userNick: "섹시한캥거루",
      date: "2025-05-01",
      binuScore: 5,
      content:
        "여자화장실은 가게 내부에 있고 깨끗 쾌적! 남자 화장실은 비누도 없고 열악하다고 들었어요ㅜ",
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
