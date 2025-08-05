import React, { useState, useContext, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { ProductContext } from '../contexts/ProductContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, X } from 'lucide-react';

export const Products = () => {
  const { products, loading, error } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState(['All']);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = ['All', ...new Set(products.map(product => product.category))];
      setCategories(uniqueCategories);
    }
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Advanced Loading Animation */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <motion.div
              className="absolute inset-0 border-4 border-[#B8F200]/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 border-3 border-[#2F3AE4]/40 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-4 border-2 border-[#B8F200] rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          <motion.h2 
            className="text-3xl font-black text-white mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            LOADING COLLECTION
          </motion.h2>
          <p className="text-gray-400 text-lg">Preparing the future of fashion...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div 
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="text-8xl mb-6"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💥
          </motion.div>
          <h2 className="text-3xl font-black text-white mb-4">System Error</h2>
          <p className="text-xl text-red-400 mb-8">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#B8F200] text-black px-8 py-4 font-black text-lg rounded-full hover:bg-white transition-all duration-300 transform hover:scale-105"
          >
            Reload Collection
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#B8F200]/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#2F3AE4]/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.div 
          className="relative overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Header Content */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#B8F200]/10 backdrop-blur-sm border border-[#B8F200]/20 rounded-full px-6 py-2 mb-6">
                <div className="w-2 h-2 bg-[#B8F200] rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-[#B8F200] uppercase tracking-wider">Product Collection</span>
              </div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-black mb-6 leading-tight"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{
                  background: "linear-gradient(90deg, #ffffff 0%, #B8F200 25%, #ffffff 50%, #2F3AE4 75%, #ffffff 100%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                FUTURE
                <span className="block text-white">COLLECTION</span>
              </motion.h1>
              
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Discover premium streetwear engineered for tomorrow. Where style meets innovation.
              </p>

              {/* Enhanced Search Bar */}
              <motion.div 
                className="relative max-w-2xl mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className={`relative bg-gray-800/50 backdrop-blur-md rounded-2xl border transition-all duration-300 ${
                  isSearchFocused ? 'border-[#B8F200] shadow-lg shadow-[#B8F200]/25' : 'border-gray-700/50'
                }`}>
                  <Search size={20} className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search the future..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full pl-14 pr-6 py-6 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
                  />
                  {searchQuery && (
                    <motion.button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={20} />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Filters and Controls */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col lg:flex-row gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Category Filters */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Filter size={20} className="text-[#B8F200]" />
                Categories
              </h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-[#B8F200] text-black shadow-lg shadow-[#B8F200]/25'
                        : 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:border-[#B8F200]/50 hover:bg-gray-700/50'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-end gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-400 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-800/50 border border-gray-700/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#B8F200] transition-colors cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-800/50 rounded-xl border border-gray-700/50 p-1">
                <motion.button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-[#B8F200] text-black' : 'text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Grid size={20} />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-[#B8F200] text-black' : 'text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <List size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Results Counter */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center justify-between">
              <p className="text-gray-400">
                Showing <span className="text-[#B8F200] font-bold">{sortedProducts.length}</span> products
                {searchQuery && (
                  <span> for "<span className="text-white font-medium">{searchQuery}</span>"</span>
                )}
              </p>
              
              {(searchQuery || selectedCategory !== 'All') && (
                <motion.button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="text-[#B8F200] hover:text-white transition-colors font-medium flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={16} />
                  Clear Filters
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Product Grid */}
          <AnimatePresence mode="wait">
            {sortedProducts.length > 0 ? (
              <motion.div 
                key="products"
                className={`grid gap-8 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1 lg:grid-cols-2'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      delay: index * 0.05,
                      duration: 0.5,
                      ease: "easeOut"
                    }}
                    whileHover={{ y: -5 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                className="text-center py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-8"
                >
                  <div className="w-24 h-24 mx-auto bg-gray-800/50 rounded-2xl flex items-center justify-center border border-gray-700/50">
                    <Search size={40} className="text-gray-500" />
                  </div>
                </motion.div>
                
                <h3 className="text-3xl font-black text-white mb-4">No Products Found</h3>
                <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
                  The future hasn't arrived yet for this search. Try adjusting your filters.
                </p>
                
                <motion.button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="bg-[#B8F200] text-black px-8 py-4 font-black text-lg rounded-full hover:bg-white transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reset Filters
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#B8F200] rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [-20, 20],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};