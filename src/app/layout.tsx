import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Agentum Pro — Партнёрская сеть",
  description:
    "Монетизируйте социальные связи. Рекомендуйте клиентов, нуждающихся в правовой защите от кредиторов.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className} bg-void min-h-screen p-[1vw] max-md:p-1`}>
        {children}
      </body>
    </html>
  );
}
