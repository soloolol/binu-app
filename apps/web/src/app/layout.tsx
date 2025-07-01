import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import fetchTagDefinitions from "@/lib/api/fetchTagDefinitions";
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <script type="text/javascript"></script>
      </head>
      <body className={`${inter.className} antialiased bg-light`}>
        <ScriptInjector tagDefinitions={tagDefinitions} />
        {children}
      </body>
    </html>
  );
}
