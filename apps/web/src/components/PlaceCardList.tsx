"use client";

import { Place } from "@/types/Place";
import fetchPlaces from "@/lib/fetchPlaces";
import PlaceCard from "./PlaceCard";

export default async function PlaceCardList() {
  const places: Place[] = await fetchPlaces();
  return (
    <div className="w-full space-y-3">
      {places.map((place, idx) => (
        <PlaceCard key={idx} {...place} />
      ))}
    </div>
  );
}
