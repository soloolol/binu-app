import {create} from 'zustand';
import type {TagDefinitions} from '@/types/Tag';

type TagState = {
  tagDefinitions: TagDefinitions | undefined;
  setTagDefinitions: (map: TagDefinitions) => void;
};

export const useTagStore = create<TagState>(set => ({
  tagDefinitions: undefined,
  setTagDefinitions: map => set({tagDefinitions: map}),
}));
