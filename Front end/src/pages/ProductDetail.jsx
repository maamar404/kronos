import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Shield, Truck, ArrowLeft, Zap, Plus, Minus } from 'lucide-react';
import { CartContext } from '../contexts/CartContext';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { ProductContext } from '../contexts/ProductContext';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

export const ProductDetail = () => {
  const { id } = useParams();
  const { fetchProductById } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAnimationReady, setIsAnimationReady] = useState(false);
  
  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await fetchProductById(id);
        setProduct(fetchedProduct);
        
        // Set initial selected size if available
        if (fetchedProduct.sizes && fetchedProduct.sizes.length > 0) {
          setSelectedSize(fetchedProduct.sizes[0]);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
        // Small delay to ensure content is ready before animations
        setTimeout(() => setIsAnimationReady(true), 100);
      }
    };
    
    getProduct();
  }, [id, fetchProductById]);
  
  const isFavorite = product ? favorites.some((fav) => fav.id === product.id) : false;

  const handleToggleFavorite = (product) => {
    toggleFavorite(product);
    const customSwal = Swal.mixin({
      customClass: {
        popup: 'bg-gray-900 text-white border border-gray-700',
        title: 'text-white',
        content: 'text-gray-300',
        confirmButton: 'bg-[#B8F200] text-black hover:bg-[#B8F200]/90 border-0'
      },
      background: '#111827',
      color: '#fff'
    });

    if (isFavorite) {
      customSwal.fire({
        title: 'Removed from Favorites!',
        text: `${product.name} has been removed from your favorites.`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } else {
      customSwal.fire({
        title: 'Added to Favorites!',
        text: `${product.name} has been added to your favorites.`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
  };


  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-[#B8F200]/30 border-t-[#B8F200] rounded-full animate-spin"></div>
          </div>
          <p className="text-xl text-white">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-xl text-red-400 mb-4">{error}</p>
          <Link 
            to="/products"
            className="inline-flex items-center gap-2 bg-[#B8F200] text-black px-6 py-3 rounded-full font-bold hover:bg-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-white mb-4">Product not found</p>
          <Link 
            to="/products"
            className="inline-flex items-center gap-2 bg-[#B8F200] text-black px-6 py-3 rounded-full font-bold hover:bg-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-20 w-64 h-64 bg-[#B8F200]/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-80 h-80 bg-[#2F3AE4]/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <motion.nav 
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            to="/products"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#B8F200] transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </Link>
        </motion.nav>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isAnimationReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Main Image */}
            <div className="relative group">
              <motion.div 
                className="aspect-square overflow-hidden rounded-2xl bg-gray-800 border border-gray-700/50"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23374151'/%3E%3Ctext x='200' y='200' text-anchor='middle' dy='0.3em' fill='%23B8F200' font-size='20'%3E" + product.name + "%3C/text%3E%3C/svg%3E";
                  }}
                />
                
                {/* Favorite Button */}
                <motion.button
                  onClick={() => handleToggleFavorite(product)}
                  className="absolute top-6 right-6 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    size={20}
                    className={`transition-colors ${
                      isFavorite ? 'text-red-500 fill-red-500' : 'text-white'
                    }`}
                  />
                </motion.button>

                {/* Product Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  {product.isNew && (
                    <motion.span 
                      className="bg-[#B8F200] text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      New Drop
                    </motion.span>
                  )}
                  {product.salePrice && (
                    <motion.span 
                      className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      Sale
                    </motion.span>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Product Info Section */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={isAnimationReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isAnimationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#B8F200]/10 border border-[#B8F200]/20 rounded-full text-sm font-medium text-[#B8F200] uppercase tracking-wider">
                <Zap size={14} />
                {product.category || 'New Collection'}
              </span>
            </motion.div>
            
            {/* Product Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isAnimationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                {product.description || 'Premium streetwear piece designed for the future.'}
              </p>
            </motion.div>
            
            {/* Price Section */}
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isAnimationReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.6 }}
            >
              {product.salePrice ? (
                <>
                  <span className="text-4xl font-black text-[#B8F200]">
                    ${product.salePrice}
                  </span>
                  <span className="text-2xl text-gray-400 line-through">
                    ${product.price}
                  </span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                  </span>
                </>
              ) : (
                <span className="text-4xl font-black text-white">
                  ${product.price}
                </span>
              )}
            </motion.div>

            {/* Stock Status */}
            <motion.div 
              className="p-4 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={isAnimationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7 }}
            >
              {product.stock > 0 ? (
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-[#B8F200]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-white font-medium">
                    In Stock - {product.stock} available
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-white font-medium">Temporarily Out of Stock</span>
                </div>
              )}
            </motion.div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isAnimationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Select Size</h3>
                  <Link 
                    to="/sizeguide" 
                    className="text-[#B8F200] hover:text-white transition-colors text-sm font-medium flex items-center gap-1"
                  >
                    Size Guide →
                  </Link>
                </div>
                <div className="grid grid-cols-8 gap-3">
                  {product.sizes.map((size, index) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`aspect-square rounded-xl border-2 font-bold text-lg transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-[#B8F200] text-black border-[#B8F200]'
                          : 'bg-gray-800/50 text-white border-gray-600 hover:border-[#B8F200] hover:bg-gray-700/50'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isAnimationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.9 + index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Quantity Selector */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isAnimationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.0 }}
            >
              <h3 className="text-lg font-bold text-white">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-800/50 rounded-xl border border-gray-700/50">
                  <motion.button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-white hover:text-[#B8F200] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Minus size={18} />
                  </motion.button>
                  <span className="w-16 text-center text-white font-bold">{quantity}</span>
                  <motion.button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-white hover:text-[#B8F200] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Plus size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={() => addToCart({ ...product, size: selectedSize })}
              disabled={!selectedSize || product.stock === 0}
              className="w-full bg-[#B8F200] text-black py-4 px-8 rounded-xl font-black text-lg uppercase tracking-wider hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isAnimationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingCart size={20} />
              Add to Cart - ${((product.salePrice || product.price) * quantity).toFixed(2)}
            </motion.button>

            {/* Features */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isAnimationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.2 }}
            >
              {[
                { icon: Shield, text: "Premium Quality" },
                { icon: Truck, text: "Free Shipping" },
                { icon: Star, text: "Eco-Friendly" }
              ].map(({ icon: Icon, text }, index) => (
                <motion.div 
                  key={text}
                  className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-xl border border-gray-700/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isAnimationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Icon size={20} className="text-[#B8F200]" />
                  <span className="text-sm text-gray-300">{text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Product Details */}
            <motion.div 
              className="space-y-6 pt-8 border-t border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={isAnimationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.4 }}
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Product Details</h3>
                <ul className="space-y-3 text-gray-300">
                  {[
                    "Premium quality fabric for maximum comfort and durability",
                    "Designed for perfect fit and contemporary streetwear style",
                    "Eco-friendly materials and sustainable production methods",
                    "Machine washable with care instructions included"
                  ].map((detail, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isAnimationReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 1.5 + index * 0.1 }}
                    >
                      <span className="w-2 h-2 bg-[#B8F200] rounded-full mt-2 flex-shrink-0"></span>
                      <span>{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <motion.div 
                className="pt-6 border-t border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={isAnimationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 1.8 }}
              >
                <Link 
                  to="/shipping" 
                  className="text-lg font-semibold text-[#B8F200] hover:text-white transition-colors flex items-center gap-2"
                >
                  Shipping & Returns
                  →
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};