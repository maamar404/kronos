import { createContext, useState, useEffect } from 'react';
import { message } from 'antd';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cartProducts");
    if (savedCart) {
      try {
        setCartProducts(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem("cartProducts");
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartProducts.length > 0) {
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    } else {
      localStorage.removeItem("cartProducts");
    }
  }, [cartProducts]);

  const clearCart = () => {
    setCartProducts([]);
    message.success('Cart cleared successfully');
  };

  const addToCart = (product) => {
    const existingProductIndex = cartProducts.findIndex(
      (p) => p.id === product.id && p.size === product.size
    );

    if (existingProductIndex !== -1) {
      const updatedCart = [...cartProducts];
      updatedCart[existingProductIndex].quantity += 1;
      setCartProducts(updatedCart);

      message.info({
        content: (
          <span>
            <strong>{product.name}</strong> quantity updated to {updatedCart[existingProductIndex].quantity}
          </span>
        ),
        duration: 2,
        style: {
          marginTop: '4rem',
        },
      });
    } else {
      const updatedCart = [...cartProducts, { ...product, quantity: 1 }];
      setCartProducts(updatedCart);

      message.success({
        content: (
          <span>
            <strong>{product.name}</strong> added to your cart!
          </span>
        ),
        duration: 2,
        style: {
          marginTop: '4rem',
        },
      });
    }
  };

  const removeFromCart = (productId, size) => {
    const productToRemove = cartProducts.find(
      (product) => product.id === productId && product.size === size
    );
    
    const updatedCart = cartProducts.filter(
      (product) => !(product.id === productId && product.size === size)
    );
    setCartProducts(updatedCart);

    message.warning({
      content: (
        <span>
          <strong>{productToRemove?.name}</strong> removed from your cart
        </span>
      ),
      duration: 2,
      style: {
        marginTop: '4rem',
      },
    });
  };

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addToCart, removeFromCart, clearCart, }}>
      {children}
    </CartContext.Provider>
  );
};