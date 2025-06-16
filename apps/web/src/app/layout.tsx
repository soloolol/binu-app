import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import fetchTagDefinitions from "@/lib/fetchTagDefinitions";
import ScriptInjector from "@/components/ScriptInjector";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Binu Web",
  description: "사용자 리뷰 기반의 음식점, 카페 화장실 위생 리뷰 플랫폼",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tagDefinitions = await fetchTagDefinitions();
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env["NEXT_PUBLIC_KAKAO_MAP_API"]}&libraries=services,clusterer`}
        ></script>
      </head>
      <body className={`${inter.className} antialiased`}>
        <ScriptInjector tagDefinitions={tagDefinitions} />
        {children}
      </body>
    </html>
  );
}
