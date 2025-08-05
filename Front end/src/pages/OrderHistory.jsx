import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const OrderHistory = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
    
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/orders`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
    
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to fetch orders: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'bg-[#B8F200]/20 text-[#B8F200] border-[#B8F200]/40';
      case 'shipped':
        return 'bg-[#2F3AE4]/20 text-[#2F3AE4] border-[#2F3AE4]/40';
      case 'delivered':
        return 'bg-[#B8F200]/20 text-[#B8F200] border-[#B8F200]/40';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/40';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'shipped':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        );
      case 'delivered':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'cancelled':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#2F3AE4] to-[#B8F200] rounded-full flex items-center justify-center shadow-lg shadow-[#2F3AE4]/25">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-gray-400 mb-6">Please log in to view your order history</p>
          <button className="bg-gradient-to-r from-[#2F3AE4] to-[#B8F200] text-black px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-[#2F3AE4]/30 transition-all duration-300 transform hover:scale-105">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="text-center">
              <div className="h-10 bg-gradient-to-r from-[#2F3AE4]/30 to-[#B8F200]/30 rounded-lg w-80 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-800 rounded-lg w-60 mx-auto"></div>
            </div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-900/50 rounded-2xl p-6 space-y-4 border border-gray-800">
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-800 rounded w-32"></div>
                  <div className="h-8 bg-gradient-to-r from-[#2F3AE4]/30 to-[#B8F200]/30 rounded-full w-24"></div>
                </div>
                <div className="h-4 bg-gray-800 rounded w-48"></div>
                <div className="border-t border-gray-800 pt-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-800 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-gray-800 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-800 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#2F3AE4] to-[#B8F200] rounded-full flex items-center justify-center shadow-xl shadow-[#2F3AE4]/30">
            <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">No Orders Yet</h2>
          <p className="text-gray-400 mb-8 text-lg">Your order history will appear here once you make your first purchase</p>
          <button 
            className="bg-gradient-to-r from-[#2F3AE4] to-[#B8F200] text-black px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-[#B8F200]/30 transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate('/products')}
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#2F3AE4] to-[#B8F200] bg-clip-text text-transparent mb-4">
            Order History
          </h1>
          <p className="text-xl text-gray-400">Track all your purchases and deliveries</p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2F3AE4] to-[#B8F200] mx-auto mt-4 rounded-full"></div>
        </div>
        
        {/* Orders */}
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div 
              key={order._id} 
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-[#2F3AE4]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#2F3AE4]/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Order Header */}
              <div className="bg-gradient-to-r from-[#2F3AE4]/10 to-[#B8F200]/10 p-6 border-b border-gray-800">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </h2>
                    <p className="text-gray-300 flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#B8F200]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3M8 7v5a2 2 0 002 2h4a2 2 0 002-2V7" />
                      </svg>
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-sm flex items-center gap-2 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <button
                      onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                      className="text-gray-400 hover:text-[#B8F200] transition-colors p-2 hover:bg-gray-800/50 rounded-lg"
                    >
                      <svg 
                        className={`w-5 h-5 transition-transform duration-300 ${expandedOrder === order._id ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Order Items */}
              <div className={`transition-all duration-500 ease-in-out ${expandedOrder === order._id ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="p-6">
                  <div className="space-y-6">
                    {order.items.map((item, itemIndex) => (
                      <div 
                        key={`${item.id}-${item.size}`} 
                        className="flex flex-col sm:flex-row gap-6 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-[#2F3AE4]/30 transition-all duration-300"
                        style={{ animationDelay: `${itemIndex * 50}ms` }}
                      >
                        <div className="w-full sm:w-24 h-24 bg-gray-700/50 rounded-lg overflow-hidden group border border-gray-600/30">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">{item.name}</h3>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <span className="text-[#B8F200] font-bold">${item.price.toFixed(2)}</span>
                            {item.size && (
                              <span className="text-gray-300 bg-gray-800/50 px-3 py-1 rounded-full border border-gray-600/30">
                                Size: {item.size}
                              </span>
                            )}
                            <span className="text-gray-300 bg-gray-800/50 px-3 py-1 rounded-full border border-gray-600/30">
                              Qty: {item.quantity}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-[#2F3AE4]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="p-6 bg-gray-800/20 border-t border-gray-800">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <svg className="w-5 h-5 text-[#B8F200]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="font-medium">{order.paymentMethod || 'Credit Card'}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#2F3AE4] to-[#B8F200] bg-clip-text text-transparent">
                      ${order.totalAmount.toFixed(2)}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-gray-900/30 rounded-xl border border-gray-800">
          <p className="text-gray-400 mb-2">Need help with an order?</p>
          <button 
          onClick={() => navigate('/contact')}
          className="text-[#B8F200] hover:text-[#2F3AE4] font-medium transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};