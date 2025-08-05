import React, { useState } from 'react';

const InteractiveSection = () => {
  const [activeSection, setActiveSection] = useState(1);

  const sections = [
    {
      id: 1,
      number: "01",
      title: "Accessories",
      description: "Chase trends not prices",
      image: "/img/accessories-bg.jpg" // Replace with your actual image path
    },
    {
      id: 2,
      number: "02", 
      title: "Streetwear",
      description: "Express your unique style",
      image: "/img/streetwear-bg.jpg" // Replace with your actual image path
    },
    {
      id: 3,
      number: "03",
      title: "Future Tech",
      description: "Tomorrow's fashion today",
      image: "/img/future-tech-bg.jpg" // Replace with your actual image path
    }
  ];

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              activeSection === section.id ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={section.image}
              alt={section.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="relative z-10 h-full grid grid-cols-3">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`flex flex-col justify-center items-center text-center p-8 cursor-pointer transition-all duration-500 ease-in-out ${
              activeSection === section.id 
                ? 'bg-black/20 backdrop-blur-sm opacity-100' 
                : 'opacity-0 hover:opacity-30'
            }`}
            onMouseEnter={() => setActiveSection(section.id)}
          >
            {/* Content only visible for active section */}
            <div className={`transition-all duration-500 ${
              activeSection === section.id 
                ? 'opacity-100 transform translate-y-0 scale-100' 
                : 'opacity-0 transform translate-y-8 scale-95 pointer-events-none'
            }`}>
              {/* Number */}
              <div className="text-6xl md:text-8xl font-black mb-4 text-[#B8F200] drop-shadow-lg">
                {section.number}
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">
                {section.title}
              </h3>

              {/* Description */}
              <p className="text-lg md:text-xl font-medium text-gray-200 drop-shadow-md">
                {section.description}
              </p>

              {/* Hover Indicator */}
              <div className="mt-6 flex justify-center">
                <div className="w-20 h-1 bg-[#B8F200]"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom gradient overlay for better text readability */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default InteractiveSection;