import PlaceDetails from "@/components/PlaceDetails";
import fetchPlaceDetailsById from "@/lib/place/fetchPlaceDetailsById";

export default async function PlacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const placeDetails = await fetchPlaceDetailsById(id);

  return (
    <main className="flex flex-col items-center max-w-md p-3 bg-[#F4F7F6] min-h-screen">
      <PlaceDetails {...placeDetails} />
    </main>
  );
}
