import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext';
import './Home.css'; 
import InteractiveSection from '../components/InteractiveSection'; 
import { AnimatedCounter } from '../components/AnimatedCounter'; 
import InstagramFeed from '../components/InstagramFeed'; 
import LookbookCarousel from '../components/LookbookCarousel'; 
import BrandValuesSection from '../components/BrandValuesSection'; 
import FeaturedProductsSection from '../components/FeaturedProductsSection';

export const Home = () => {
  const { products, loading } = useContext(ProductContext);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  
  // Set featured products when products are loaded
  useEffect(() => {
    if (products.length > 0) {
      setFeaturedProducts(products.slice(0, 3));
    }
  }, [products]);

  return (
    <div className="min-h-screen">
      
      {/* Ultra Responsive Hero Section */}
      <div className="relative hero-container bg-black min-h-screen overflow-hidden">
        {/* Multiple Background Layers */}
        <div className="absolute inset-0">
          {/* Video background */}
          <video
            className="w-full h-full object-cover opacity-30 md:opacity-40"
            autoPlay
            muted
            loop
            playsInline
            poster={`${process.env.PUBLIC_URL}/img/slide-03.jpg`}
          >
            <source src={`${process.env.PUBLIC_URL}/videos/hero-video.mp4`} type="video/mp4" />
            <source src={`${process.env.PUBLIC_URL}/videos/hero-video.webm`} type="video/webm" />
            <img
              src={`${process.env.PUBLIC_URL}/img/slide-03.jpg`}
              alt="Hero"
              className="w-full h-full object-cover opacity-30 md:opacity-40"
            />
          </video>
          
          {/* Animated mesh gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#B8F200]/20 via-transparent to-[#2F3AE4]/20 animate-pulse"></div>
          
          {/* Responsive geometric shapes */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-5 w-32 h-32 md:top-20 md:left-10 md:w-64 md:h-64 border-2 border-[#B8F200]/30 rotate-45 animate-spin-slow"></div>
            <div className="absolute bottom-10 right-10 w-20 h-20 md:bottom-20 md:right-20 md:w-40 md:h-40 bg-[#2F3AE4]/10 rotate-12 animate-float"></div>
            <div className="absolute top-1/2 left-1/4 w-10 h-10 md:w-20 md:h-20 border border-white/20 rounded-full animate-ping-slow"></div>
          </div>
        </div>

        {/* Mobile-First Hero Content */}
        <div className="absolute inset-0 flex flex-col lg:flex-row">
          {/* Mobile: Single Column Layout, Desktop: Split Screen */}
          
          {/* Left Panel - Brand Info */}
          <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end px-4 sm:px-8 lg:pr-12 relative pt-20 lg:pt-0">
            <div className="text-center lg:text-right text-white max-w-lg lg:max-w-none">
              {/* Vertical Brand Name - Hidden on mobile */}
              <div className="hidden lg:block writing-mode-vertical text-6xl xl:text-8xl font-black tracking-widest mb-8 opacity-20 absolute -right-4 top-1/4">
                KRONOS
              </div>
              
              {/* Main Content */}
              <div className="relative z-10">
                <div className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#B8F200] mb-4 animate-slideInLeft">
                  EST. 2025
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-6">
                  <span className="block animate-slideInLeft delay-200">STREET</span>
                  <span className="block text-[#B8F200] animate-slideInLeft delay-400">MEETS</span>
                  <span className="block animate-slideInLeft delay-600">FUTURE</span>
                </h1>
                
                <div className="w-20 sm:w-32 h-1 bg-[#B8F200] mb-6 mx-auto lg:mx-0 animate-expandWidth delay-800"></div>
                
                <p className="text-base sm:text-lg text-gray-300 max-w-sm leading-relaxed animate-slideInLeft delay-1000 mx-auto lg:mx-0">
                  Redefining streetwear with cutting-edge designs that blur the line between today and tomorrow.
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Interactive Area */}
          <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start px-4 sm:px-8 lg:pl-12 relative pb-20 lg:pb-0">
            <div className="text-center lg:text-left">
              {/* Call to Action */}
              <div className="animate-slideInRight delay-1200">
                <div className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-400 mb-4">
                  Experience The Future
                </div>
                
                <Link
                  to="/products"
                  className="group relative inline-block mb-8"
                >
                  <div className="relative bg-[#B8F200] text-black px-8 sm:px-12 py-3 sm:py-4 font-bold text-base sm:text-lg uppercase tracking-wider overflow-hidden">
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                      SHOP NOW
                    </span>
                    <div className="absolute inset-0 bg-black transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  </div>
                  <div className="absolute inset-0 border-2 border-[#B8F200] transform translate-x-1 translate-y-1 sm:translate-x-2 sm:translate-y-2 -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
                </Link>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4">
                  <AnimatedCounter />
                  <div className="text-xs sm:text-sm text-gray-400 text-center lg:text-left">Happy Customers Worldwide</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Text - Hidden on mobile */}
        <div className="hidden lg:block absolute left-8 top-1/2 transform -translate-y-1/2 -rotate-90">
          <div className="text-xs uppercase tracking-[0.5em] text-white/50">
            INNOVATION • STYLE • FUTURE
          </div>
        </div>

        {/* Responsive Floating Elements */}
        <div className="absolute top-20 right-1/4 w-1 h-1 sm:w-2 sm:h-2 bg-[#B8F200] rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 right-1/3 w-2 h-2 sm:w-3 sm:h-3 border border-[#2F3AE4] rounded-full animate-spin-slow"></div>
      </div>

      {/* Responsive Brand Story Section */}
      <div className="relative py-16 sm:py-20 lg:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#B8F200] to-white bg-clip-text text-transparent">
                  Our Story
                </h2>
                <div className="w-16 sm:w-20 h-1 bg-[#B8F200] mb-6 sm:mb-8 mx-auto lg:mx-0"></div>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  Founded in 2024, our brand was born out of a passion for streetwear and a vision to
                  blend urban style with futuristic designs. We believe that fashion is more than just
                  clothing—it's a way to express individuality and creativity.
                </p>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  From our humble beginnings in a small studio, we've grown into a global brand
                  recognized for our unique designs and commitment to quality. Every piece we create is
                  a reflection of our dedication to innovation and style.
                </p>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#B8F200]">2024</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Founded</div>
                </div>
                <div className="text-center">
                  <AnimatedCounter />
                  <div className="text-gray-400 text-xs sm:text-sm">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#B8F200]">50+</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Unique Designs</div>
                </div>
              </div>
            </div>
            
            <div className="relative group order-first lg:order-last">
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] rounded-xl sm:rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <img
                src={`${process.env.PUBLIC_URL}/img/gallery-6.jpg`}
                alt="Our Story"
                className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-xl sm:rounded-2xl shadow-2xl transform group-hover:scale-[1.02] sm:group-hover:scale-[1.05] transition duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Brand Values Section */}
      <BrandValuesSection />

      {/* Interactive Section */}
      <InteractiveSection />

      {/* Featured Products */}
      <FeaturedProductsSection products={featuredProducts} loading={loading} />

      {/* Lookbook Carousel */}
      <LookbookCarousel />

      {/* Responsive Testimonials */}
      <div className="bg-black text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 sm:mb-16">WHAT OUR COMMUNITY SAYS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-900 p-6 sm:p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <span className="text-[#B8F200] text-xl sm:text-2xl">★★★★★</span>
              </div>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                "The quality is insane! I've never worn anything that gets so many compliments while being this comfortable."
              </p>
              <div className="flex items-center">
                <img 
                  src={`${process.env.PUBLIC_URL}/img/testimonial-1.jpg`} 
                  alt="Alex K." 
                  className="w-10 sm:w-12 h-10 sm:h-12 rounded-full mr-3 sm:mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold text-sm sm:text-base">ALEX K.</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Verified Customer</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-900 p-6 sm:p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <span className="text-[#B8F200] text-xl sm:text-2xl">★★★★★</span>
              </div>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                "Finally a brand that gets it - futuristic designs that actually work in real life. The jackets are next level."
              </p>
              <div className="flex items-center">
                <img 
                  src={`${process.env.PUBLIC_URL}/img/testimonial-2.jpg`} 
                  alt="Jamie L." 
                  className="w-10 sm:w-12 h-10 sm:h-12 rounded-full mr-3 sm:mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold text-sm sm:text-base">JAMIE L.</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Verified Customer</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-900 p-6 sm:p-8 rounded-lg md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <span className="text-[#B8F200] text-xl sm:text-2xl">★★★★★</span>
              </div>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                "Street Meets Future changed my whole wardrobe. Every drop is better than the last. Worth every penny."
              </p>
              <div className="flex items-center">
                <img 
                  src={`${process.env.PUBLIC_URL}/img/testimonial-3.jpg`} 
                  alt="Taylor R." 
                  className="w-10 sm:w-12 h-10 sm:h-12 rounded-full mr-3 sm:mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold text-sm sm:text-base">TAYLOR R.</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Verified Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instagram Feed */}
      <div className="bg-black py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InstagramFeed />
        </div>
      </div>

      {/* Responsive Final CTA Section */}
      <div className="relative bg-black py-20 sm:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/50"></div>
          <img 
            src={`${process.env.PUBLIC_URL}/img/cta-background.jpg`} 
            alt="CTA Background"
            className="w-full h-full object-cover opacity-30"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 sm:mb-8 leading-tight">
            READY TO JOIN THE
            <span className="block text-[#B8F200] neon-text">REVOLUTION?</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Step into the future of streetwear. Where every piece tells your story and every story changes the game.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link
              to="/products"
              className="w-full sm:w-auto bg-[#B8F200] text-black px-8 sm:px-12 py-4 sm:py-6 font-black text-lg sm:text-xl hover:bg-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-center"
            >
              SHOP THE FUTURE
            </Link>
            <Link
              to="/collections"
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 sm:px-12 py-4 sm:py-6 font-black text-lg sm:text-xl hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 text-center"
            >
              EXPLORE COLLECTIONS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};