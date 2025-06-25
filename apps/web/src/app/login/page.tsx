"use client";

import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    window.ReactNativeWebView?.postMessage("AUTH_REQUIRED");
  }, []);

  return <div>앱에서 로그인 해주세요</div>;
}
