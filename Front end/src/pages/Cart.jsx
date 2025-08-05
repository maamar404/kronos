import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';
import { LoginModal } from '../components/LoginModal';

export const Cart = () => {
  const { cartProducts, setCartProducts, removeFromCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  // Calculate total price
  const total = cartProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const shippingCost = 0; // Free shipping

  const incrementQuantity = (productId, size) => {
    const updatedCart = cartProducts.map((product) =>
      product.id === productId && product.size === size
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setCartProducts(updatedCart);
    localStorage.setItem('cartProducts', JSON.stringify(updatedCart));
  };

  const decrementQuantity = (productId, size) => {
    const updatedCart = cartProducts.map((product) =>
      product.id === productId && product.size === size
        ? { ...product, quantity: product.quantity > 1 ? product.quantity - 1 : 1 }
        : product
    );
    setCartProducts(updatedCart);
    localStorage.setItem('cartProducts', JSON.stringify(updatedCart));
  };
  
  

  const handleProceedToCheckout = () => {
    if (user) {
      navigate('/checkout');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-16 border border-white/10">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-[#2F3AE4] to-[#b8f200] rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-4xl font-black text-white mb-4 tracking-tight">
                YOUR CART IS <span className="text-[#b8f200]">EMPTY</span>
              </h2>
              <p className="text-slate-300 text-lg max-w-md mx-auto">
                Time to fill it up with some fresh streetwear pieces
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#2F3AE4] to-[#2F3AE4]/80 text-white px-8 py-4 font-bold text-lg rounded-2xl hover:from-[#2F3AE4]/90 hover:to-[#2F3AE4]/70 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              SHOP NOW
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
            YOUR <span className="text-[#b8f200]">CART</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2F3AE4] to-[#b8f200] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="xl:col-span-2 space-y-6">
            {cartProducts.map((product) => (
              <div 
                key={`${product.id}-${product.size}`} 
                className="group bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-[#b8f200]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#b8f200]/10"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <Link to={`/products/${product.id}`} className="relative overflow-hidden rounded-2xl flex-shrink-0">
                    <img
                      onClick={() => navigate(`/products/${product.id}`)}
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-32 h-32 sm:w-40 sm:h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </Link>
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <Link to={`/products/${product.id}`}>
                          <h3 className="text-xl font-black text-white mb-2 tracking-tight hover:text-[#b8f200] transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-4 text-slate-300">
                          <span className="text-2xl font-bold text-[#b8f200]">
                            ${product.price}
                          </span>
                          {product.size && (
                            <span className="bg-[#2F3AE4]/20 text-[#2F3AE4] px-3 py-1 rounded-full text-sm font-bold border border-[#2F3AE4]/30">
                              SIZE {product.size}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(product.id, product.size)}
                        className="p-3 rounded-2xl bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 hover:scale-110"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-white/10 rounded-2xl p-1">
                        <button
                          onClick={() => decrementQuantity(product.id, product.size)}
                          className="p-2 rounded-xl hover:bg-[#b8f200]/20 text-white hover:text-[#b8f200] transition-all duration-300"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center text-white font-bold text-lg">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() => incrementQuantity(product.id, product.size)}
                          className="p-2 rounded-xl hover:bg-[#b8f200]/20 text-white hover:text-[#b8f200] transition-all duration-300"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-slate-400 uppercase tracking-wide">SUBTOTAL</p>
                        <p className="text-xl font-bold text-[#b8f200]">
                          ${(product.price * product.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h2 className="text-2xl font-black text-white mb-8 tracking-tight">
                  ORDER <span className="text-[#b8f200]">SUMMARY</span>
                </h2>
                
                <div className="space-y-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-medium">Subtotal</span>
                    <span className="text-white font-bold text-lg">${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-medium">Shipping</span>
                    <div className="text-right">
                      <span className="text-[#b8f200] font-bold">FREE</span>
                      <p className="text-xs text-slate-400">Always free shipping</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/20 pt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-black text-white">TOTAL</span>
                      <span className="text-2xl font-black text-[#b8f200]">
                        ${(total + shippingCost).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-gradient-to-r from-[#b8f200] to-[#b8f200]/90 text-black px-8 py-4 font-black text-lg rounded-2xl hover:from-[#b8f200]/90 hover:to-[#b8f200]/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform flex items-center justify-center gap-3"
                >
                  PROCEED TO CHECKOUT
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                
                <div className="mt-6 text-center">
                  <p className="text-xs text-slate-400">
                    🔒 Secure checkout • 30-day returns • Free exchanges
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Show LoginModal if the user is not logged in */}
      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} isOpen={isLoginModalOpen} />}
    </div>
  );
}