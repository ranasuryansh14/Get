import React, { useState, useEffect } from 'react';
import Api from '../../Api';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
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

        // Assuming the cartItems response contains the note ids
        const cartData = await Promise.all(
          response.data.map(async (item) => {
            // Fetch the note title using note id
            const noteResponse = await Api.get(`${apiUrl}notes/${item.note}/`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            return { ...item, title: noteResponse.data.title }; // Add title to cart item
          })
        );

        setCartItems(cartData);
      } catch (error) {
        setError('Failed to fetch cart items');
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [apiUrl]);

  const handleRemove = async (itemId) => {
    if (!itemId) {
      console.error('Item ID is missing');
      alert('Item ID is missing');
      return;
    }

    const token = localStorage.getItem(ACCESS_TOKEN);
    try {
      await Api.delete(`${apiUrl}cart/${itemId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove the item from the state
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Failed to remove item:', error);
      alert('Failed to remove item. Please try again.');
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + (parseFloat(item.price) || 0), 0)
      .toFixed(2); // Ensure we add a fallback for non-numeric prices
  };

  if (loading) return <Typography variant="h5">Loading...</Typography>;
  if (error) return <Typography variant="h5" color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="cart items table">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell> {/* Now using title */}
                    <TableCell align="right">${(parseFloat(item.price) || 0).toFixed(2)}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6">Total: ${calculateTotal()}</Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={() => alert('Proceeding to checkout...')}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;
