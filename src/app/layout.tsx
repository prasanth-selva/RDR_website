import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Nothing_You_Could_Do } from "next/font/google";
import Navigation from "@/components/Navigation";
import GameHUD from "@/components/GameHUD";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const handwriting = Nothing_You_Could_Do({
  variable: "--font-handwriting",
  weight: "400",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LUMINA - Holographic Display",
  description: "Reassembling the future. The ultimate holographic scrollytelling experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${handwriting.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pt-[72px]">
        <GameHUD />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
