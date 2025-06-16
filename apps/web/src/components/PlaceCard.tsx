"use client";

import { Place } from "@/types/Place";
import TagList from "./TagList";
import { Bookmark } from "lucide-react";

export default function PlaceCard({
  title,
  subtitle,
  binuScore,
  starScore,
  tags,
  bookmark,
}: Place) {
  return (
    <div className="flex flex-col justify-between w-full space-y-1 bg-white rounded-xl shadow p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-dark/95 text-[13pt] font-source font-bold">
          {title}
        </h3>
        <button className="text-gray-400">
          <Bookmark
            className={`w-6 h-7 ${bookmark ?? "fill-dark/80"} stroke-1`}
          />
        </button>
      </div>
      <p className="text-sm text-gray-500">{subtitle}</p>
      <div className="text-sm font-medium flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <img src="/images/binuIcon.svg" />
          <span className="text-dark/95 text-[13pt] font-source font-semibold">
            {binuScore.toFixed(1)} binu
          </span>
        </div>
        <span className="text-gray-400">★ {starScore.toFixed(1)} stars</span>
      </div>
      <div className="flex flex-wrap gap-1">
        <TagList tags={tags} />
      </div>
    </div>
  );
}
