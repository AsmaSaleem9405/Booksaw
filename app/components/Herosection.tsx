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
    <section className="relative bg-[#f4f1ea] overflow-hidden pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[500px]">
          
          {/* Left Content & Controls */}
          <div className="lg:col-span-7 flex flex-col justify-center relative z-10">
            <div className="transition-opacity duration-700 ease-in-out">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1c1c1c] mb-6">
                {slides[current].title}
              </h1>
              <p className="text-gray-600 text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
                {slides[current].description}
              </p>
              
              <div className="flex items-center space-x-6">
                <a
                  href="#read-more"
                  className="inline-flex items-center space-x-3 border border-gray-800 px-6 py-3 text-sm tracking-widest uppercase text-gray-900 hover:bg-gray-900 hover:text-white transition duration-300"
                >
                  <span>READ MORE</span>
                  <FiArrowRight />
                </a>
              </div>
            </div>

            {/* Navigation Arrows & Dots */}
            <div className="flex items-center space-x-4 mt-12">
              <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition"
              >
                <FiArrowLeft className="text-gray-700" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next Slide"
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition"
              >
                <FiArrowRight className="text-gray-700" />
              </button>
              
              <div className="flex space-x-2 pl-4">
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
         {/* Right Book Image Showcase */}
         <div className="relative w-[280px] sm:w-[340px] h-[400px] sm:h-[480px]">
  <img
    src={slides[current].image}
    alt={slides[current].title}
    className="w-full h-full object-contain"
    style={{
      filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.15))',
      mixBlendMode: 'multiply',
    }}
  />
</div>

        </div>
      </div>

      {/* Bottom Brand / Gallery Icons Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-12 border-t border-[#e6e2d6]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center opacity-70">
          {brandIcons.map((icon, idx) => (
            <div key={idx} className="flex items-center justify-center h-16 grayscale hover:grayscale-0 transition duration-300">
              <Image 
                src={icon.src} 
                alt={icon.name} 
                width={120} 
                height={50} 
                className="max-h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}