import NavigationHeader from "@/components/NavigationHeader";
import PlaceDetails from "@/components/PlaceDetails";
import fetchPlaceDetailsById from "@/lib/api/place/fetchPlaceDetailsById";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const placeDetails = await fetchPlaceDetailsById(id);

  return (
    <main className="flex flex-col items-center max-w-md min-h-screen p-3 bg-[#F4F7F6]">
      <div className="flex-auto overflow-y-scroll rounded-xl shadow bg-white scrollbar-hide">
        <PlaceDetails {...placeDetails} />
      </div>
      <footer className="h-8"></footer>
    </main>
  );
}
