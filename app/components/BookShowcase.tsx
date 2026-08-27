'use client';

import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, ArrowRight } from 'lucide-react';

export interface Book {
  title: string;
  author: string;
  price: number;
  coverImage?: string; // Optional custom cover image path
  description: string;
}

interface BookShowcaseProps {
  book: Book;
  onAddToCart?: (book: Book, quantity: number) => void;
}

export default function BookShowcase({ book, onAddToCart }: BookShowcaseProps) {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0);

  const handleShopNow = () => {
    setCartCount((prev) => (prev === 0 ? 1 : prev));
    setIsCartOpen(true);
    if (onAddToCart) {
      onAddToCart(book, 1);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F5F2EB] text-[#2C2A29] overflow-hidden flex items-center justify-center font-serif">
      
      {/* Top Right Background Flourish/Blob Design */}
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-40">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-[#EBE5D8]">
          <path d="M44.7,-76.4C58.8,-69.3,71.8,-59.1,79.6,-45.6C87.4,-32.1,90,-15.3,88.4,0.9C86.8,17.1,81,32.5,72.2,45.3C63.4,58.1,51.6,68.3,37.8,75.3C24,82.3,8.2,86.1,-7.2,85.5C-22.6,84.9,-37.7,79.9,-51.1,72C-64.5,64.1,-76.1,53.3,-82.7,39.6C-89.3,25.9,-90.9,9.3,-89.1,-6.6C-87.3,-22.5,-82.1,-37.8,-72.7,-49.6C-63.3,-61.4,-49.7,-69.7,-35.8,-76.9C-21.9,-84.1,-7.7,-90.2,4.8,-96.5C17.3,-102.8,30.6,-83.5,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      {/* Bottom Left Leaf Outline Design */}
      <div className="absolute bottom-6 left-6 w-64 h-64 pointer-events-none opacity-30">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-[#C2B8A3] stroke-[1]">
          <path d="M20 180 C 40 120, 80 90, 140 40 M60 140 C 70 110, 95 95, 120 70 M80 100 C 90 85, 105 75, 130 55 M100 160 C 110 135, 135 120, 160 95" />
        </svg>
      </div>

      {/* Main Container Card / Section */}
      <main className="w-full max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Column: Book Mockup / Image */}
        <div className="flex justify-center items-center">
          <div className="relative bg-white p-4 shadow-2xl rounded-sm transform -rotate-1 hover:rotate-0 transition-transform duration-300 border border-[#E4DFD3]">
            <div className="w-[280px] h-[400px] sm:w-[320px] sm:h-[460px] relative bg-[#D5E3EE] flex flex-col justify-between p-6 text-slate-900 shadow-inner">
              <div className="text-center">
                <span className="text-[10px] tracking-widest uppercase font-sans text-slate-600 block mb-1">Book Edition</span>
                <h3 className="text-2xl font-bold tracking-tight uppercase line-clamp-2">{book.title}</h3>
                <p className="text-xs italic text-slate-600 mt-1">{book.author}</p>
              </div>
              <div className="relative h-48 w-full flex items-end justify-center">
                {book.coverImage ? (
                  <div className="absolute inset-0 bg-cover bg-center opacity-90 rounded-sm" style={{ backgroundImage: `url(${book.coverImage})` }} />
                ) : (
                  <div className="text-xs text-slate-500 font-sans italic">Gallery Preview</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Book Details */}
        <div className="flex flex-col items-start space-y-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#2C2A29]">
              Best Selling Book
            </h2>
            {/* Wavy Decorative Line */}
            <div className="mt-2 text-[#C2A649]">
              <svg width="40" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 4C3 1 5 7 10 4C15 1 17 7 22 4C27 1 29 7 34 4C37 2 38 3 40 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-sans">
              {book.author}
            </span>
            <h1 className="text-2xl sm:text-3xl font-medium text-[#2C2A29]">
              {book.title}
            </h1>
            <p className="text-sm text-stone-600 font-sans leading-relaxed max-w-md">
              {book.description}
            </p>
          </div>

          <div className="text-2xl font-medium text-[#8C7A4B]">
            ${book.price.toFixed(2)}
          </div>

          {/* Shop It Now Button */}
          <button
            onClick={handleShopNow}
            className="group flex items-center space-x-2 text-sm uppercase tracking-wider font-sans font-medium text-[#2C2A29] hover:text-[#8C7A4B] transition-colors py-2 border-b border-[#2C2A29] hover:border-[#8C7A4B]"
          >
            <span>Shop It Now</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>

      {/* Slide-over Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              
              {/* Cart Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-stone-700" />
                  <h2 className="text-lg font-medium text-stone-900 font-serif">Your Shopping Cart</h2>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-stone-400 hover:text-stone-600 transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Body */}
              <div className="flex-1 overflow-y-auto px-6 py-6 font-sans">
                {cartCount > 0 ? (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 pb-4 border-b border-stone-100">
                      <div className="w-16 h-20 bg-[#D5E3EE] relative rounded overflow-hidden flex-shrink-0 flex items-center justify-center text-[10px] text-center p-1 font-serif">
                        Book
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-stone-900 font-serif">{book.title}</h4>
                        <p className="text-xs text-stone-500">{book.author}</p>
                        <p className="text-sm font-semibold text-stone-900 mt-1">${book.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2 border border-stone-200 rounded px-2 py-1">
                        <button onClick={() => setCartCount(Math.max(1, cartCount - 1))} className="text-stone-500 hover:text-black">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium">{cartCount}</span>
                        <button onClick={() => setCartCount(cartCount + 1)} className="text-stone-500 hover:text-black">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-stone-500 space-y-2">
                    <ShoppingBag className="w-12 h-12 stroke-1 text-stone-300" />
                    <p>Your cart is currently empty.</p>
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cartCount > 0 && (
                <div className="border-t border-stone-200 px-6 py-6 space-y-4 font-sans bg-stone-50">
                  <div className="flex justify-between text-base font-medium text-stone-900">
                    <p>Subtotal</p>
                    <p>${(book.price * cartCount).toFixed(2)}</p>
                  </div>
                  <p className="text-xs text-stone-500">Shipping and taxes calculated at checkout.</p>
                  <button 
                    onClick={() => alert("Proceeding to checkout...")}
                    className="w-full bg-[#2C2A29] text-white py-3 rounded text-sm uppercase tracking-wider font-medium hover:bg-[#423F3E] transition-colors"
                  >
                    Checkout
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}