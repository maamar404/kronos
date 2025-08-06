import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, User, LogOut, Heart, Trash2, X } from 'lucide-react';
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';
import { LoginModal } from './LoginModal';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { cartProducts } = useContext(CartContext);
  const { user, setUser } = useContext(UserContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsMobileMenuOpen(false);
    setIsMobileUserMenuOpen(false);
  };

  // Handle navigation and close drawers
  const handleNavigateToCart = () => {
    setIsFavoritesDrawerOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileUserMenuOpen(false);
    navigate('/cart');
  };

  const handleNavigateToProducts = () => {
    setIsFavoritesDrawerOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileUserMenuOpen(false);
    navigate('/products');
  };

  const handleMobileNavigation = (path) => {
    setIsMobileMenuOpen(false);
    setIsMobileUserMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <nav className="bg-black shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Left side - Mobile Menu + Logo (responsive) */}
            <div className="flex items-center space-x-3">
              {/* Mobile Menu Button - shows below 1024px */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-[#b8f200] hover:text-white hover:bg-gray-800 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>

              {/* Logo - Hidden on very small screens (below 480px), visible on larger */}
              <Link to="/" className="flex-shrink-0 flex items-center hidden min-[480px]:flex">
                <img className="block h-8 w-auto" src={`${process.env.PUBLIC_URL}/img/logo1.png`} alt="kronos" />
              </Link>
            </div>

            {/* Desktop Navigation - Shows above 1024px */}
            <div className="hidden lg:flex lg:items-center lg:space-x-6">
              <Link to="/" className="text-[#b8f200] hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-[#b8f200] hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Shop
              </Link>
              <Link to="/about" className="text-[#b8f200] hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                About us
              </Link>
              
              {/* Cart Icon */}
              <Link to="/cart" className="relative text-[#b8f200] hover:text-white px-3 py-2 transition-colors">
                <ShoppingBag className="h-6 w-6" />
                {cartProducts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#b8f200] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartProducts.length}
                  </span>
                )}
              </Link>

              {/* Heart Icon for Favorites */}
              <button
                onClick={() => setIsFavoritesDrawerOpen(true)}
                className="relative text-[#b8f200] hover:text-white px-3 py-2 transition-colors"
              >
                <Heart className="h-6 w-6" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#b8f200] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* User Section */}
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/orders" className="text-[#b8f200] hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Order History
                  </Link>
                  <span className="text-[#b8f200] text-sm font-medium">
                    Welcome, {user.name}!
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-[#b8f200] hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    <LogOut className="h-6 w-6" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-[#b8f200] hover:text-white px-3 py-2 rounded-md transition-colors"
                >
                  <User className="h-6 w-6" />
                </button>
              )}
            </div>

            {/* Mobile Right side - Shows below 1024px */}
            <div className="flex items-center space-x-1 lg:hidden">
              
              {/* Cart Icon */}
              <Link to="/cart" className="relative text-[#b8f200] hover:text-white px-2 py-2 transition-colors">
                <ShoppingBag className="h-6 w-6" />
                {cartProducts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#b8f200] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartProducts.length}
                  </span>
                )}
              </Link>

              {/* User Section for Mobile */}
              {user ? (
                <button
                  onClick={() => setIsMobileUserMenuOpen(!isMobileUserMenuOpen)}
                  className="text-[#b8f200] hover:text-white px-2 py-2 rounded-md transition-colors"
                >
                  <User className="h-6 w-6" />
                </button>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-[#b8f200] hover:text-white px-2 py-2 rounded-md transition-colors"
                >
                  <User className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown - Shows below 1024px */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden bg-gray-900 border-t border-gray-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 py-3 space-y-2">
                
                {/* Logo for very small screens (under 480px) */}
                <div className="min-[480px]:hidden flex justify-center py-2 mb-2">
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <img className="h-8 w-auto" src={`${process.env.PUBLIC_URL}/img/logo1.png`} alt="kronos" />
                  </Link>
                </div>
                
                {/* Navigation Links */}
                <button
                  onClick={() => handleMobileNavigation('/')}
                  className="block w-full text-left text-[#b8f200] hover:text-white hover:bg-gray-800 px-3 py-3 rounded-md text-base font-medium transition-colors"
                >
                  Home
                </button>
                
                <button
                  onClick={() => handleMobileNavigation('/products')}
                  className="block w-full text-left text-[#b8f200] hover:text-white hover:bg-gray-800 px-3 py-3 rounded-md text-base font-medium transition-colors"
                >
                  Shop
                </button>
                
                <button
                  onClick={() => handleMobileNavigation('/about')}
                  className="block w-full text-left text-[#b8f200] hover:text-white hover:bg-gray-800 px-3 py-3 rounded-md text-base font-medium transition-colors"
                >
                  About us
                </button>

                {/* Login link for non-authenticated users */}
                {!user && (
                  <button
                    onClick={() => {
                      setIsLoginModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full text-left text-[#b8f200] hover:text-white hover:bg-gray-800 px-3 py-3 rounded-md text-base font-medium transition-colors"
                  >
                    <User className="h-5 w-5 mr-3" />
                    Login
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile User Menu Dropdown - Only for logged in users below 1024px */}
        <AnimatePresence>
          {isMobileUserMenuOpen && user && (
            <motion.div
              className="lg:hidden bg-gray-900 border-t border-gray-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 py-3 space-y-2">
                
                {/* User Welcome */}
                <div className="px-3 py-2">
                  <p className="text-gray-400 text-sm">Welcome,</p>
                  <p className="text-[#b8f200] font-medium">{user.name}!</p>
                </div>
                
                {/* Favorites Link */}
                <button
                  onClick={() => {
                    setIsFavoritesDrawerOpen(true);
                    setIsMobileUserMenuOpen(false);
                  }}
                  className="flex items-center w-full text-left text-[#b8f200] hover:text-white hover:bg-gray-800 px-3 py-3 rounded-md text-base font-medium transition-colors"
                >
                  <Heart className="h-5 w-5 mr-3" />
                  Favorites
                  {favorites.length > 0 && (
                    <span className="ml-auto bg-[#b8f200] text-black text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                      {favorites.length}
                    </span>
                  )}
                </button>
                
                {/* Order History */}
                <button
                  onClick={() => {
                    handleMobileNavigation('/orders');
                    setIsMobileUserMenuOpen(false);
                  }}
                  className="block w-full text-left text-[#b8f200] hover:text-white hover:bg-gray-800 px-3 py-3 rounded-md text-base font-medium transition-colors"
                >
                  Order History
                </button>
                
                {/* Logout */}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileUserMenuOpen(false);
                  }}
                  className="flex items-center w-full text-left text-red-400 hover:text-red-300 hover:bg-gray-800 px-3 py-3 rounded-md text-base font-medium transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

      {/* Enhanced Favorites Drawer */}
      <AnimatePresence>
        {isFavoritesDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFavoritesDrawerOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-gray-900 to-black border-l border-gray-700/50 z-50 overflow-hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Animated Background Effects */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div 
                  className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#B8F200]/5 rounded-full blur-3xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-[#2F3AE4]/5 rounded-full blur-3xl"
                  animate={{ 
                    scale: [1.2, 1, 1.2],
                    opacity: [0.5, 0.3, 0.5]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
              </div>

              {/* Header */}
              <motion.div 
                className="relative z-10 p-6 border-b border-gray-700/50 backdrop-blur-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Heart className="h-6 w-6 text-[#b8f200]" />
                    </motion.div>
                    <h2 className="text-2xl font-black text-white">Your Favorites</h2>
                  </div>
                  
                  <motion.button
                    onClick={() => setIsFavoritesDrawerOpen(false)}
                    className="p-2 hover:bg-gray-800/50 rounded-full transition-colors"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="h-6 w-6 text-gray-400 hover:text-white" />
                  </motion.button>
                </div>
                
                {favorites.length > 0 && (
                  <motion.p 
                    className="text-gray-400 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {favorites.length} item{favorites.length !== 1 ? 's' : ''} saved
                  </motion.p>
                )}
              </motion.div>

              {/* Content */}
              <div className="relative z-10 h-full overflow-y-auto pb-20">
                {favorites.length > 0 ? (
                  <div className="p-6 space-y-4">
                    {favorites.map((product, index) => (
                      <motion.div 
                        key={product.id} 
                        className="group bg-gray-800/30 backdrop-blur-md rounded-2xl p-4 border border-gray-700/30 hover:border-[#b8f200]/30 transition-all duration-300"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <div className="flex items-center gap-4">
                          {/* Product Image */}
                          <Link 
                            to={`/products/${product.id}`} 
                            onClick={() => setIsFavoritesDrawerOpen(false)}
                            className="flex-shrink-0"
                          >
                            <motion.div 
                              className="w-20 h-20 overflow-hidden rounded-xl bg-gray-700"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                onError={(e) => {
                                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23374151'/%3E%3Ctext x='40' y='40' text-anchor='middle' dy='0.3em' fill='%23B8F200' font-size='10'%3E" + product.name + "%3C/text%3E%3C/svg%3E";
                                }}
                              />
                            </motion.div>
                          </Link>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <Link 
                              to={`/products/${product.id}`} 
                              onClick={() => setIsFavoritesDrawerOpen(false)}
                              className="block"
                            >
                              <motion.h3 
                                className="text-white font-bold text-lg mb-1 group-hover:text-[#b8f200] transition-colors duration-300 truncate"
                                whileHover={{ x: 5 }}
                              >
                                {product.name}
                              </motion.h3>
                            </Link>
                            
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl font-black text-[#b8f200]">
                                ${product.price}
                              </span>
                              {product.salePrice && (
                                <span className="text-sm text-gray-400 line-through">
                                  ${product.salePrice}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Remove Button */}
                          <motion.button
                            onClick={() => toggleFavorite(product)}
                            className="p-3 hover:bg-red-500/20 rounded-xl transition-colors duration-200 group/btn"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="h-5 w-5 text-red-400 group-hover/btn:text-red-300" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div 
                    className="flex flex-col items-center justify-center h-full p-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mb-6"
                    >
                      <div className="w-24 h-24 bg-gray-800/50 rounded-2xl flex items-center justify-center border border-gray-700/50">
                        <Heart size={40} className="text-gray-500" />
                      </div>
                    </motion.div>
                    
                    <h3 className="text-2xl font-black text-white mb-4">No Favorites Yet</h3>
                    <p className="text-gray-400 mb-8 max-w-sm leading-relaxed">
                      Start building your wishlist by adding products you love. Your future self will thank you!
                    </p>
                    
                    <button
                      onClick={handleNavigateToProducts}
                      className="bg-[#b8f200] text-black px-8 py-3 font-bold rounded-full hover:bg-white transition-colors duration-300"
                    >
                      Start Shopping
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Footer Actions */}
              {favorites.length > 0 && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent backdrop-blur-md border-t border-gray-700/50 z-20">
                  <div className="flex gap-3">
                    <button
                      onClick={handleNavigateToCart}
                      className="flex-1 bg-gray-800/50 text-white px-6 py-3 font-bold rounded-full hover:bg-gray-700/50 transition-colors duration-300 border border-gray-600/50 flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={18} />
                      View Cart
                    </button>
                    <button
                      onClick={handleNavigateToProducts}
                      className="flex-1 bg-[#b8f200] text-black px-6 py-3 font-bold rounded-full hover:bg-white transition-colors duration-300 flex items-center justify-center"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Custom Styles */}
      <style>{`
        /* Custom scrollbar for drawer */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.1);
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(184, 242, 0, 0.3);
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(184, 242, 0, 0.5);
        }
      `}</style>
    </>
  );
};