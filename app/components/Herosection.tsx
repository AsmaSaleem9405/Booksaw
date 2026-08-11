'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const slides = [
  {
    id: 1,
    title: "Life Of The Wild",
    description: "Explore deep into the wonders of wildlife conservation and nature's finest habitats. Discover rare species and breathtaking landscapes captured through immersive storytelling.",
    image: "/images/book1.png",
  },
  {
    id: 2,
    title: "The Art of Coding",
    description: "Master modern full-stack engineering with scalable architectures, clean TypeScript patterns, and robust Tailwind UI designs tailored for high-performance web applications.",
    image: "/images/book2.png",
  },
  {
    id: 3,
    title: "Mastering Business",
    description: "Strategic insights into modern market analysis, requirement engineering, and driving digital enterprise solutions to scale international client deliverables efficiently.",
    image: "/images/book3.png",
  },
];

const brandIcons = [
  { name: "Academic Cap", src: "/icons/1.png" },
  { name: "Bookstore", src: "/icons/2.png" },
  { name: "Bookdoor", src: "/icons/3.png" },
  { name: "Library", src: "/icons/4.png" },
  { name: "Flaprise", src: "/icons/5.png" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative bg-[#f4f1ea] overflow-hidden pt-8 sm:pt-12 pb-0">
      {/* Absolute Left Arrow (Hidden on mobile) */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 top-1/3 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-300 bg-[#f4f1ea]/80 backdrop-blur-sm items-center justify-center hover:bg-gray-200 transition hidden sm:flex"
      >
        <FiArrowLeft className="text-gray-700 text-lg" />
      </button>

      {/* Absolute Right Arrow (Hidden on mobile) */}
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-6 top-1/3 -translate-y-1/2 z-30 w-7 h-7 sm:w-12 sm:h-12 rounded-full border border-gray-300 bg-[#f4f1ea]/80 backdrop-blur-sm items-center justify-center hover:bg-gray-200 transition hidden sm:flex"
      >
        <FiArrowRight className="text-gray-700 text-lg" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[450px] sm:min-h-[500px]">
          
          {/* Left Content & Controls */}
          <div className="lg:col-span-7 lg:pl-12 md:ml-13 md:mr-1 md:-mt-15 flex flex-col justify-center relative z-10 text-center lg:text-left items-center lg:items-start">
            <div className="transition-opacity duration-700 ease-in-out w-full">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#1c1c1c] mb-4 sm:mb-6">
                {slides[current].title}
              </h1>
              <p className="text-gray-600 text-sm sm:text-lg max-w-xl mb-6 sm:mb-8 leading-relaxed mx-auto lg:mx-0">
                {slides[current].description}
              </p>
              
              <div className="flex items-center justify-center lg:justify-start space-x-6">
                <a
                  href="#read-more"
                  className="inline-flex items-center space-x-3 border border-gray-800 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm tracking-widest uppercase text-gray-900 hover:bg-gray-900 hover:text-white transition duration-300"
                >
                  <span>READ MORE</span>
                  <FiArrowRight />
                </a>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8 sm:mt-12 w-full justify-center lg:justify-start">
              {/* Mobile Arrows */}
              <div className="flex sm:hidden space-x-4 mb-2">
                <button
                  onClick={prevSlide}
                  aria-label="Previous Slide"
                  className="w-10 h-10 rounded-full border border-gray-300 bg-white/60 flex items-center justify-center hover:bg-gray-200 transition"
                >
                  <FiArrowLeft className="text-gray-700" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next Slide"
                  className="w-10 h-10 rounded-full border border-gray-300 bg-white/60 flex items-center justify-center hover:bg-gray-200 transition"
                >
                  <FiArrowRight className="text-gray-700" />
                </button>
              </div>
              
              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    aria-label={`Slide ${index + 1}`}
                    className={`w-3 h-3 rounded-full transition-all ${
                      current === index ? 'bg-[#b8860b] w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Book Image Showcase */}
          <div className="lg:col-span-5 relative w-[240px] sm:w-[340px] lg:w-[400px] h-[350px] sm:h-[480px] lg:h-[560px] mx-auto flex items-center justify-center">
            <Image
              src={slides[current].image}
              alt={slides[current].title}
              fill
              className="object-contain"
              priority
              style={{
                filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.15))',
                mixBlendMode: 'multiply',
              }}
            />
          </div>

        </div>
      </div>

      {/* Bottom Scrolling Marquee Icons Strip */}
      <div className="w-full bg-[#eae5d9] mt-12 sm:mt-20 py-6 sm:py-10 border-t border-[#e2ddd1] overflow-hidden">
        <div className="flex w-full overflow-hidden relative">
          <div className="flex animate-marquee space-x-12 sm:space-x-20 items-center whitespace-nowrap min-w-full">
            {/* Render items twice to create a seamless infinite loop effect */}
            {[...brandIcons, ...brandIcons].map((icon, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center h-12 sm:h-16 grayscale hover:grayscale-0 transition duration-300 shrink-0"
              >
                <Image 
                  src={icon.src} 
                  alt={icon.name} 
                  width={120} 
                  height={50} 
                  className="max-h-10 sm:max-h-14 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind CSS Custom Marquee Animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}