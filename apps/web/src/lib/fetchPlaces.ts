import { Place } from "@/types/Place";

const places: Place[] = [
  {
    title: "피자 하우스",
    subtitle: "이탈리안",
    binuScore: 4.8,
    starScore: 4.7,
    tags: ["hasSoap", "hasToiletPaper", "genderSeparated", "hasDiaperTable"],
    bookmark: true,
  },
  {
    title: "주점 은붕어",
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
  },
];

export default async function fetchPlaces(): Promise<Place[]> {
  // const res = await fetch(`${process.env.API_BASE_URL}/tags`, {
  //   // next: { revalidate: 60 }, // ISR 사용 시
  // });
  // const tagList: TagInfo[] = await res.json();
  return places;
}
