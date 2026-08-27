"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  coverImage: string;
}

interface CartItem extends Book {
  quantity: number;
}

interface FeaturedBooksProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItemsCount: number;
  totalCartPrice: number;
}

const ALL_BOOKS: Book[] = [
  { id: 1, title: "Simple Way Of Piece Life", author: "Armor Ramsey", price: 40.00, coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop" },
  { id: 2, title: "Great Travel At Desert", author: "Sanchit Howdy", price: 38.00, coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop" },
  { id: 3, title: "The Lady Beauty Scarlett", author: "Arthur Doyle", price: 45.00, coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop" },
  { id: 4, title: "Once Upon A Time", author: "Klien Marry", price: 35.00, coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop" },
  { id: 5, title: "The Silent Echo", author: "Clara Hughes", price: 29.00, coverImage: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=800&auto=format&fit=crop" },
  { id: 6, title: "Beyond The Horizon", author: "Julian Vane", price: 42.00, coverImage: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?q=80&w=800&auto=format&fit=crop" },
  { id: 7, title: "Whispers of the Forest", author: "Elena Rostova", price: 31.00, coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=800&auto=format&fit=crop" },
  { id: 8, title: "Chronicles of Time", author: "Marcus Vance", price: 48.00, coverImage: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=800&auto=format&fit=crop" },
  { id: 9, title: "Architect of Dreams", author: "Sienna Miller", price: 39.00, coverImage: "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=800&auto=format&fit=crop" },
  { id: 10, title: "Under the Open Sky", author: "Liam O'Connor", price: 27.00, coverImage: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=800&auto=format&fit=crop" },
  { id: 11, title: "Path to Enlightenment", author: "Tenzin Norbu", price: 50.00, coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop" },
  { id: 12, title: "Ocean's Deep Secret", author: "Nautical Sam", price: 34.00, coverImage: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=800&auto=format&fit=crop" },
];

export default function FeaturedBooks({
  cart,
  setCart,
  isCartOpen,
  setIsCartOpen,
  totalCartPrice
}: FeaturedBooksProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewAll, setViewAll] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "details" | "success">("cart");
  
  // Interactive 3D Card Tilt State Tracking per book index
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll Reveal State Tracker using Intersection Observer
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", address: "", phone: "" });
  const sliderRef = useRef<HTMLDivElement>(null);

  // Scroll Reveal Observer Effect (Triggers when scrolling up/down into view)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    if (viewAll) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (ALL_BOOKS.length - 3));
    }, 4000);
    return () => clearInterval(interval);
  }, [viewAll]);

  const addToCart = (book: Book) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === book.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...book, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCheckoutStep("success");
      setCart([]); 
    } catch (error) {
      console.error("Order submission failed", error);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setHoveredId(id);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section 
      ref={sectionRef}
      className={`bg-[#f4f1ea] min-h-screen py-16 px-4 md:px-12 text-[#2c2b2a] font-serif relative overflow-hidden transition-all duration-1000 transform ${
        isVisible ? "opacity-150 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      
      {/* Background Subtle 3D Ambient Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-stone-300/30 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000" />

      <div className="text-center mb-12 relative z-10 transition-transform duration-700 hover:scale-[1.01]">
        <p className="text-xs uppercase tracking-[0.25em] text-stone-500 mb-2 animate-bounce">Some Quality Items</p>
        <h2 className="text-4xl md:text-5xl font-normal tracking-wide">
          {viewAll ? "All Products" : "Featured Books"}
        </h2>
      </div>

      {/* Main Book Carousel or Grid View */}
      {!viewAll ? (
        <div className="max-w-7xl mx-auto overflow-hidden px-2 py-6">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-700 ease-in-out gap-6"
            style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
          >
            {ALL_BOOKS.map((book) => {
              const isHovered = hoveredId === book.id;
              const rotX = isHovered ? (-mousePos.y / 10) : 0;
              const rotY = isHovered ? (mousePos.x / 10) : 0;

              return (
                <div 
                  key={book.id} 
                  className="min-w-[100%] sm:min-w-[50%] lg:min-w-[25%] flex flex-col items-center group cursor-pointer perspective-1000"
                  onMouseMove={(e) => handleMouseMove(e, book.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div 
                    className="bg-[#f2efe9] w-full h-[400px] flex items-center justify-center relative p-8 shadow-md rounded-lg mb-4 transition-all duration-300 ease-out border border-stone-200/60"
                    style={{
                      transform: isHovered 
                        ? `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-10px) scale3d(1.02, 1.02, 1.02)` 
                        : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)',
                      boxShadow: isHovered 
                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 15px rgba(217, 119, 6, 0.15)' 
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    {/* Book 3D Cover element */}
                    <div 
                      className="relative w-48 h-64 rounded-r-lg transition-all duration-300"
                      style={{
                        transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)',
                        boxShadow: '15px 20px 30px rgba(0,0,0,0.3), -2px 0 5px rgba(0,0,0,0.1) inset'
                      }}
                    >
                      <Image src={book.coverImage} alt={book.title} fill className="object-cover rounded-r-md" />
                    </div>

                    {/* Quick Add Overlay */}
                    <div 
                      className="absolute inset-0 bg-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-lg"
                    >
                      <button
                        onClick={(e) => { e.stopPropagation(); addToCart(book); }}
                        className="bg-[#1a1a1a] text-white text-xs uppercase tracking-widest px-6 py-3 font-sans shadow-2xl hover:bg-amber-700 hover:scale-105 active:scale-95 transition-all duration-300 rounded"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-center transition-colors group-hover:text-amber-800">{book.title}</h3>
                  <p className="text-xs text-stone-500 font-sans tracking-wide mt-1">{book.author}</p>
                  <p className="text-stone-700 font-sans font-medium mt-1">$ {book.price.toFixed(2)}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-6">
          {ALL_BOOKS.map((book) => {
            const isHovered = hoveredId === book.id;
            const rotX = isHovered ? (-mousePos.y / 10) : 0;
            const rotY = isHovered ? (mousePos.x / 10) : 0;

            return (
              <div 
                key={book.id} 
                className="flex flex-col items-center group cursor-pointer perspective-1000"
                onMouseMove={(e) => handleMouseMove(e, book.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div 
                  className="bg-[#f2efe9] w-full h-[400px] flex items-center justify-center relative p-8 shadow-md rounded-lg mb-4 transition-all duration-300 ease-out border border-stone-200/60"
                  style={{
                    transform: isHovered 
                      ? `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-10px) scale3d(1.02, 1.02, 1.02)` 
                      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)',
                    boxShadow: isHovered 
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 15px rgba(217, 119, 6, 0.15)' 
                      : '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <div 
                    className="relative w-48 h-64 rounded-r-lg transition-all duration-300"
                    style={{
                      transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)',
                      boxShadow: '15px 20px 30px rgba(0,0,0,0.3), -2px 0 5px rgba(0,0,0,0.1) inset'
                    }}
                  >
                    <Image src={book.coverImage} alt={book.title} fill className="object-cover rounded-r-md" />
                  </div>
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-lg">
                    <button onClick={(e) => { e.stopPropagation(); addToCart(book); }} className="bg-[#1a1a1a] text-white text-xs uppercase tracking-widest px-6 py-3 font-sans shadow-2xl hover:bg-amber-700 hover:scale-105 active:scale-95 transition-all duration-300 rounded">
                      Add To Cart
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-center transition-colors group-hover:text-amber-800">{book.title}</h3>
                <p className="text-xs text-stone-500 font-sans tracking-wide mt-1">{book.author}</p>
                <p className="text-stone-700 font-sans font-medium mt-1">$ {book.price.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* View All Toggle Button */}
      <div className="max-w-7xl mx-auto flex justify-end mt-12 pr-4 relative z-10">
        <button
          onClick={() => setViewAll(!viewAll)}
          className="text-xs uppercase tracking-[0.2em] font-sans text-stone-800 hover:text-amber-800 border-b-2 border-stone-800 pb-1 transition-all duration-300 cursor-pointer hover:translate-x-1"
        >
          {viewAll ? "← Back to Featured Carousel" : "View All Products →"}
        </button>
      </div>

      {/* Slide-over Cart & Checkout Drawer with Smooth 3D Interpolation */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 animate-fadeIn" 
            onClick={() => setIsCartOpen(false)} 
          />
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-500 ease-out animate-slideLeft">
              
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
                <h2 className="text-lg font-medium uppercase tracking-wider text-stone-800">
                  {checkoutStep === "cart" && "Your Shopping Cart"}
                  {checkoutStep === "details" && "Shipping & Payment (COD)"}
                  {checkoutStep === "success" && "Order Confirmed"}
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="text-stone-400 hover:text-stone-800 text-2xl font-bold transition-transform hover:rotate-90 duration-300">&times;</button>
              </div>

              {/* Step 1: Cart Items */}
              {checkoutStep === "cart" && (
                <>
                  <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-center text-stone-500 py-12 animate-pulse">Your cart is currently empty.</p>
                    ) : (
                      cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b border-stone-100 pb-4 transition-all hover:bg-stone-50/80 p-2 rounded">
                          <div className="flex items-center space-x-4">
                            <div className="relative w-12 h-16 bg-stone-100 rounded overflow-hidden shadow-md">
                              <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-stone-800">{item.title}</h4>
                              <p className="text-xs text-stone-500">$ {item.price.toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 rounded border border-stone-300 text-xs flex items-center justify-center hover:bg-stone-200 transition">-</button>
                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 rounded border border-stone-300 text-xs flex items-center justify-center hover:bg-stone-200 transition">+</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  {cart.length > 0 && (
                    <div className="border-t border-stone-200 px-6 py-6 bg-stone-50 shadow-inner">
                      <div className="flex justify-between text-base font-medium text-stone-900 mb-4">
                        <p>Subtotal</p>
                        <p>$ {totalCartPrice.toFixed(2)}</p>
                      </div>
                      <button onClick={() => setCheckoutStep("details")} className="w-full bg-[#2c2b2a] text-white py-3 rounded text-xs uppercase tracking-widest font-medium hover:bg-amber-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
                        Proceed to Checkout
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Step 2: Shipping Details & Cash on Delivery */}
              {checkoutStep === "details" && (
                <form onSubmit={handleOrderSubmit} className="flex-1 flex flex-col justify-between p-6 overflow-y-auto">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase text-stone-600 mb-1">Full Name</label>
                      <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border border-stone-300 rounded p-2 text-sm focus:outline-none focus:border-amber-700 transition" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-stone-600 mb-1">Email (for Order Confirmation)</label>
                      <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border border-stone-300 rounded p-2 text-sm focus:outline-none focus:border-amber-700 transition" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-stone-600 mb-1">Phone Number</label>
                      <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border border-stone-300 rounded p-2 text-sm focus:outline-none focus:border-amber-700 transition" placeholder="+1 234 567 890" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-stone-600 mb-1">Delivery Address</label>
                      <textarea required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full border border-stone-300 rounded p-2 text-sm focus:outline-none focus:border-amber-700 transition" placeholder="Street, City, Country" rows={3} />
                    </div>
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800 shadow-sm">
                      Payment Method: <strong>Cash on Delivery (COD)</strong>
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-3">
                    <button type="button" onClick={() => setCheckoutStep("cart")} className="w-1/3 border border-stone-300 py-3 rounded text-xs uppercase tracking-widest hover:bg-stone-100 transition">Back</button>
                    <button type="submit" className="w-2/3 bg-[#2c2b2a] text-white py-3 rounded text-xs uppercase tracking-widest hover:bg-amber-800 transition shadow-lg">Confirm Order</button>
                  </div>
                </form>
              )}

              {/* Step 3: Success Confirmation */}
              {checkoutStep === "success" && (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-4 animate-bounce shadow-md">✓</div>
                  <h3 className="text-xl font-medium mb-2">Thank you for your order!</h3>
                  <p className="text-sm text-stone-600 mb-6 leading-relaxed">
                    We have received your order and sent a confirmation summary to your email. Your books will be delivered via Cash on Delivery.
                  </p>
                  <button onClick={() => { setCheckoutStep("cart"); setIsCartOpen(false); }} className="bg-[#2c2b2a] text-white px-6 py-2.5 rounded text-xs uppercase tracking-widest hover:bg-amber-800 transition shadow-md">
                    Continue Shopping
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Embedded Style Animations for Tailwind compatibility */}
      <style jsx global>{`
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slideLeft {
          animation: slideLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}