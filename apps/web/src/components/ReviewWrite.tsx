"use client";

import BinuScore from "./BinuScore";
import { useEffect, useState } from "react";
import { TagInfoWithIsChecked } from "@/types/Tag";
import { useTagStore } from "@/stores/tagStore";
import Tag from "./Tag";

interface ReviewWriteProps {
  id: string;
  name: string;
}

export default function ReviewWrite({ id, name }: ReviewWriteProps) {
  const TAG_DEFINITION = useTagStore((state) => state.tagDefinitions);
  const [mustTags, setMustTags] = useState<TagInfoWithIsChecked[]>([]);
  const [optionalTags, setOptionalTags] = useState<TagInfoWithIsChecked[]>([]);

  useEffect(() => {
    if (!TAG_DEFINITION) return;
    const must: TagInfoWithIsChecked[] = [];
    const optional: TagInfoWithIsChecked[] = [];
    Object.entries(TAG_DEFINITION).forEach(([_, value]) => {
      value.isRequired
        ? must.push({ ...value, isChecked: null })
        : optional.push({ ...value, isChecked: null });
    });
    setMustTags(must);
    setOptionalTags(optional);
  }, [TAG_DEFINITION]);

  function toggleMustTags(tagKey: string, val: boolean): void {
    setMustTags((prev) =>
      prev.map((tag) => {
        if (tag.tagKey !== tagKey) return tag;
        return {
          ...tag,
          isChecked: val,
        };
      })
    );
  }

  function toggleOptionalTags(tagKey: string): void {
    setOptionalTags((prev) =>
      prev.map((tag) => {
        if (tag.tagKey !== tagKey) return tag;
        return {
          ...tag,
          isChecked: !tag.isChecked,
        };
      })
    );
  }

  return (
    <div className="flex flex-col justify-between w-full bg-white p-4">
      <article className="info flex flex-col justify-between items-center w-full space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-dark/95 text-[16pt] font-source font-bold">
            {name}
          </h3>
        </div>
        <BinuScore score={5} size={30} />
        <article className="flex flex-col items-center gap-4">
          <h4 className="text-dark/95 text-[14pt] font-source font-bold">
            필수리뷰
          </h4>
          <div className="flex flex-col items-center gap-2">
            {mustTags
              .sort((a, b) => a.index - b.index)
              .map((tag) => (
                <div key={tag.tagKey} className="flex gap-5">
                  <Tag
                    label={tag.label}
                    isHighlight={tag.isChecked === true}
                    onClick={() => toggleMustTags(tag.tagKey, true)}
                  />
                  <Tag
                    label={tag.oppositeLabel}
                    isHighlight={tag.isChecked === false}
                    onClick={() => toggleMustTags(tag.tagKey, false)}
                  />
                </div>
              ))}
          </div>
        </article>
        <article className="flex flex-col items-center gap-4">
          <h4 className="text-dark/95 text-[14pt] font-source font-bold">
            어떤것들이 있었나요?
          </h4>
          <div className="grid grid-cols-3 whitespace-nowrap gap-x-2 gap-y-3">
            {optionalTags
              .sort((a, b) => a.index - b.index)
              .map((tag) => (
                <Tag
                  key={tag.tagKey}
                  label={tag.label}
                  isHighlight={tag.isChecked === true}
                  onClick={() => toggleOptionalTags(tag.tagKey)}
                />
              ))}
          </div>
        </article>
        <article className="flex flex-col items-center gap-4 w-full">
          <h4 className="text-dark/95 text-[14pt] font-source font-bold">
            추가로 도움이 될 내용을 작성해주세요 🧼
          </h4>
          <div className="rounded-lg border-secondary border-1 bg-light p-4 w-full h-40"></div>
        </article>

        <button
          className="flex justify-center items-center gap-2 w-4/5 h-12 rounded-4xl bg-dark/10"
          onClick={() => {
            //submit
          }}
        >
          <span className="pr-4">리뷰 작성 완료</span>
        </button>
      </article>
    </div>
  );
}
