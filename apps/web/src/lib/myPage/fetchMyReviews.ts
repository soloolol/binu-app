import { MyReview } from "@/types/MyReview";

const myReviews: MyReview[] = [
  {
    id: "123",
    name: "주점은붕어",
    subtitle: "주점",
    binuScore: 4.8,
    starScore: 4.7,
    tags: ["hasSoap", "hasToiletPaper", "genderSeparated", "hasDiaperTable"],
    bookmark: true,
    content:
      "여자화장실은 가게 내부에 있고 깨끗 쾌적! 남자화장실은 비누도 없고 열악하다고 들었어요",
  },
  {
    id: "124",
    name: "사랑방초밥집",
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
    content: "화장실 의외로 가게 내부에 있음 깨끗함",
  },
];

export default function fetchMyReview() {
  return myReviews;
}
