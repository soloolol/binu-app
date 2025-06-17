"use client";

import { useTagStore } from "@/stores/tagStore";
import Tag from "@/components/Tag";

interface TagListProps {
  tags: string[];
}

export default function TagList({ tags }: TagListProps) {
  const TAG = useTagStore((state) => state.tagDefinitions);

  if (!TAG) return <p></p>;

  return (
    <>
      {tags
        .sort((a, b) => TAG[a].index - TAG[b].index)
        .map((tagKey) => (
          <Tag key={TAG[tagKey].index} label={TAG[tagKey].label} />
        ))}
    </>
  );
}
