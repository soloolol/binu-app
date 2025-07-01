import { MyInfo } from "@/types/MyInfo";

const myInfo = {
  nickname: "재빠른웜벳",
  email: "soloolol222@gmail.com",
  profileImgUrl: "/images/purple.png",
};

export default async function fetchPlaceDetailsById(): Promise<MyInfo> {
  // const res = await fetch(`${process.env.API_BASE_URL}/myInfo`, {
  //   // method: "POST",
  //   // next: { revalidate: 60 }, // ISR 사용 시
  // });
  // const myInfo: MyInfo = await res.json();
  return myInfo;
}
