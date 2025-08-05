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
      // You can either randomly select products or use the first 3
      // Alternatively, you could add a "featured" field in your database
      // and filter by that field
      setFeaturedProducts(products.slice(0, 3));
    }
  }, [products]);

 
  return (
    <div className="min-h-screen">
      
      {/* Hero Section with Video Background */}
      {/* Ultra Creative Hero Section */}
      <div className="relative hero-container bg-black min-h-screen overflow-hidden">
        {/* Multiple Background Layers */}
        <div className="absolute inset-0">
          {/* Video background */}
          <video
            className="w-full h-full object-cover opacity-40"
            autoPlay
            muted
            loop
            playsInline
            poster={`${process.env.PUBLIC_URL}/img/slide-03.jpg`} // Fallback image while video loads
          >
            <source src={`${process.env.PUBLIC_URL}/videos/hero-video.mp4`} type="video/mp4" />
            <source src={`${process.env.PUBLIC_URL}/videos/hero-video.webm`} type="video/webm" />
            {/* Fallback for browsers that don't support video */}
            <img
              src={`${process.env.PUBLIC_URL}/img/slide-03.jpg`}
              alt="Hero"
              className="w-full h-full object-cover opacity-40"
            />
          </video>
          
          {/* Animated mesh gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#B8F200]/20 via-transparent to-[#2F3AE4]/20 animate-pulse"></div>
          
          {/* Moving geometric shapes */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-64 h-64 border-2 border-[#B8F200]/30 rotate-45 animate-spin-slow"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#2F3AE4]/10 rotate-12 animate-float"></div>
            <div className="absolute top-1/2 left-1/3 w-20 h-20 border border-white/20 rounded-full animate-ping-slow"></div>
          </div>
        </div>

        {/* Rest of your hero content remains the same */}
        {/* Splitting Screen Effect */}
        <div className="absolute inset-0 flex">
          {/* Left Panel - Brand Info */}
          <div className="w-1/2 flex items-center justify-end pr-12 relative">
            <div className="text-right text-white">
              {/* Vertical Brand Name */}
              <div className="writing-mode-vertical text-8xl font-black tracking-widest mb-8 opacity-20 absolute -right-4 top-1/4">
                KRONOS
              </div>
              
              {/* Main Content */}
              <div className="relative z-10">
                <div className="text-sm uppercase tracking-[0.3em] text-[#B8F200] mb-4 animate-slideInLeft">
                  EST. 2025
                </div>
                
                <h1 className="text-6xl md:text-7xl font-black leading-none mb-6">
                  <span className="block animate-slideInLeft delay-200">STREET</span>
                  <span className="block text-[#B8F200] animate-slideInLeft delay-400">MEETS</span>
                  <span className="block animate-slideInLeft delay-600">FUTURE</span>
                </h1>
                
                <div className="w-32 h-1 bg-[#B8F200] mb-6 animate-expandWidth delay-800"></div>
                
                <p className="text-lg text-gray-300 max-w-sm leading-relaxed animate-slideInLeft delay-1000">
                  Redefining streetwear with cutting-edge designs that blur the line between today and tomorrow.
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Interactive Area */}
          <div className="w-1/2 flex items-center justify-start pl-12 relative">
            <div className="text-left">
              {/* Call to Action */}
              <div className="animate-slideInRight delay-1200">
                <div className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">
                  Experience The Future
                </div>
                
                <Link
                  to="/products"
                  className="group relative inline-block"
                >
                  <div className="relative bg-[#B8F200] text-black px-12 py-4 font-bold text-lg uppercase tracking-wider overflow-hidden">
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                      SHOP NOW
                    </span>
                    <div className="absolute inset-0 bg-black transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  </div>
                  <div className="absolute inset-0 border-2 border-[#B8F200] transform translate-x-2 translate-y-2 -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
                </Link>
                
                <div className="mt-8 flex items-center gap-4">
                  <AnimatedCounter />
                  <div className="text-sm text-gray-400">Happy Customers Worldwide</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Text */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 -rotate-90">
          <div className="text-xs uppercase tracking-[0.5em] text-white/50">
            INNOVATION • STYLE • FUTURE
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-32 right-1/4 w-2 h-2 bg-[#B8F200] rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 right-1/3 w-3 h-3 border border-[#2F3AE4] rounded-full animate-spin-slow"></div>
      </div>


          {/* Brand Story Section */}
      <div className="relative py-24 bg-black">
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
                  Founded in 2024, our brand was born out of a passion for streetwear and a vision to
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
                  <AnimatedCounter />
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
                src={`${process.env.PUBLIC_URL}/img/gallery-6.jpg`} // Replace with your image
                alt="Our Story"
                className="relative w-full h-[500px] object-cover rounded-2xl shadow-2xl transform group-hover:scale-[1.05] transition duration-500"
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


      {/* Testimonials */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">WHAT OUR COMMUNITY SAYS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-900 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <span className="text-[#B8F200] text-2xl">★★★★★</span>
              </div>
              <p className="text-gray-300 mb-6">
                "The quality is insane! I've never worn anything that gets so many compliments while being this comfortable."
              </p>
              <div className="flex items-center">
                <img 
                  src={`${process.env.PUBLIC_URL}/img/testimonial-1.jpg`} 
                  alt="Alex K." 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold">ALEX K.</h4>
                  <p className="text-gray-400 text-sm">Verified Customer</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-900 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <span className="text-[#B8F200] text-2xl">★★★★★</span>
              </div>
              <p className="text-gray-300 mb-6">
                "Finally a brand that gets it - futuristic designs that actually work in real life. The jackets are next level."
              </p>
              <div className="flex items-center">
                <img 
                  src={`${process.env.PUBLIC_URL}/img/testimonial-2.jpg`} 
                  alt="Jamie L." 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold">JAMIE L.</h4>
                  <p className="text-gray-400 text-sm">Verified Customer</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-900 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <span className="text-[#B8F200] text-2xl">★★★★★</span>
              </div>
              <p className="text-gray-300 mb-6">
                "Street Meets Future changed my whole wardrobe. Every drop is better than the last. Worth every penny."
              </p>
              <div className="flex items-center">
                <img 
                  src={`${process.env.PUBLIC_URL}/img/testimonial-3.jpg`} 
                  alt="Taylor R." 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold">TAYLOR R.</h4>
                  <p className="text-gray-400 text-sm">Verified Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instagram Feed */}
      <div className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InstagramFeed />
        </div>
      </div>


      {/* Final CTA Section */}
      <div className="relative bg-black py-32 overflow-hidden">
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
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            READY TO JOIN THE
            <span className="block text-[#B8F200] neon-text">REVOLUTION?</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto">
            Step into the future of streetwear. Where every piece tells your story and every story changes the game.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/products"
              className="bg-[#B8F200] text-black px-12 py-6 font-black text-xl hover:bg-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              SHOP THE FUTURE
            </Link>
            <Link
              to="/collections"
              className="bg-transparent border-2 border-white text-white px-12 py-6 font-black text-xl hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              EXPLORE COLLECTIONS
            </Link>
          </div>
        </div>
        </div>
        
    </div>

    
    
  );
};