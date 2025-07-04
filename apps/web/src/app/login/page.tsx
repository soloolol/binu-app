"use client";

import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: "AUTH_REQUIRED" })
    );
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-center text-gray-600">
        로그인 정보가 만료되었습니다. 앱에서 다시 로그인해주세요.
      </p>
    </div>
  );
}
