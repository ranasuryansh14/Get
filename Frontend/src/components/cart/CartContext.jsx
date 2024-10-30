import React, { createContext, useContext, useState } from 'react';
import Api from '../../Api';
import { ACCESS_TOKEN } from '../../Constants'; 
import axios from 'axios';



const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  const getAuthHeaders = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return token ? { Authorization: `Bearer ${token}` } : null;
  };


  const addToCart = async (item) => {
    try {
        const token = localStorage.getItem('token'); // Retrieve the JWT from local storage
        const response = await axios.post(
            'http://127.0.0.1:8000/cart/',
            { title: item.title, price: item.price },
            {
                headers: {
                    'Authorization': `Bearer ${token}`, // Set the Bearer token here
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log(response.data);
    } catch (error) {
        console.error("Error adding item to cart:", error);
    }
};

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
