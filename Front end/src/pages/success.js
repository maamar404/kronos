import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { CartContext } from '../contexts/CartContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const Success = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orderId, setOrderId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    const verifyPaymentAndCreateOrder = async () => {
      const urlParams = new URLSearchParams(location.search);
      const sessionId = urlParams.get('session_id');
      
      if (!sessionId) {
        message.error('Invalid session ID');
        setIsLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          message.error('Authentication required');
          navigate('/login');
          return;
        }

        // 1. Verify payment
        const verifyResponse = await fetch(`${API_URL}/verify-payment/${sessionId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!verifyResponse.ok) {
          throw new Error('Failed to verify payment');
        }

        const session = await verifyResponse.json();
        
        if (session.payment_status === 'paid') {
          let orderIdFromResponse = null;
          
          // 2. Create order in database (or get existing order ID)
          try {
            const orderResponse = await fetch(`${API_URL}/create-order`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                items: JSON.parse(session.metadata.items || '[]'),
                totalAmount: session.amount_total / 100,
                customer: {
                  name: session.metadata.name,
                  email: session.metadata.email,
                  address: session.metadata.address,
                  city: session.metadata.city,
                  postalCode: session.metadata.postalCode,
                  country: session.metadata.country
                },
                paymentIntentId: session.payment_intent,
                platform: 'web'
              })
            });

            if (orderResponse.ok) {
              const orderData = await orderResponse.json();
              orderIdFromResponse = orderData.orderId;
            } else if (orderResponse.status === 409) {
              const conflictData = await orderResponse.json();
              orderIdFromResponse = conflictData.orderId;
              console.log('Order already exists, using existing order ID:', conflictData.orderId);
            } else {
              console.warn('Order creation failed, but payment was successful. Status:', orderResponse.status);
              // Continue anyway since payment was successful
            }
          } catch (orderError) {
            console.warn('Order creation error, but payment was successful:', orderError);
            // Continue anyway since payment was successful
          }
          
          // Set order ID if we got one
          if (orderIdFromResponse) {
            setOrderId(orderIdFromResponse);
          }
          
          // 3. Clear cart and show success message
          clearCart();
          message.success('Payment successful! Your order has been processed.');
        } else {
          throw new Error('Payment not completed');
        }
      } catch (error) {
        console.error('Error:', error);
        message.error('Error processing your order: ' + error.message);
        navigate('/cart');
      } finally {
        setIsLoading(false);
      }
    };

    verifyPaymentAndCreateOrder();
  }, [location, navigate, clearCart]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F3AE4] mx-auto"></div>
          <p className="mt-4 text-gray-600">Processing your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been successfully processed.
          </p>
          {orderId && (
            <p className="text-sm text-gray-500 mb-6">
              Order ID: {orderId}
            </p>
          )}
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-[#B8F200] to-[#2F3AE4] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};