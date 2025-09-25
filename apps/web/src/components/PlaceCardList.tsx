"use client";

import PlaceCard from "./PlaceCard";
import { Place } from "@/types/Place";

export default function PlaceCardList({ places }: { places: Place[] }) {
  return (
    <div className="w-full space-y-3">
      {places.map((place, idx) => (
        <PlaceCard key={idx} {...place} />
      ))}
    </div>
  );
}
