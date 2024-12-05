import React, { useState, useEffect } from "react";
import Api from "../../Api";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Grid,
} from "@mui/material";
import { ACCESS_TOKEN } from "../../Constants";

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

        const cartData = await Promise.all(
          response.data.map(async (item) => {
            const noteResponse = await Api.get(`${apiUrl}notes/${item.note}/`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            return { ...item, title: noteResponse.data.title };
          })
        );

        setCartItems(cartData);
      } catch (error) {
        setError("Failed to fetch cart items");
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [apiUrl]);

  const handleRemove = async (itemId) => {
    if (!itemId) {
      console.error("Item ID is missing");
      alert("Item ID is missing");
      return;
    }

    const token = localStorage.getItem(ACCESS_TOKEN);
    try {
      await Api.delete(`${apiUrl}cart/${itemId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Failed to remove item:", error);
      alert("Failed to remove item. Please try again.");
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + (parseFloat(item.price) || 0), 0)
      .toFixed(2);
  };

  if (loading) return <Typography variant="h5" align="center">Loading...</Typography>;
  if (error) return <Typography variant="h5" color="error" align="center">{error}</Typography>;

  return (
    <Box sx={{ padding: 4, maxWidth: 1200, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom align="center">Your Cart</Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center">Your cart is empty.</Typography>
      ) : (
        <>
          <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="cart items table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Item</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell align="right">${(parseFloat(item.price) || 0).toFixed(2)}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemove(item.id)}
                        sx={{ borderRadius: 20 }}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ marginY: 3 }} />

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Total: ${calculateTotal()}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => alert("Proceeding to checkout...")}
              sx={{ paddingX: 4, paddingY: 1, borderRadius: 50 }}
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
