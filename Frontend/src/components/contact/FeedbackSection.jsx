import React from 'react';
import { Box, Typography } from '@mui/material';
import StarRating from './StarRating'; // Adjust the path as needed

const FeedbackSection = () => {
  const handleRatingChange = (newRating) => {
    console.log('New Rating:', newRating);
    // You can handle the rating submission here (e.g., send to backend)
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <Typography variant="h5" gutterBottom>
        Rate Your Experience
      </Typography>
      <StarRating onRatingChange={handleRatingChange} />
    </Box>
  );
};

export default FeedbackSection;
