"use client";

import { useEffect } from "react";
import { useTagStore } from "@/stores/tagStore";
import type { TagDefinitions } from "@/types/Tag";

export default function ScriptInjector({
  tagDefinitions,
}: {
  tagDefinitions: TagDefinitions;
}) {
  const setTagDefinitions = useTagStore((state) => state.setTagDefinitions);

  useEffect(() => {
    setTagDefinitions(tagDefinitions);
  }, [tagDefinitions, setTagDefinitions]);

  return null;
}
