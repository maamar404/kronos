import React from 'react';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee'; // Import the Marquee component

export const About = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black py-32 text-center about-hero overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#B8F200] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#2F3AE4] rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#B8F200] rounded-full blur-xl animate-bounce delay-500"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#B8F200] via-white to-[#2F3AE4] bg-clip-text text-transparent animate-pulse">
            About Us
          </h1>
          <p className="text-2xl text-gray-300 font-light tracking-wide">
            Discover the story behind our revolutionary brand
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Brand Story Section */}
      <div className="relative py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#B8F200] to-white bg-clip-text text-transparent">
                  Our Story
                </h2>
                <div className="w-20 h-1 bg-[#B8F200] mb-8"></div>
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-300 text-lg leading-relaxed">
                  Founded in 2020, our brand was born out of a passion for streetwear and a vision to
                  blend urban style with futuristic designs. We believe that fashion is more than just
                  clothing—it's a way to express individuality and creativity.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  From our humble beginnings in a small studio, we've grown into a global brand
                  recognized for our unique designs and commitment to quality. Every piece we create is
                  a reflection of our dedication to innovation and style.
                </p>
              </div>

              <div className="flex space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#B8F200]">2024</div>
                  <div className="text-gray-400 text-sm">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#2F3AE4]">10K+</div>
                  <div className="text-gray-400 text-sm">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#B8F200]">50+</div>
                  <div className="text-gray-400 text-sm">Unique Designs</div>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <img
                src="/img/about-story.jpg" // Replace with your image
                alt="Our Story"
                className="relative w-full h-[500px] object-cover rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] py-6">
        <Marquee speed={200} gradient={false}>
          <p className="text-2xl font-bold mx-12 text-black tracking-wider">STREET MEETS FUTURE</p>
          <p className="text-2xl font-bold mx-12 text-black tracking-wider">LIMITED EDITION COLLECTION</p>
          <p className="text-2xl font-bold mx-12 text-black tracking-wider">FREE SHIPPING ON ALL ORDERS</p>
          <p className="text-2xl font-bold mx-12 text-black tracking-wider">EXCLUSIVE DESIGNS</p>
          <p className="text-2xl font-bold mx-12 text-black tracking-wider">PREMIUM QUALITY</p>
          <p className="text-2xl font-bold mx-12 text-black tracking-wider">GLOBAL COMMUNITY</p>
        </Marquee>
      </div>

      {/* Mission Section */}
      <div className="relative py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-40 h-40 bg-[#2F3AE4] rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-white to-[#B8F200] bg-clip-text text-transparent">
            Our Mission
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-300 text-xl leading-relaxed mb-8">
              Our mission is to redefine streetwear by combining bold designs with sustainable
              practices. We strive to create clothing that not only looks good but also makes a
              positive impact on the planet.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="p-6 bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 hover:border-[#B8F200]/30 transition-all duration-300">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold text-[#B8F200] mb-2">Sustainable</h3>
                <p className="text-gray-400">Eco-friendly materials and ethical production</p>
              </div>
              <div className="p-6 bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 hover:border-[#2F3AE4]/30 transition-all duration-300">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-semibold text-[#2F3AE4] mb-2">Innovative</h3>
                <p className="text-gray-400">Cutting-edge designs and technology</p>
              </div>
              <div className="p-6 bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 hover:border-[#B8F200]/30 transition-all duration-300">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-xl font-semibold text-[#B8F200] mb-2">Premium</h3>
                <p className="text-gray-400">Uncompromising quality and craftsmanship</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="relative py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-[#2F3AE4] to-[#B8F200] bg-clip-text text-transparent">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="group text-center p-8 bg-gradient-to-b from-gray-900/50 to-black/50 rounded-2xl border border-gray-800/50 hover:border-[#B8F200]/30 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#B8F200]">Innovation</h3>
              <p className="text-gray-400 leading-relaxed">
                We push boundaries to create unique and forward-thinking designs that define the future of streetwear.
              </p>
            </div>
            
            {/* Value 2 */}
            <div className="group text-center p-8 bg-gradient-to-b from-gray-900/50 to-black/50 rounded-2xl border border-gray-800/50 hover:border-[#2F3AE4]/30 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#2F3AE4] to-[#B8F200] rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#2F3AE4]">Sustainability</h3>
              <p className="text-gray-400 leading-relaxed">
                We are committed to reducing our environmental impact through sustainable practices and responsible sourcing.
              </p>
            </div>
            
            {/* Value 3 */}
            <div className="group text-center p-8 bg-gradient-to-b from-gray-900/50 to-black/50 rounded-2xl border border-gray-800/50 hover:border-[#B8F200]/30 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] rounded-2xl flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#B8F200]">Quality</h3>
              <p className="text-gray-400 leading-relaxed">
                Every piece is crafted with the highest standards of quality and attention to detail that you can feel.
              </p>
            </div>
            
            {/* Value 4 */}
            <div className="group text-center p-8 bg-gradient-to-b from-gray-900/50 to-black/50 rounded-2xl border border-gray-800/50 hover:border-[#2F3AE4]/30 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#2F3AE4] to-[#B8F200] rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#2F3AE4]">Community</h3>
              <p className="text-gray-400 leading-relaxed">
                We believe in building a global community that celebrates individuality, creativity, and self-expression.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="relative py-24 bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-black rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Ready to Explore?
          </h2>
          <p className="text-xl text-black/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover our latest collection and find your perfect style. Join the revolution of street meets future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/products"
              className="group bg-black text-[#B8F200] px-10 py-4 text-lg font-bold rounded-2xl hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center"
            >
              Shop Now
              <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link
              to="/contact"
              className="group bg-transparent border-2 border-black text-black px-10 py-4 text-lg font-bold rounded-2xl hover:bg-black hover:text-[#B8F200] transition-all duration-300 transform hover:scale-105"
            >
              Get in Touch
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-black">2M+</div>
              <div className="text-black/70">Items Sold</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black">98%</div>
              <div className="text-black/70">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black">20+</div>
              <div className="text-black/70">Countries Served</div>
            </div>
          </div>
        </div>
      </div>
      {/* Custom CSS for line clamp */}
      <style>{`
        .about-hero {
            background-image: url('/src/pages/about-hero.jpg'); /* Add a hero background image */
            background-size: cover;
            background-position: center;
          }
          
      `}</style>
    </div>
  );
  
};