"use client";

import { useEffect, useState } from "react";
import MyReviewCard from "./MyReviewCard";
import { MyReview } from "@/types/MyReview";
import PlaceCard from "./PlaceCard";
import { Place } from "@/types/Place";
import fetchMyBookmarkedPlaces from "@/lib/api/myPage/fetchMyBookmarkedPlaces";
import fetchMyReviews from "@/lib/api/myPage/fetchMyReviews";

export default function MyPageTab() {
  const [selected, setSelected] = useState<"activity" | "scrap">("activity");
  const [myReviews, setMyReviews] = useState<MyReview[]>([]);
  const [myBookmarkedPlaces, setMyBookmarkedPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const reviews = await fetchMyReviews();
      const places = await fetchMyBookmarkedPlaces();
      setMyReviews(reviews);
      setMyBookmarkedPlaces(places);
    };
    fetchData();
  });

  return (
    <section className="w-full border-primary border-t-2 space-y-0">
      {/* 탭 버튼 */}
      <section className="relative flex w-full border-b border-gray-200">
        <button
          onClick={() => setSelected("activity")}
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            selected === "activity"
              ? "bg-primary/30 text-gray-800"
              : "text-gray-500"
          }`}
        >
          내 활동
        </button>
        <button
          onClick={() => setSelected("scrap")}
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            selected === "scrap"
              ? "bg-primary/30 text-gray-800"
              : "text-gray-500"
          }`}
        >
          북마크
        </button>
      </section>

      {/* 탭 내용 */}
      <section className="w-full bg-primary/30">
        {selected === "activity" ? (
          <div className="p-2 space-y-2">
            {myReviews.map((review) => (
              <MyReviewCard key={review.id} {...review} />
            ))}
          </div>
        ) : (
          <div className="p-2 space-y-2">
            {myBookmarkedPlaces.map((place) => (
              <PlaceCard key={place.id} {...place} />
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
