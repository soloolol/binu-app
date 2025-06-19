export interface TagInfo {
  tagKey: string;
  label: string;
  oppositeLabel?: string;
  index: number;
  isRequired: boolean;
}

export interface TagInfoWithIsChecked extends TagInfo {
  isChecked: boolean | null;
}

export type TagDefinitions = Record<string, TagInfo>;

export type TagDefMap = { tagDefMap: TagDefinitions };
