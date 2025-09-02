import { MyReview } from "@/types/MyReview";

const myReviews: MyReview[] = [
  {
    id: "126",
    name: "주점은붕어",
    subtitle: "주점",
    binuScore: 4.8,
    starScore: 4.7,
    tags: ["hasSoap", "hasToiletPaper", "genderSeparated", "hasDiaperTable"],
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
  {
    id: "125",
    name: "바하마",
    subtitle: "카페",
    binuScore: 4.2,
    starScore: 4.7,
    tags: ["hasSoap", "hasToiletPaper", "genderSeparated"],
    content:
      "매장 밖으로 나가 건물 철문 비밀번호 열고 들어가면 복도에 있음 문 세게 열어야함",
  },
];

export default function fetchMyReview() {
  return myReviews;
}
