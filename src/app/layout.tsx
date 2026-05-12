import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Navigation from "@/components/Navigation";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prasanth S — AI Engineer",
  description:
    "Portfolio of Prasanth S. AI engineer and full-stack developer.",
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
    title: "Prasanth S — AI Engineer",
    description: "Portfolio of Prasanth S.",
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
      className={`${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pt-[72px]">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
