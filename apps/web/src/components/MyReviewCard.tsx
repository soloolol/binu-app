"use client";

import { Place } from "@/types/Place";
import TagList from "./TagList";
import { Bookmark, PencilIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

interface MyReviewCardProps extends Place {
  content: string;
}

export default function MyReviewCard({
  id,
  name,
  binuScore,
  starScore,
  tags,
  content,
}: MyReviewCardProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/place/${id}`);
  };
  return (
    <article
      onClick={handleClick}
      className="flex flex-col justify-between w-full space-y-2 bg-white border-primary border rounded-xl p-4"
    >
      <section className="flex justify-between items-center">
        <h3 className="text-dark/95 text-[13pt] font-source font-bold">
          {name}
        </h3>
        <div className="flex justify-center items-center text-sm space-x-2">
          <button className="flex items-center text-green-900">
            <span>다시쓰기</span>
            <PencilIcon className="w-3 h-4" />
          </button>
          <button className="flex items-center text-orange-500">
            <span>삭제</span>
            <Trash2Icon className="w-3 h-4" />
          </button>
        </div>
      </section>
      <section className="text-sm font-medium flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <img src="/images/binuIcon.svg" />
          <span className="text-dark text-[13pt] font-source font-semibold">
            {binuScore.toFixed(1)} binu
          </span>
        </div>
        <span className="text-gray-400">★ {starScore.toFixed(1)} stars</span>
      </section>
      <section className="text-sm line-clamp-3 text-gray-600">
        {content}
      </section>
      <section className="flex flex-wrap gap-1 w-full overflow-hidden">
        <div className="flex overflow-x-auto whitespace-nowrap gap-x-2 scrollbar-hide">
          <TagList tags={tags} />
        </div>
      </section>
    </article>
  );
}
