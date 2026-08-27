"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/Herosection";
import FeaturedBooks from "@/app/components/FeaturedBooks";
import BookShowcase, { Book } from "@/app/components/BookShowcase";

interface CartItem {
  id: number;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  quantity: number;
}

export default function FeaturedBookPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Calculate totals
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Example book data to pass into your reusable showcase component
  const showcaseBook: Book = {
    title: "Birds Gonna Be Happy",
    author: "By Timur Hood",
    price: 45.00,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet. Libero ipsum enim pharetra hac.",
    coverImage: "/path-to-your-cover.jpg"
  };

  return (
    <main className="min-h-screen bg-[#F5F2EB] text-[#2C2A29]">
      <Navbar 
        totalItemsCount={totalItemsCount} 
        totalCartPrice={totalCartPrice} 
        onOpenCart={() => setIsCartOpen(true)} 
      />
      <HeroSection />
        <FeaturedBooks 
        cart={cart}
        setCart={setCart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        totalItemsCount={totalItemsCount}
        totalCartPrice={totalCartPrice}
      />
      
      {/* Reusable Book Showcase Page Component */}
      <BookShowcase 
        book={showcaseBook} 
        onAddToCart={(book, qty) => {
          // Optional: handle adding this showcase item directly into your cart state if desired
        }}
      />

    
    </main>
  );
}