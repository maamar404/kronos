// src/components/LoadingScreen.jsx
import React, { useState, useEffect } from 'react';

export const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 2500);

    // Smooth progress animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 4;
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo */}
        <div className="relative mb-8">
          <div className="w-16 h-16 mx-auto bg-none rounded-full flex items-center justify-center">
            
            <img src={`${process.env.PUBLIC_URL}/img/kronos1.png`} alt="KRONOS" className="w-10 h-10" />
            
          </div>
          
        </div>

        {/* Progress Bar */}
        <div className="w-48 mx-auto">
          <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#b8f200] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};