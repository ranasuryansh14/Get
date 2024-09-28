import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';

function MyStore() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/notes/');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {loading ? (
        <Typography variant="h5">Loading...</Typography>
      ) : error ? (
        <Typography variant="h5" color="error">Error: {error}</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {data.map((item) => (
            <Card key={item.id} sx={{ maxWidth: 345, margin: 2, boxShadow: 3, borderRadius: 2 }}>
            <CardMedia
              component="img"
              height="200"
              width="100%"
              image={`http://127.0.0.1:8000${item.image}`}
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
            <Button variant="contained" color="primary" sx={{ margin: 2, borderRadius: 2 }}>
              Buy Now
            </Button>
          </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default MyStore;
