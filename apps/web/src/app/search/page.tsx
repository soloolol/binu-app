"use client";

import Filter from "@/components/Filter";
import fetchPlaces from "@/lib/fetchPlaces";
import { Suspense } from "react";
import PlaceListSkeleton from "@/components/PlaceListSkeleton";
import PlaceCardList from "@/components/PlaceCardList";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const places = fetchPlaces(searchParams);
  console.log("searchParams?????", searchParams);

  return (
    <main className="flex flex-col items-center max-w-md p-3 bg-[#F4F7F6] min-h-screen">
      <Filter />
      <Suspense fallback={<PlaceListSkeleton />}>
        <PlaceCardList places={places} />
      </Suspense>
    </main>
  );
}
