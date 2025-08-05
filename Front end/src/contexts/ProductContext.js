import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Create context
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products`);
      
      // Map MongoDB _id to id for compatibility with existing code
      const formattedProducts = response.data.map(product => ({
        ...product,
        id: product._id // Ensure the MongoDB _id is mapped to the id property
      }));
      
      setProducts(formattedProducts);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // Fetch a single product by ID
  const fetchProductById = useCallback(async (id) => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      
      // Map MongoDB _id to id for compatibility
      const product = {
        ...response.data,
        id: response.data._id
      };
      
      return product;
    } catch (err) {
      console.error(`Error fetching product with ID ${id}:`, err);
      throw new Error('Failed to fetch product details');
    }
  }, [API_URL]);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductContext.Provider 
      value={{ 
        products, 
        loading, 
        error, 
        fetchProducts,
        fetchProductById 
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};