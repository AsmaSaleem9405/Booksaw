import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/HeroSection/page";

export const metadata: Metadata = {
  title: "BookSaw - Discover & Read Inspiring Books Online",
  description:
    "Welcome to BookSaw, your ultimate digital bookstore webapp. Browse bestsellers, wildlife books, programming guides, and literature with seamless online shopping.",
  keywords:
    "bookstore, online books, read books, buy books, wildlife literature, programming books",
  openGraph: {
    title: "BookSaw - Digital Bookstore & Library",
    description:
      "Explore curated collections of top books, novels, and educational guides.",
    type: "website",
    url: "https://booksaw.example.com",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] flex flex-col">
      <Navbar />
      <HeroSection />
    </main>
  );
}