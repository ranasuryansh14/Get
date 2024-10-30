import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../../Api'; // Axios instance with interceptor
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { ACCESS_TOKEN } from "../../Constants"; 

// Access the VITE_API_URL environment variable
const API_URL = import.meta.env.VITE_API_URL;

function MyStore() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]); // State to manage cart items

  // Get user ID and token from local storage
  const userId = localStorage.getItem('user_id'); // Make sure you set this during login
  const token = localStorage.getItem(ACCESS_TOKEN); // JWT token

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(`${API_URL}notes/`); // Use the custom Api instance
        setData(response.data);
      } catch (error) {
        setError('Failed to fetch notes. Please try again later.'); // More user-friendly error message
      } finally {
        setLoading(false); // Ensure loading is set to false in both success and error cases
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = async (title, price) => {
    if (!userId) {
      console.error('User ID is missing');
      return;
    }
    if (!token) {
      console.error('Token is missing');
      return;
    }

    const cartItem = {
      user: userId,  // Send user ID
      title: title,  // Send item title
      price: price,  // Send item price
    };

    // Log the item being added to the cart
    console.log('Adding to cart:', cartItem);

    try {
      const response = await axios.post(`${API_URL}cart/`, cartItem, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token in the Authorization header
        },
      });

      console.log('Item added to cart:', response.data);
      setCart((prevCart) => [...prevCart, response.data]); // Optionally update cart state
    } catch (error) {
      console.error('Failed to add item to cart:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {loading ? (
        <Typography variant="h5">Loading...</Typography>
      ) : error ? (
        <Typography variant="h5" color="error">{error}</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {data.map((item) => (
            <Card key={item.id} sx={{ maxWidth: 345, margin: 2, boxShadow: 3, borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="200"
                width="100%"
                image={item.image ? `${API_URL}${item.image}` : '/path/to/default_image.jpg'} // Update with actual placeholder
                alt={item.title}
                sx={{ borderRadius: '8px 8px 0 0' }} // Rounded corners for the image
              />
              <CardContent sx={{ padding: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {item.title}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  {item.description}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Category: {item.category}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Price: ${item.price}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: 2 }}
                  onClick={() => handleAddToCart(item.title, item.price)} // Add to cart functionality
                >
                  Add to Cart
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: 2 }}
                  onClick={() => handleBuyNow(item.id)} // Handle button click
                >
                  Buy Now
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default MyStore;
