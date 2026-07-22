import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TravelTrucks",
  description: "Find your truck for camp!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interSans.variable} ${manrope.variable}`}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
