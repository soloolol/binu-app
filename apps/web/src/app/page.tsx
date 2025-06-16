// pages/index.tsx (Next.js 기준)
import PlaceCardList from "@/components/PlaceCardList";
import Filter from "@/components/Filter";

export default function Home() {
  return (
    <main className="flex flex-col items-center max-w-md p-3 bg-[#F4F7F6] min-h-screen">
      <Filter />
      <PlaceCardList />
    </main>
  );
}
