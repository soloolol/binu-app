import { Place } from "@/types/Place";

const myBookmarkedPlaces: Place[] = [
  {
    id: "123",
    name: "피자 하우스",
    subtitle: "이탈리안",
    binuScore: 4.8,
    starScore: 4.7,
    tags: ["hasSoap", "hasToiletPaper", "genderSeparated", "hasDiaperTable"],
    bookmark: true,
  },
  {
    id: "124",
    name: "주점 은붕어",
    subtitle: "주점",
    binuScore: 4.5,
    starScore: 4.7,
    tags: [
      "hasSoap",
      "hasToiletPaper",
      "genderSeparated",
      "hasBidet",
      "hasWarmWater",
    ],
    bookmark: true,
  },
];

export default async function fetchMyBookmarkedPlaces(): Promise<Place[]> {
  // const res = await fetch(`${process.env.API_BASE_URL}/myBookmark`, {
  //   // method: "POST",
  //   // body: JSON.stringify(jwtKey?),
  //   // next: { revalidate: 60 }, // ISR 사용 시
  // });
  // const myBookmarkedPlaces: Place[] = await res.json();
  return myBookmarkedPlaces;
}
