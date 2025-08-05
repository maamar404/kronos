import React, { useState, useEffect, useRef } from 'react';

const BrandValuesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const values = [
    {
      icon: "♻️",
      title: "Eco Materials",
      description: "100% recycled fabrics and sustainable production",
      color: "#B8F200",
      delay: "0ms"
    },
    {
      icon: "🌍",
      title: "Carbon Neutral",
      description: "Zero emission shipping and renewable energy",
      color: "#2F3AE4",
      delay: "200ms"
    },
    {
      icon: "👥",
      title: "Fair Trade",
      description: "Ethical manufacturing and fair wages worldwide",
      color: "#B8F200",
      delay: "400ms"
    },
    {
      icon: "🔮",
      title: "Future Ready",
      description: "Innovative tech fabrics for tomorrow's world",
      color: "#2F3AE4",
      delay: "600ms"
    }
  ];

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

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative py-24 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-[#B8F200]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-[#2F3AE4]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-[#B8F200]/3 rounded-full blur-2xl animate-ping-slow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#B8F200]/10 backdrop-blur-sm border border-[#B8F200]/20 rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-[#B8F200] rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-[#B8F200] uppercase tracking-wider">Our Values</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            BUILDING THE
            <span className="block bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] bg-clip-text text-transparent">
              FUTURE
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            More than fashion. We're creating a sustainable, ethical future where style meets responsibility.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className={`group relative transform transition-all duration-700 ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: value.delay }}
            >
              {/* Card Background */}
              <div className="relative h-full">
                {/* Glow Effect */}
                <div 
                  className="absolute -inset-1 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ backgroundColor: value.color }}
                ></div>
                
                {/* Main Card */}
                <div className="relative bg-gray-900/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 h-full hover:border-gray-600/50 transition-all duration-500 group-hover:transform group-hover:scale-105">
                  
                  {/* Icon */}
                  <div className="mb-6">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all duration-500 group-hover:scale-110"
                      style={{ backgroundColor: `${value.color}20`, color: value.color }}
                    >
                      {value.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 
                    className="text-2xl font-bold mb-4 transition-colors duration-300"
                    style={{ color: value.color }}
                  >
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {value.description}
                  </p>

                  {/* Bottom Accent */}
                  <div className="mt-6 flex items-center gap-2">
                    <div 
                      className="w-8 h-1 rounded-full transition-all duration-500 group-hover:w-12"
                      style={{ backgroundColor: value.color }}
                    ></div>
                    <div className="w-2 h-1 bg-gray-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 text-gray-400">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#B8F200]"></div>
            <span className="text-sm uppercase tracking-wider">Committed to Change</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#2F3AE4]"></div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BrandValuesSection;