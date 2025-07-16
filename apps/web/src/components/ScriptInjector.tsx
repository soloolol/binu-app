"use client";

import { useCallback, useEffect } from "react";
import { useTagStore } from "@/stores/tagStore";
import type { TagDefinitions } from "@/types/Tag";
import { useAuthStore } from "@/stores/authStore";
import Cookies from "js-cookie";

export default function ScriptInjector({
  tagDefinitions,
}: {
  tagDefinitions: TagDefinitions;
}) {
  const userId = Cookies.get("userId") as string;
  const setAuth = useAuthStore((state) => state.setUserId);
  const setTagDefinitions = useTagStore((state) => state.setTagDefinitions);

  useEffect(() => {
    console.log("scriptInjector :", userId);
    setAuth(userId);
    setTagDefinitions(tagDefinitions);
  }, [userId, tagDefinitions, setTagDefinitions]);

  return null;
}
