import React, { useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export const Checkout = () => {
  const { cartProducts, setClearCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  // Calculate total price
  const total = cartProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate the form
  const validateForm = () => {
    const { name, email, address, city, postalCode, country } = formData;
    if (!name || !email || !address || !city || !postalCode || !country) {
      toast.error('Please fill out all fields.');
      return false;
    }
    return true;
  };

   // Handle payment
   const handlePayment = async () => {
    if (total <= 0 || cartProducts.length === 0) {
      toast.error('Your cart is empty or the total amount is invalid.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true); // Start loading
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(`${API_URL}/create-checkout-session`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ totalAmount: total, items: cartProducts, customer: formData }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { id } = await response.json();
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({ sessionId: id });

      if (result.error) {
        console.error('Payment error:', result.error.message);
        toast.error('Payment failed: ' + result.error.message);
      } else {
        setClearCart(true);
        localStorage.removeItem('cartProducts'); // Clear only cart data
        toast.success('Payment Successful!');
      }
    } catch (error) {
      console.error('Error during payment:', error);
      toast.error('Error during payment: ' + error.message);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with brand styling */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#2F3AE4] to-[#B8F200] bg-clip-text text-transparent mb-4">
            Complete Your Order
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2F3AE4] to-[#B8F200] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary - Enhanced Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#2F3AE4]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-[#2F3AE4] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#2F3AE4]">Order Summary</h2>
            </div>
            
            <div className="space-y-6 max-h-96 overflow-y-auto">
              {cartProducts.map((product) => (
                <div key={`${product.id}-${product.size}`} className="group hover:bg-gray-50 p-4 rounded-xl transition-all duration-200">
                  <div className="flex gap-4">
                    <div className="relative">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200"
                      />
                      <div className="absolute -top-2 -right-2 bg-[#B8F200] text-[#2F3AE4] text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        {product.quantity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-[#2F3AE4] font-bold">${product.price}</span>
                        {product.size && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                            Size: {product.size}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Subtotal: ${(product.price * product.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Section */}
            <div className="border-t border-gray-200 mt-6 pt-6">
              <div className="bg-gradient-to-r from-[#2F3AE4] to-[#B8F200] p-4 rounded-xl">
                <div className="flex justify-between items-center text-white">
                  <span className="text-lg font-semibold">Total Amount</span>
                  <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information Form - Enhanced */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#B8F200]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-[#B8F200] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-[#2F3AE4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#2F3AE4]">Shipping Details</h2>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2F3AE4] mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B8F200] focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2F3AE4] mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B8F200] focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2F3AE4] mb-2">Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B8F200] focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                  placeholder="123 Fashion Street"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2F3AE4] mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B8F200] focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                    placeholder="City"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2F3AE4] mb-2">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B8F200] focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                    placeholder="12345"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2F3AE4] mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#B8F200] focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Country"
                    required
                  />
                </div>
              </div>
            </form>

            {/* Enhanced Payment Button */}
            <div className="mt-8">
              <button
                onClick={handlePayment}
                disabled={isLoading || !validateForm()}
                className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                  !validateForm() 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] text-white shadow-lg hover:shadow-xl active:scale-95'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-6 w-6 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing Your Order...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure Checkout - ${total.toFixed(2)}
                  </div>
                )}
              </button>
              
              {/* Trust indicators */}
              <div className="flex items-center justify-center mt-4 space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secure Payment
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  SSL Protected
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
