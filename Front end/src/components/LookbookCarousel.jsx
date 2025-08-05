import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const LookbookCarousel = () => {
  const [currentLook, setCurrentLook] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const looks = [
    {
      id: 1,
      theme: "Urban Explorer",
      subtitle: "Street meets adventure",
      image: `${process.env.PUBLIC_URL}/img/slide-01.jpg`,
      products: ["Tactical Jacket", "Cargo Pants", "Urban Boots"],
      color: "#B8F200"
    },
    {
      id: 2,
      theme: "Cyber Punk",
      subtitle: "Digital rebellion",
      image: `${process.env.PUBLIC_URL}/img/slide-02.jpg`,
      products: ["LED Hoodie", "Tech Pants", "Neon Sneakers"],
      color: "#2F3AE4"
    },
    {
      id: 3,
      theme: "Future Minimalist",
      subtitle: "Clean lines, bold future",
      image: `${process.env.PUBLIC_URL}/img/slide-03.jpg`,
      products: ["Minimal Tee", "Smart Jeans", "Future Slides"],
      color: "#B8F200"
    },
    {
      id: 4,
      theme: "Night Runner",
      subtitle: "Built for the darkness",
      image: `${process.env.PUBLIC_URL}/img/slide-04.jpg`,
      products: ["Reflective Jacket", "Night Joggers", "Glow Accessories"],
      color: "#2F3AE4"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentLook((prev) => (prev + 1) % looks.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, looks.length]);

  const nextLook = () => {
    setCurrentLook((prev) => (prev + 1) % looks.length);
    setIsAutoPlaying(false);
  };

  const prevLook = () => {
    setCurrentLook((prev) => (prev - 1 + looks.length) % looks.length);
    setIsAutoPlaying(false);
  };

  const goToLook = (index) => {
    setCurrentLook(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative bg-black py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#B8F200]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-[#2F3AE4]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#B8F200]/10 backdrop-blur-sm border border-[#B8F200]/20 rounded-full px-6 py-2 mb-6">
            <Play size={12} className="text-[#B8F200]" />
            <span className="text-sm font-medium text-[#B8F200] uppercase tracking-wider">Style Guide</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            STYLE
            <span className="block bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] bg-clip-text text-transparent">
              INSPIRATION
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover how to style our pieces for every moment of your future.
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative">
          {/* Images Container */}
          <div className="relative h-[70vh] rounded-3xl overflow-hidden">
            {looks.map((look, index) => (
              <div
                key={look.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentLook 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-110'
                }`}
              >
                <img
                  src={look.image}
                  alt={look.theme}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback gradient if image doesn't exist
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div 
                  className="w-full h-full bg-gradient-to-br from-black/30 via-transparent to-black/60 hidden"
                  style={{ background: `linear-gradient(135deg, ${look.color}20, transparent, black)` }}
                ></div>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
            ))}

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="max-w-2xl">
                <div 
                  className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 transition-all duration-500"
                  style={{ 
                    backgroundColor: `${looks[currentLook].color}20`,
                    color: looks[currentLook].color,
                    border: `1px solid ${looks[currentLook].color}40`
                  }}
                >
                  Look #{String(currentLook + 1).padStart(2, '0')}
                </div>
                
                <h3 className="text-4xl md:text-6xl font-black text-white mb-2 transform transition-all duration-700">
                  {looks[currentLook].theme}
                </h3>
                
                <p className="text-xl text-gray-300 mb-6">
                  {looks[currentLook].subtitle}
                </p>

                {/* Product Tags */}
                <div className="flex flex-wrap gap-3">
                  {looks[currentLook].products.map((product, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm text-white border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevLook}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={nextLook}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {looks.map((_, index) => (
              <button
                key={index}
                onClick={() => goToLook(index)}
                className={`transition-all duration-300 ${
                  index === currentLook
                    ? 'w-12 h-2 rounded-full'
                    : 'w-2 h-2 rounded-full hover:scale-125'
                }`}
                style={{
                  backgroundColor: index === currentLook 
                    ? looks[currentLook].color 
                    : 'rgba(255, 255, 255, 0.3)'
                }}
              />
            ))}
          </div>

          {/* Auto-play Control */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-gray-400 hover:text-white text-sm uppercase tracking-wider transition-colors"
            >
              {isAutoPlaying ? 'Pause Auto-play' : 'Resume Auto-play'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookbookCarousel;