"use client";

import { useTagStore } from "@/stores/tagStore";
import Tag from "@/components/Tag";

export default function TagList({ tags }: { tags: string[] }) {
  const TAG = useTagStore((state) => state.tagDefinitions);

  if (!TAG) return <p>로딩 중...</p>;

  return (
    <div className="w-full overflow-hidden">
      <div className="flex overflow-x-auto whitespace-nowrap gap-x-2 scrollbar-hide">
        {tags
          .sort((a, b) => TAG[a].index - TAG[b].index)
          .map((tagKey) => (
            <Tag key={TAG[tagKey].index} label={TAG[tagKey].label} />
          ))}
      </div>
    </div>
  );
}
