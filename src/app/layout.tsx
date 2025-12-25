import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ApniSec | Enterprise Cyber Security Solutions",
    template: "%s | ApniSec"
  },
  description: "Protect your digital assets with ApniSec. Offering vCISO, VAPT, Cloud Security, and Reteam Assessments for modern enterprises.",
  keywords: ["Cyber Security", "VAPT", "Cloud Security", "vCISO", "Penetration Testing", "ApniSec"],
  authors: [{ name: "ApniSec Team" }],
  openGraph: {
    title: "ApniSec | Enterprise Cyber Security",
    description: "Defend against cyber threats before they strike.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
