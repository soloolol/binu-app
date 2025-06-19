import { Place } from "@/types/Place";
import { SearchParams } from "@/types/SearchParams";

const places: Place[] = [
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
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function fetchPlaces(
  searchParams: SearchParams
): Promise<Place[]> {
  const query = searchParams.toString();
  // const res = await fetch(`${process.env.API_BASE_URL}/search?${query}`, {
  //   // next: { revalidate: 60 }, // ISR 사용 시
  // });
  // const tagList: TagInfo[] = await res.json();
  await delay(1000);
  return places;
}
