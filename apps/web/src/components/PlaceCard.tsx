"use client";

import { Place } from "@/types/Place";
import TagList from "./TagList";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import getBookmark from "@/lib/api/bookmark/getBookmark";
import deleteBookmarkById from "@/lib/api/bookmark/deleteBookmarkById";
import postBookmark from "@/lib/api/bookmark/postBookmark";
import Cookies from "js-cookie";

type BookmarkId = string | null;

export default function PlaceCard({
  id,
  name,
  subtitle,
  binuScore,
  starScore,
  tags,
}: Place) {
  const userId = Cookies.get("userId");
  const [bookmarkId, setBookmarkId] = useState<BookmarkId>(null);

  useEffect(() => {
    async function fetchData() {
      const bookmarkId = await getBookmark(userId, id);
      setBookmarkId(bookmarkId);
    }
    fetchData();
  }, []);

  const handlePlaceCardClick = () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: "GO_PLACE", id })
    );
  };

  const toggleBookmark = async (prevId: BookmarkId) => {
    if (prevId) {
      const isDeleted = await deleteBookmarkById(prevId);
      if (isDeleted) setBookmarkId(null);
    } else {
      const res = await postBookmark(userId, id);
      setBookmarkId(res.id);
    }
  };

  return (
    <article
      onClick={handlePlaceCardClick}
      className="flex flex-col justify-between w-full space-y-1 bg-white rounded-xl shadow p-4"
    >
      <section className="flex justify-between items-center">
        <h3 className="text-dark/95 text-[13pt] font-source font-bold">
          {name}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(bookmarkId);
          }}
          className="text-gray-400"
        >
          <Bookmark
            className={`w-6 h-7 ${bookmarkId ? "fill-dark/80" : ""} stroke-1`}
          />
        </button>
      </section>
      <p className="text-sm text-gray-500">{subtitle}</p>
      <section className="text-sm font-medium flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <img src="/images/binuIcon.svg" />
          <span className="text-dark/95 text-[13pt] font-source font-semibold">
            {binuScore.toFixed(1)} binu
          </span>
        </div>
        <span className="text-gray-400">★ {starScore.toFixed(1)} stars</span>
      </section>
      <section className="flex flex-wrap gap-1 w-full overflow-hidden">
        <div className="flex overflow-x-auto whitespace-nowrap gap-x-2 scrollbar-hide">
          <TagList tags={tags} />
        </div>
      </section>
    </article>
  );
}
