"use client";

import { useEffect, useState } from "react";
import { useTagStore } from "@/stores/tagStore";
import Tag from "@/components/Tag";
import { TagInfoWithIsChecked } from "@/types/Tag";
import { SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const TAG_DEFINITION = useTagStore((state) => state.tagDefinitions);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const tags = searchParams.getAll("tags");
  const [tagFilters, setTagFilters] = useState<TagInfoWithIsChecked[]>([]);

  useEffect(() => {
    if (!TAG_DEFINITION) return;
    const filters: TagInfoWithIsChecked[] = Object.entries(TAG_DEFINITION).map(
      ([_, value]) => ({
        ...value,
        isChecked: tags.includes(value.tagKey),
      })
    );
    setTagFilters(filters);
  }, [TAG_DEFINITION, searchParams]);

  const toggleTag = (key: string) => {
    let params = new URLSearchParams(searchParams);
    params.has("tags", key)
      ? params.delete("tags", key)
      : params.append("tags", key);
    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="flex w-full overflow-hidden pt-1 pb-3 gap-x-2">
      <div className="flex whitespace-nowrap items-center gap-2">
        <select className="font-source text-dark/90 font-semibold text-[10pt] px-4 py-1.5 appearance-none rounded-full border-[0.5px] bg-[#fdfdfd] ml-1">
          <option value="score">별점순</option>
          <option value="distanse">거리순</option>
        </select>
        <SlidersHorizontal className="stroke-1 w-5 h-5 stroke-gray-700" />
      </div>
      <div className="flex overflow-x-auto whitespace-nowrap gap-x-2 scrollbar-hide">
        {tagFilters
          .sort((a, b) => a.index - b.index)
          .map((tag) => (
            <Tag
              key={tag.index}
              label={tag.label}
              isHighlight={tag.isChecked}
              onClick={() => toggleTag(tag.tagKey)}
            />
          ))}
      </div>
    </div>
  );
}
