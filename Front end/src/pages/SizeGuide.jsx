import React, { useState } from 'react';
import { Ruler, User, Shirt, ArrowRight, CheckCircle } from 'lucide-react';

export const SizeGuide = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [hoveredSize, setHoveredSize] = useState(null);

  const sizeData = [
    { size: 'S', length: 69, shoulder: 62, chest: 132, sleeve: 55, color: 'from-blue-50 to-lime-50' },
    { size: 'M', length: 70, shoulder: 63, chest: 134, sleeve: 56, color: 'from-lime-50 to-blue-50' },
    { size: 'L', length: 72, shoulder: 65, chest: 138, sleeve: 57, color: 'from-blue-50 to-lime-50' },
    { size: 'XL', length: 74, shoulder: 66, chest: 142, sleeve: 58, color: 'from-lime-50 to-blue-50' },
  ];

  const measurements = [
    { icon: <Shirt className="w-5 h-5" />, label: 'Length', key: 'length' },
    { icon: <User className="w-5 h-5" />, label: 'Shoulder', key: 'shoulder' },
    { icon: <Ruler className="w-5 h-5" />, label: 'Chest', key: 'chest' },
    { icon: <ArrowRight className="w-5 h-5 rotate-90" />, label: 'Sleeve', key: 'sleeve' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#2F3AE4] to-[#B8F200] py-16">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <Ruler className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Perfect Fit Guaranteed</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Size Guide
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Find your perfect fit with our comprehensive sizing chart. Each measurement is crafted for optimal comfort and style.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Size Selection Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Choose Your Size</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sizeData.map((item) => (
              <div
                key={item.size}
                className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedSize === item.size ? 'scale-105' : ''
                }`}
                onClick={() => setSelectedSize(selectedSize === item.size ? null : item.size)}
                onMouseEnter={() => setHoveredSize(item.size)}
                onMouseLeave={() => setHoveredSize(null)}
              >
                <div className={`bg-gradient-to-br ${item.color} rounded-2xl p-8 border-2 transition-all duration-300 ${
                  selectedSize === item.size 
                    ? 'border-[#2F3AE4] shadow-xl shadow-[#2F3AE4]/20' 
                    : 'border-transparent hover:border-[#B8F200] hover:shadow-lg'
                }`}>
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 transition-colors duration-300 ${
                      selectedSize === item.size ? 'text-[#2F3AE4]' : 'text-gray-800'
                    }`}>
                      {item.size}
                    </div>
                    {selectedSize === item.size && (
                      <CheckCircle className="w-6 h-6 text-[#2F3AE4] mx-auto animate-pulse" />
                    )}
                  </div>
                  
                  {/* Hover details */}
                  <div className={`mt-4 space-y-2 transition-all duration-300 ${
                    hoveredSize === item.size ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Chest:</span> {item.chest}cm
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Length:</span> {item.length}cm
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Measurements */}
        {selectedSize && (
          <div className="mb-16 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Size {selectedSize} Measurements
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {measurements.map((measurement) => {
                  const selectedItem = sizeData.find(item => item.size === selectedSize);
                  return (
                    <div key={measurement.key} className="text-center group">
                      <div className="bg-gradient-to-br from-[#2F3AE4]/10 to-[#B8F200]/10 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
                        <div className="text-[#2F3AE4] mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                          {measurement.icon}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">{measurement.label}</div>
                        <div className="text-2xl font-bold text-gray-900">
                          {selectedItem[measurement.key]}
                          <span className="text-sm text-gray-500 ml-1">cm</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Complete Size Chart */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-[#2F3AE4] to-[#B8F200] px-8 py-6">
            <h3 className="text-2xl font-bold text-white text-center">Complete Size Chart</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Size</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Length (cm)</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Shoulder (cm)</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Chest (cm)</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Sleeve (cm)</th>
                </tr>
              </thead>
              <tbody>
                {sizeData.map((item, index) => (
                  <tr 
                    key={item.size}
                    className={`border-b border-gray-100 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#2F3AE4]/5 hover:to-[#B8F200]/5 ${
                      selectedSize === item.size ? 'bg-gradient-to-r from-[#2F3AE4]/10 to-[#B8F200]/10' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center font-bold text-gray-800`}>
                          {item.size}
                        </div>
                        <span className="font-medium text-gray-900">Size {item.size}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-gray-900">{item.length}</td>
                    <td className="px-6 py-4 text-center font-medium text-gray-900">{item.shoulder}</td>
                    <td className="px-6 py-4 text-center font-medium text-gray-900">{item.chest}</td>
                    <td className="px-6 py-4 text-center font-medium text-gray-900">{item.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How to Measure Section */}
        <div className="mt-16 bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">How to Measure</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#2F3AE4] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Chest Measurement</h4>
                  <p className="text-gray-600">Measure around the fullest part of your chest, keeping the tape horizontal.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#B8F200] text-gray-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Length Measurement</h4>
                  <p className="text-gray-600">Measure from the highest point of your shoulder to your desired length.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#2F3AE4] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Shoulder Width</h4>
                  <p className="text-gray-600">Measure from shoulder point to shoulder point across your back.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#B8F200] text-gray-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Sleeve Length</h4>
                  <p className="text-gray-600">Measure from shoulder point to wrist with your arm slightly bent.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}