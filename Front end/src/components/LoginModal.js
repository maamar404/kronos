import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { message } from 'antd'; // Import Ant Design's message component
import { Eye, EyeOff, X } from 'lucide-react'; // Import eye icons and X icon from lucide-react
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';


export const LoginModal = ({ onClose, isOpen }) => {
  const { setUser } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin ? `${API_URL}/login` : `${API_URL}/register`;
      const response = await axios.post(url, formData);

      if (isLogin) {
        // Handle login success
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        if (typeof setUser === 'function') {
          setUser(response.data.user);
        } else {
          console.error('Error: setUser is not a function');
        }
        onClose();
        window.location.reload(); // Ensure user state updates globally
      } else {
        // Handle registration success
        message.success('Registration successful! Please log in.'); // Show success message
        setFormData({ name: '', email: '', password: '' });
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Error:', error);
      // Show warning message for errors
      message.warning(error.response?.data?.error || 'Something went wrong!');
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Animation variants for the modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  // Animation variants for switching between login and register
  const formVariants = {
    hidden: { opacity: 0, x: isLogin ? -50 : 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isLogin ? 50 : -50 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            
            {/* Header with accent using the custom colors */}
            <div className="mb-6">
              <div className="h-1 w-16 bg-gradient-to-r from-[#2F3AE4] to-[#b8f200] rounded-full mb-6"></div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                {isLogin ? 'Welcome back' : 'Create account'}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {isLogin ? 'Sign in to your account' : 'Join our community today'}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                onSubmit={handleSubmit}
                key={isLogin ? 'login' : 'register'}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2F3AE4] focus:border-transparent transition-all duration-200"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required={!isLogin}
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2F3AE4] focus:border-transparent transition-all duration-200"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2F3AE4] focus:border-transparent transition-all duration-200"
                      placeholder="••••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-[#2F3AE4] dark:text-gray-400 dark:hover:text-[#b8f200] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                {isLogin && (
                  <div className="flex justify-end">
                    <Link to="/" className="text-sm text-[#2F3AE4] hover:text-[#2F3AE4]/80 dark:text-[#b8f200] dark:hover:text-[#b8f200]/80 transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                )}
                
                <button
                  type="submit"
                  className="w-full bg-[#2F3AE4] hover:bg-[#2F3AE4]/90 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    {isLogin ? 'Sign in' : 'Create account'}
                  </span>
                  <motion.span 
                    className="ml-2 relative z-10"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 2 }}
                  >
                    →
                  </motion.span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#2F3AE4] to-[#b8f200] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </motion.form>
            </AnimatePresence>

            <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-gray-600 dark:text-gray-400">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-1 font-medium text-[#2F3AE4] hover:text-[#2F3AE4]/80 dark:text-[#b8f200] dark:hover:text-[#b8f200]/80 transition-colors"
                >
                  {isLogin ? 'Create one' : 'Sign in'}
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};