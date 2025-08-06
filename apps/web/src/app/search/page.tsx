'use client';

import { useEffect, useState } from 'react';
import PlaceListSkeleton from '@/components/PlaceListSkeleton';
import PlaceCardList from '@/components/PlaceCardList';
import { Place } from '@/types/Place';

export default function SearchPage() {
  const [places, setPlaces] = useState<Place[] | null>(null);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      try {
        const msg = JSON.parse((event as MessageEvent).data);
        if (msg.type === 'SET_PLACES') {
          setPlaces(msg.data);
        }
      } catch (e) {
        console.error('메시지 파싱 실패', e);
      }
    };

    window.addEventListener('message', handler as EventListener); //Ios
    document.addEventListener('message', handler as EventListener); //Android

    return () => {
      window.removeEventListener('message', handler);
      document.removeEventListener('message', handler as EventListener);
    };
  }, []);

  if (!places) {
    return (
      <main className="flex flex-col items-center max-w-md min-h-screen p-3 pt-0 bg-[#F4F7F6]">
        <PlaceListSkeleton />
      </main>
    );
  }

  if (places.length === 0) {
    return <div className="text-center mt-10">검색 결과가 없습니다 🥲</div>;
  }

  return (
    <main className="flex flex-col items-center max-w-md min-h-screen p-3 pt-0 bg-[#F4F7F6]">
      <PlaceCardList places={places} />
      <footer className="h-8"></footer>
    </main>
  );
}
