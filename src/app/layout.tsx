import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Nothing_You_Could_Do } from "next/font/google";
import Navigation from "@/components/Navigation";
import GameHUD from "@/components/GameHUD";
import SiteBootSequence from "@/components/SiteBootSequence";
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
  title: "Prasanth S — AI Engineer & Builder",
  description:
    "Portfolio of Prasanth S, Founder of Cyberbots. AI Engineer, Full-Stack Developer, and Mobile Developer building intelligent products that matter.",
  keywords: [
    "Prasanth S",
    "AI Engineer",
    "Full-Stack Developer",
    "Flutter Developer",
    "Cyberbots",
    "Portfolio",
    "Machine Learning",
    "Computer Vision",
  ],
  authors: [{ name: "Prasanth S", url: "https://github.com/prasanth-selva" }],
  openGraph: {
    title: "Prasanth S — AI Engineer & Builder",
    description: "Cinematic portfolio of Prasanth S, Founder of Cyberbots.",
    type: "website",
  },
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
        <SiteBootSequence>
          <GameHUD />
          <Navigation />
          {children}
        </SiteBootSequence>
      </body>
    </html>
  );
}
