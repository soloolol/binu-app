"use client";

import { useRouter } from "next/navigation";

interface BasicButtonProps {
  onClick: OnClick;
  title?: string;
  isPrimaryColor?: boolean;
}

type OnClick =
  | { routerPush: string; postMessage?: never; callBack?: never }
  | { routerPush?: never; postMessage: string; callBack?: never }
  | { routerPush?: never; postMessage?: never; callBack: (m?: any) => void };

export default function BasicButton({
  onClick,
  title,
  isPrimaryColor = false,
}: BasicButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if ("routerPush" in onClick) {
      router.push(onClick.routerPush as string);
    } else if ("postMessage" in onClick) {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({ type: onClick.postMessage as string })
      );
    } else if ("callBack" in onClick) {
      onClick.callBack();
    }
  };

  return (
    <button
      className={`flex justify-center items-center gap-2 w-4/5 h-12 rounded-4xl ${isPrimaryColor ? "bg-primary" : "bg-dark/10"}`}
      onClick={handleClick}
    >
      <span className="pr-4">{title || ""}</span>
    </button>
  );
}
