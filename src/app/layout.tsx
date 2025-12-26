import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
    default: "People of NIT - Inspiring Stories from National Institutes of Technology",
    template: "%s | People of NIT"
  },
  description: "Discover inspiring stories, achievements, and journeys of students and alumni from National Institutes of Technology. Read about entrepreneurship, research, leadership, sports, and social impact.",
  keywords: ["NIT", "National Institute of Technology", "student stories", "alumni success", "engineering", "innovation", "entrepreneurship", "research", "technology"],
  authors: [{ name: "People of NIT Community" }],
  creator: "People of NIT",
  publisher: "People of NIT",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://peopleofnit.com",
    siteName: "People of NIT",
    title: "People of NIT - Inspiring Stories from NITs",
    description: "Discover inspiring stories, achievements, and journeys of students and alumni from National Institutes of Technology.",
  },
  twitter: {
    card: "summary_large_image",
    title: "People of NIT - Inspiring Stories from NITs",
    description: "Discover inspiring stories, achievements, and journeys of students and alumni from National Institutes of Technology.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
