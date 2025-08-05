import React, { useEffect, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

export  const Success = () => {
  const { setCartProducts } = useContext(CartContext);

  useEffect(() => {
    // Clear the cart in state
    setCartProducts([]);
    // Remove from local storage
    localStorage.removeItem('cartProducts');
  }, [setCartProducts]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        {/* Success Icon */}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 mx-auto text-green-500 animate-bounce" // Add animate-bounce
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2F3AE4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
            </svg>

        {/* Success Message */}
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Payment Successful</h1>
        <p className="mt-2 text-gray-600">
          Thank you for your purchase. Your order has been placed successfully!
        </p>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="mt-6 inline-block bg-[#2F3AE4] text-white px-6 py-2 rounded-md font-medium hover:bg-[#2F3AE4]/95 transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};
