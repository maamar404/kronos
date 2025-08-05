import { createContext, useState } from 'react';
import { message } from 'antd';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState(
    JSON.parse(localStorage.getItem("cartProducts")) || []
  );

  const clearCart = () => {
    setCartProducts([]);
    localStorage.removeItem("cartProducts");
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
      localStorage.setItem("cartProducts", JSON.stringify(updatedCart));

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
      localStorage.setItem("cartProducts", JSON.stringify(updatedCart));

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
    localStorage.setItem("cartProducts", JSON.stringify(updatedCart));

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
    <CartContext.Provider value={{ cartProducts, setCartProducts, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};