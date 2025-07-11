import Image from "next/image";
import fetchMyInfo from "@/lib/api/myPage/fetchMyInfo";
import BasicButton from "@/components/BasicButton";
import MyPageTab from "@/components/MyPageTab";
import LogOutButton from "@/components/LogOutButton";

export default async function Page() {
  const myInfo = await fetchMyInfo();

  return (
    <main className="flex flex-col justify-between items-center gap-10 max-w-md bg-light min-h-screen">
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
            onClick={{ postMessage: "GO_EDIT_PROFILE" }}
          />
        </section>
        <MyPageTab />
      </div>
      <LogOutButton />

      <footer className="flex flex-col items-center justify-center w-full p-10 gap-y-2.5 bg-dark/5">
        <section className="flex text-gray-500 text-xs gap-x-2">
          <button>이용약관</button>
          <button>개인정보처리방침</button>
          <button>위치기반서비스 이용약관</button>
        </section>
        <section className="flex flex-col text-gray-500 text-xs gap-y-1">
          <span>© 2025 Binu. All rights reserved.</span>
          <span>Contact: soloolol.dev@gmail.com</span>
        </section>
      </footer>
    </main>
  );
}
