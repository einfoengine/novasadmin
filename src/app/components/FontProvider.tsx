'use client';

import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export default function FontProvider() {
  return (
    <style jsx global>{`
      :root {
        --font-geist-sans: ${geistSans.style.fontFamily};
        --font-geist-mono: ${geistMono.style.fontFamily};
      }
    `}</style>
  );
} 