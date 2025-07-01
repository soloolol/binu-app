"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface NavigationHeaderProps {
  title?: string;
}

export default function NavigationHeader({ title }: NavigationHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky w-full flex justify-between items-center p-4">
      <div>
        <button onClick={() => router.back()}>
          <ChevronLeft className="w-7 h-7 text-gray-600" />
        </button>
      </div>
      {title && (
        <h1 className="text-dark/95 text-[15pt] font-source font-bold">
          {title}
        </h1>
      )}
      <div className="w-7"></div>
    </header>
  );
}
