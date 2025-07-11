"use client";

import Cookies from "js-cookie";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogOutButton() {
  const route = useRouter();
  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("userId");
    route.refresh();
  };
  return (
    <button
      className={`flex justify-center items-center w-4/5 h-12 space-x-3 pr-3 border-1 border-dark/20 rounded-3xl`}
      onClick={handleLogout}
    >
      <LogOutIcon className="w-4 stroke-gray-600 stroke-1" />
      <span className="text-sm text-gray-600">로그아웃</span>
    </button>
  );
}
