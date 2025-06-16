export type TagInfo = {
  tagKey: string;
  label: string;
  index: number;
  isRequired: boolean;
};

export type TagFilter = TagInfo & {
  isCheck?: boolean;
};

export type TagDefinitions = Record<string, TagInfo>;
