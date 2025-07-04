"use client";

import type { PlaceDetails } from "@/types/Place";
import { Noto_Sans_KR } from "next/font/google";
import TagList from "./TagList";
import {
  Bookmark,
  Share2Icon,
  PlusCircleIcon,
  MessageCircleQuestionIcon,
} from "lucide-react";
import ReviewCard from "./ReviewCard";
import Image from "next/image";
import { useRouter } from "next/navigation";

const notoSans = Noto_Sans_KR({ subsets: ["latin"] });

export default function PlaceDetails({
  id,
  name,
  subtitle,
  binuScore,
  starScore,
  tags,
  bookmark,
  reviews,
}: PlaceDetails) {
  const router = useRouter();
  function goReview(id: string) {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: "GO_REVIEW", id })
      );
    }
    // router.push(`/review/[${id}]`);
  }
  return (
    <div className="flex flex-col justify-between w-full space-y-8 p-4">
      <section className="info flex flex-col justify-between w-full space-y-3">
        <section className="flex justify-between items-center">
          <h3 className="text-dark/95 text-[16pt] font-source font-bold">
            {name}
          </h3>
          <div className="flex justify-center items-center gap-3">
            <Share2Icon className="text-gray-500 w-5 stroke-2 fill-gray-500" />
            <Bookmark
              className={`text-gray-500 w-6 h-7 ${bookmark ?? "fill-dark/80"} stroke-2`}
            />
          </div>
        </section>
        <p className="text-gray-500 text-[13pt] font-bold">{subtitle}</p>
        <section className="font-medium flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Image
              src="/images/binuIcon.svg"
              alt="binuIcon"
              width={30}
              height={30}
            />
            <span className="text-dark/95 text-[15pt] font-source font-semibold">
              {binuScore.toFixed(1)} binu
            </span>
          </div>
          <span className="text-gray-400">★ {starScore.toFixed(1)} stars</span>
        </section>
        <section>
          <div
            className={`flex items-center gap-1 ${notoSans.className} text-xs text-[#3BA68A]`}
          >
            최근 10개의 리뷰를 요약한 결과입니다
            <MessageCircleQuestionIcon className="w-3" />
          </div>
          <div className="grid grid-cols-3 whitespace-nowrap gap-x-2 gap-y-3">
            <TagList tags={tags} />
          </div>
        </section>
      </section>

      <section className="flex justify-center items-center">
        <button
          className="flex justify-center items-center gap-2 w-4/5 h-12 rounded-4xl border-secondary border-1"
          onClick={() => {
            goReview(id);
          }}
        >
          <PlusCircleIcon className="stroke-secondary stroke-1 w-5"></PlusCircleIcon>
          <span className="pr-4">리뷰 작성 하기</span>
        </button>
      </section>

      <section className="reviewList flex flex-col justify-between w-full space-y-3">
        <h3 className="text-dark/95 text-[16pt] font-source font-bold">
          Binuer’s review 🧼
        </h3>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </section>
    </div>
  );
}
