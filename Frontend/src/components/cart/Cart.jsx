import React, { useState, useEffect } from 'react';
import Api from '../../Api';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { ACCESS_TOKEN } from '../../Constants';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      try {
        const response = await Api.get(`${apiUrl}cart/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data);
      } catch (error) {
        setError('Failed to fetch cart items');
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [apiUrl]);

  if (loading) return <Typography variant="h5">Loading...</Typography>;
  if (error) return <Typography variant="h5" color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        cartItems.map((item) => (
          <Card key={item.id} sx={{ margin: 2 }}>
            <CardContent>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body1">Price: ${item.price}</Typography>
              <Button variant="contained" color="primary">Remove</Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Cart;
