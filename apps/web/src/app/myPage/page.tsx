import Image from "next/image";
import fetchMyInfo from "@/lib/api/myPage/fetchMyInfo";
import BasicButton from "@/components/BasicButton";
import MyPageTab from "@/components/MyPageTab";

export default async function Page() {
  const myInfo = await fetchMyInfo();

  return (
    <main className="flex flex-col items-center max-w-md bg-light min-h-screen">
      <div className="flex flex-col justify-between w-full h-full space-y-8 bg-white p-4">
        <section className="flex flex-col justify-between items-center space-y-3">
          <section className="flex justify-between items-center w-full p-3">
            <div className="flex flex-col">
              <h3 className="text-dark/95 text-[18pt] font-source font-bold">
                {myInfo.nickname}
              </h3>
              <span>{myInfo.email}</span>
            </div>
            <Image
              src={myInfo.profileImgUrl}
              alt="userProfileImg"
              width={200}
              height={200}
              className="rounded-ful w-20 h-20 object-cover"
              priority
            />
          </section>
          <BasicButton
            title={"프로필 편집"}
            onClick={{ postMessage: "goEditProfile" }}
          />
        </section>
        <MyPageTab />
      </div>
    </main>
  );
}
