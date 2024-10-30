import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Star as StarIcon, StarBorder as StarBorderIcon } from '@mui/icons-material';

const StarRating = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (index) => {
    const newRating = index + 1; // Incrementing index to get 1-5 rating
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating); // Call the parent function if provided
    }
  };

  return (
    <Box alignItems="center">
      {Array.from({ length: 5 }).map((_, index) => (
        <IconButton
          key={index}
          onClick={() => handleStarClick(index)}
          sx={{
            padding: 0,
            color: index < rating ? '#FFD700' : '#BDBDBD', // Yellow for filled stars, grey for empty
          }}
        >
          {index < rating ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      ))}
      <Typography variant="body1" sx={{ marginLeft: 2 }}>
        {rating} Star{rating !== 1 ? 's' : ''}
      </Typography>
    </Box>
  );
};

export default StarRating;
