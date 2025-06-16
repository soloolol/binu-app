import { create } from "zustand";
import type { TagDefinitions } from "@/types/Tag";

type TagState = {
  tagDefinitions: TagDefinitions | null;
  setTagDefinitions: (map: TagDefinitions) => void;
};

export const useTagStore = create<TagState>((set) => ({
  tagDefinitions: null,
  setTagDefinitions: (map) => set({ tagDefinitions: map }),
}));
