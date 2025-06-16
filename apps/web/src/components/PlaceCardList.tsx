"use client";

import { Place } from "@/types/Place";
import PlaceCard from "./PlaceCard";
import { use } from "react";

export default function PlaceCardList({
  places,
}: {
  places: Promise<Place[]>;
}) {
  const allPlaces = use(places);
  return (
    <div className="w-full space-y-3">
      {allPlaces.map((place, idx) => (
        <PlaceCard key={idx} {...place} />
      ))}
    </div>
  );
}
