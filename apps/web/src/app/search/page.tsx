import Filter from "@/components/Filter";
import { Suspense } from "react";
import PlaceListSkeleton from "@/components/PlaceListSkeleton";
import PlaceCardList from "@/components/PlaceCardList";
import { SearchParams } from "@/types/SearchParams";
import fetchPlaces from "@/lib/api/place/fetchPlaces";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { coord, tags, sorted } = await searchParams;

  if (!coord)
    return <div className="text-center mt-10">검색 조건이 없습니다.</div>;

  const places = fetchPlaces({ coord, tags, sorted });
  const cacheKey = JSON.stringify({ coord, tags, sorted });

  return (
    <main className="flex flex-col items-center max-w-md min-h-screen p-3 bg-[#F4F7F6]">
      <section className="w-full mb-1">
        <Filter />
      </section>
      <Suspense key={cacheKey} fallback={<PlaceListSkeleton />}>
        <PlaceCardList places={places} />
      </Suspense>
      <footer className="h-8"></footer>
    </main>
  );
}
