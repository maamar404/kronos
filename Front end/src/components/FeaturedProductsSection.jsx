import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from './ProductCard';

const FeaturedProductsSection = ({ products, loading }) => {
  return (
    <div className="relative bg-black py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-56 h-56 bg-[#B8F200]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#2F3AE4]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-[#B8F200]/3 rounded-full blur-2xl animate-ping-slow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#B8F200]/10 backdrop-blur-sm border border-[#B8F200]/20 rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-[#B8F200] rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-[#B8F200] uppercase tracking-wider">Trending Now</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            FEATURED
            <span className="block bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] bg-clip-text text-transparent">
              PRODUCTS
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Handpicked pieces that define the future of streetwear
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group">
                {/* Loading Skeleton */}
                <div className="relative bg-gray-900/50 backdrop-blur-md border border-gray-700/50 rounded-2xl overflow-hidden">
                  {/* Image Skeleton */}
                  <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-700 animate-pulse">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-16 h-16 border-4 border-[#B8F200]/30 border-t-[#B8F200] rounded-full animate-spin"></div>
                    </div>
                  </div>
                  
                  {/* Content Skeleton */}
                  <div className="p-6">
                    <div className="h-4 bg-gray-700 rounded animate-pulse mb-3"></div>
                    <div className="h-6 bg-gray-600 rounded animate-pulse mb-4 w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="group transform transition-all duration-700 hover:scale-105"
                style={{ 
                  animationDelay: `${index * 200}ms`,
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
              >
                {/* Enhanced Product Card Wrapper */}
                <div className="relative h-full">
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#B8F200]/20 to-[#2F3AE4]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Main Card Container */}
                  <div className="relative bg-gray-900/50 backdrop-blur-md border border-gray-700/50 rounded-2xl overflow-hidden hover:border-[#B8F200]/30 transition-all duration-500 h-full">
                    <ProductCard product={product} />
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-[#B8F200]/20 backdrop-blur-md border border-[#B8F200]/30 rounded-full px-3 py-1">
                      <span className="text-xs font-bold text-[#B8F200] uppercase tracking-wider">
                        {index === 0 ? 'Hot' : index === 1 ? 'New' : 'Trending'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-800/50 rounded-2xl flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-gray-600 rounded-lg"></div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No Products Yet</h3>
            <p className="text-xl text-gray-400 max-w-lg mx-auto">
              We're cooking up something amazing. Check back soon for our latest drops!
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
    
          
          <Link
            to="/products"
            className="inline-flex items-center gap-3 bg-transparent border-2 border-[#B8F200] text-[#B8F200] px-8 py-4 font-bold text-lg rounded-full hover:bg-[#B8F200] hover:text-black transition-all duration-300 hover:scale-105 group"
          >
            View All Products
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-ping-slow {
          animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default FeaturedProductsSection;