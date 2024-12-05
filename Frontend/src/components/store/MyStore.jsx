import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../../Api';
import { Card, CardMedia, CardContent, Typography, Button, Box, Grid, TextField } from '@mui/material';
import { ACCESS_TOKEN } from "../../Constants";

const API_URL = import.meta.env.VITE_API_URL;

function MyStore() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const userId = localStorage.getItem('user_id');
  const token = localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(`${API_URL}notes/`);
        setData(response.data);
      } catch (error) {
        setError('Failed to fetch notes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = async (noteId, noteName, price) => {
    if (!userId || !token) return;

    const cartItem = {
      user: userId,
      note: noteId,
      name: noteName,
      price: price,
      quantity: 1,
    };

    try {
      const response = await axios.post(`${API_URL}cart/`, cartItem, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCart((prevCart) => [...prevCart, response.data]);
    } catch (error) {
      console.error('Failed to add item to cart:', error.response ? error.response.data : error.message);
    }
  };

  const handleBuyNow = (noteId) => {
    console.log('Buy Now clicked for Note ID:', noteId);
    // Implement Buy Now logic here
  };

  // Filter data based on the search query
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', my: 4, p: 2 }}>
      {loading ? (
        <Typography variant="h5" align="center">Loading...</Typography>
      ) : error ? (
        <Typography variant="h5" color="error" align="center">{error}</Typography>
      ) : (
        <>
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            Explore Notes
          </Typography>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
            <TextField
              variant="outlined"
              placeholder="Search by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: '100%', maxWidth: 500 }}
            />
          </Box>
          <Grid container spacing={4}>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      boxShadow: 3,
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'scale(1.03)' },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={item.image ? `${API_URL}${item.image}` : '/path/to/default_image.jpg'}
                      alt={item.title}
                      sx={{ borderRadius: '8px 8px 0 0' }}
                    />
                    <CardContent sx={{ padding: 2 }}>
                      <Typography
                        variant="h6"
                        component="div"
                        color="textPrimary"
                        gutterBottom
                        sx={{ fontWeight: 'bold' }}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        {item.description}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        Category: {item.category}
                      </Typography>
                      <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold' }}>
                        Price: ${item.price}
                      </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ borderRadius: 2 }}
                        onClick={() => handleAddToCart(item.id, item.title, item.price)}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ borderRadius: 2 }}
                        onClick={() => handleBuyNow(item.id)}
                      >
                        Buy Now
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="h6" align="center" color="textSecondary" sx={{ width: '100%', mt: 4 }}>
                No notes found for your search.
              </Typography>
            )}
          </Grid>
        </>
      )}
    </Box>
  );
}

export default MyStore;
