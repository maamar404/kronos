import React from 'react';
import { Link } from 'react-router-dom';

export const Cancel = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        {/* Cancel Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 mx-auto text-red-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>

        {/* Cancel Message */}
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Payment Canceled</h1>
        <p className="mt-2 text-gray-600">
          Your payment was not completed. You can retry the payment or return to your cart.
        </p>

        {/* Buttons */}
        <div className="mt-6 space-x-4">
          <Link
            to="/cart"
            className="inline-block bg-[#2F3AE4] text-white px-6 py-2 rounded-md font-medium hover:bg-[#2F3AE4]/95 transition-colors duration-200"
          >
            Return to Cart
          </Link>
          <Link
            to="/Checkout" // Replace with your checkout route
            className="inline-block bg-gray-500 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-600 transition-colors duration-200"
          >
            Retry Payment
          </Link>
        </div>
      </div>
    </div>
  );
};

