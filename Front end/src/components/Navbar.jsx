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
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Handle navigation and close drawer
  const handleNavigateToCart = () => {
    setIsFavoritesDrawerOpen(false);
    navigate('/cart');
  };

  const handleNavigateToProducts = () => {
    setIsFavoritesDrawerOpen(false);

  };

  return (
    <>
      {/* Your Original Navbar - Unchanged */}
      <nav className="bg-black shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <img className="block h-8 w-auto" src={`${process.env.PUBLIC_URL}/img/logo1.png`} alt="kronos" />
              </Link>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
              <Link to="/" className="text-[#b8f200] hover:text-[#b8f200] px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/products" className="text-[#b8f200] hover:text-[#b8f200] px-3 py-2 rounded-md text-sm font-medium">
                Shop
              </Link>
              <Link to="/about" className="text-[#b8f200] hover:text-[#b8f200] px-3 py-2 rounded-md text-sm font-medium">
                About us
              </Link>
              {/* Cart Icon */}
              <Link to="/cart" className="relative text-[#b8f200] hover:text-[#b8f200] px-3 py-2">
                <ShoppingBag className="h-6 w-6" />
                {cartProducts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#b8f200] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartProducts.length}
                  </span>
                )}
              </Link>

              {/* Heart Icon for Favorites */}
              <button
                onClick={() => setIsFavoritesDrawerOpen(true)}
                className="relative text-[#b8f200] hover:text-[#b8f200] px-3 py-2"
              >
                <Heart className="h-6 w-6" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#b8f200] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* Conditional rendering for user login/logout */}
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/orders" className="text-[#b8f200] hover:text-[#b8f200] px-3 py-2 rounded-md text-sm font-medium">
                    Order History
                  </Link>
                  <span className="text-[#b8f200] text-sm font-medium">
                    Welcome, {user.name}!
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-[#b8f200] hover:text-[#b8f200] px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <LogOut className="h-6 w-6" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-[#b8f200] hover:text-[#b8f200] px-3 py-2 rounded-md text-sm font-medium"
                >
                  <User className="h-6 w-6" />
                </button>
              )}
            </div>

            <div className="sm:hidden flex items-center">
              <button className="p-2">
                <Menu className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
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
                      className="flex-1 bg-gray-800/50 text-white px-6 py-3 font-bold rounded-full hover:bg-gray-700/50 transition-colors duration-300 border border-gray-600/50 flex items-center justify-center gap-2 cursor-pointer relative z-30"
                      style={{ pointerEvents: 'auto' }}
                    >
                      <ShoppingBag size={18} />
                      View Cart
                    </button>
                    <button
                      onClick={handleNavigateToProducts}
                      className="flex-1 bg-[#b8f200] text-black px-6 py-3 font-bold rounded-full hover:bg-white transition-colors duration-300 flex items-center justify-center cursor-pointer relative z-30"
                      style={{ pointerEvents: 'auto' }}
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