import ReviewWrite from "@/components/ReviewWrite";
import fetchPlaceNameById from "@/lib/place/fetchPlaceNameById";

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const name = await fetchPlaceNameById(id);

  return (
    <main className="flex flex-col items-center max-w-md p-3 bg-light min-h-screen">
      <ReviewWrite id={id} name={name} />
    </main>
  );
}
