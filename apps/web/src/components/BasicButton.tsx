"use client";

import { useRouter } from "next/navigation";

interface BasicButtonProps {
  onClick: string | (() => void);
}

export default function BasicButton({ onClick }: BasicButtonProps) {
  const router = useRouter();
  return (
    <button
      className="flex justify-center items-center gap-2 w-4/5 h-12 rounded-4xl bg-dark/10"
      onClick={() => {
        typeof onClick === "string" ? router.push(onClick) : onClick();
      }}
    >
      <span className="pr-4">프로필 편집</span>
    </button>
  );
}
