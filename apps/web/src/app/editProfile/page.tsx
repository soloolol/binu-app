"use client";

import fetchMyInfo from "@/lib/api/myPage/fetchMyInfo";
import { asyncNicknameSchema } from "@/lib/validations/nicknameSchema";
import { Edit2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Noto_Sans_KR } from "next/font/google";

const notoSans = Noto_Sans_KR({ subsets: ["latin"] });

export default function ProfileEditPage() {
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadMyInfo() {
      const data = await fetchMyInfo();
      setNickname(data.nickname);
      setPreviewUrl(data.profileImgUrl);
    }
    loadMyInfo();
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        typeof event.data === "object" &&
        event.data.type === "SELECTED_IMAGE"
      ) {
        const base64 = event.data.base64;
        const blob = fetch(`data:image/jpeg;base64,${base64}`).then((res) =>
          res.blob()
        );

        blob.then((file) => {
          const previewUrl = URL.createObjectURL(file);
          setPreviewUrl(previewUrl);
          setSelectedImage(
            new File([file], "profile.jpg", { type: file.type })
          );
        });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // 닉네임 입력 시 → zod 유효성 검사 실행
  async function handleNicknameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setNickname(value);

    const result = await asyncNicknameSchema.safeParseAsync({
      nickname: value,
    });
    if (!result.success) {
      setNicknameError(result.error.errors[0].message);
    } else {
      setNicknameError(null);
    }
  }

  const handleImageClick = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage("OPEN_IMAGE_PICKER");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("nickname", nickname);
    if (selectedImage) {
      formData.append("profileImage", selectedImage);
    }

    // try {
    //   setIsSubmitting(true);
    //   const res = await fetch("/api/profile", {
    //     method: "POST",
    //     body: formData,
    //   });
    //   if (!res.ok) throw new Error();
    //   alert("프로필이 저장되었어요!");
    // } catch (err) {
    //   alert("저장 실패. 다시 시도해주세요.");
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <main className="flex flex-col items-center max-w-md bg-light min-h-screen">
      <div className="flex flex-col flex-auto w-full justify-between space-y-8 bg-white p-4">
        <section className="flex flex-col items-center gap-10">
          {previewUrl && (
            <div className="relative">
              <Image
                src={previewUrl}
                alt="userProfileImg"
                width={120}
                height={120}
                priority
                className="object-cover border-gray-400 border-1 rounded-full"
              />
              <button
                type="button"
                onClick={handleImageClick}
                className="absolute bottom-1 right-0 z-10 rounded-full bg-gray-100 border-gray-400 border p-1 shadow"
              >
                <Edit2Icon className="w-5 h-5 stroke-1 stroke-gray-600 fill-gray-400" />
              </button>
              <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </div>
          )}

          <div className="flex flex-col w-4/5 items-start gap-1">
            <label htmlFor="nickname" className="ml-2">
              닉네임
            </label>
            <input
              id="nickname"
              value={nickname}
              onChange={handleNicknameChange}
              className="w-full h-12 rounded-2xl bg-dark/10 px-4"
            />
            <p className="text-orange-500 text-sm min-h-[20px]">
              {nicknameError}
            </p>
          </div>
        </section>

        <section className="flex flex-col items-center mb-8">
          <button
            onClick={handleSubmit}
            disabled={nicknameError !== null || isSubmitting}
            className="flex justify-center items-center gap-2 w-3/5 h-12 text-[13pt] rounded-4xl bg-primary disabled:bg-dark/10"
          >
            <span className={notoSans.className}>저장하기</span>
          </button>
        </section>
      </div>
    </main>
  );
}
