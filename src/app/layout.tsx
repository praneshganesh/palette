import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Palette — AI Design System Generator",
  description:
    "Generate a region-ready, branded, bilingual-capable design system in minutes. From logo and taste to a complete design system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#09090B] text-[#F4F4F6]">
        {children}
      </body>
    </html>
  );
}
