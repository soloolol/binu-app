import NavigationHeader from "@/components/NavigationHeader";
import ReviewWrite from "@/components/ReviewWrite";
import fetchPlaceNameById from "@/lib/api/place/fetchPlaceNameById";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const name = await fetchPlaceNameById(id);

  return (
    <main className="flex flex-col items-center max-w-md bg-light min-h-screen">
      <NavigationHeader />
      <ReviewWrite id={id} name={name} />
    </main>
  );
}
