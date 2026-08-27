"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/Herosection";

import FeaturedBooks from "@/app/components/FeaturedBooks";

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

  return (
    <main>
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
    </main>
  );
}