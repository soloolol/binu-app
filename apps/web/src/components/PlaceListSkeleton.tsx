import PlaceCardSkeleton from "./PlaceCardSkeleton";

export default async function PlaceListSkeleton() {
  return (
    <div className="w-full space-y-3">
      {[...Array(4)].map((_, i) => (
        <PlaceCardSkeleton key={i} />
      ))}
    </div>
  );
}
