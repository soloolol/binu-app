"use client";

import { useCallback, useEffect, useState } from "react";
import { useTagStore } from "@/stores/tagStore";
import Tag from "@/components/Tag";
import { TagFilter } from "@/types/Tag";
import { SlidersHorizontal } from "lucide-react";

export default function Filter() {
  const TAG = useTagStore((state) => state.tagDefinitions);
  const [tagFilters, setTagFilters] = useState<TagFilter[]>([]);

  useEffect(() => {
    if (!TAG) return;
    const filters = Object.entries(TAG).map(([key, value]) => ({
      ...value,
      isCheck: false,
    }));
    setTagFilters(filters);
  }, [TAG]);

  const toggleCheck = useCallback((key: string) => {
    setTagFilters((prev) =>
      prev.map((tag) =>
        tag.tagKey === key ? { ...tag, isCheck: !tag.isCheck } : tag
      )
    );
  }, []);

  return (
    <div className="flex w-full overflow-hidden pb-3 gap-x-2">
      <div className="flex whitespace-nowrap items-center gap-2">
        <button
          type="button"
          className="font-source text-dark/90 font-semibold text-[10pt] px-4 py-1.5 rounded-full border-[0.5pt] bg-[#fdfdfd] transition-colors"
        >
          별점순
        </button>
        <SlidersHorizontal className="stroke-1 w-5 h-5 stroke-gray-700" />
      </div>
      <div className="flex overflow-x-auto whitespace-nowrap gap-x-2 scrollbar-hide">
        {tagFilters
          .sort((a, b) => a.index - b.index)
          .map((tag) => (
            <Tag
              key={tag.index}
              label={tag.label}
              isHighlight={tag.isCheck}
              onClick={() => toggleCheck(tag.tagKey)}
            />
          ))}
      </div>
    </div>
  );
}
