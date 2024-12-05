import React from 'react';
import { Box, Typography, Grid, Paper, Avatar, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Testimonials = () => {
  const theme = useTheme();

  const testimonials = [
    {
      name: "Alice",
      feedback: "Great platform! Helped me with my studies.",
      image: "/images/alice.jpg"
    },
    {
      name: "Bob",
      feedback: "Easy to sell my notes and earn some cash!",
      image: "/images/bob.jpg"
    },
    {
      name: "Charlie",
      feedback: "The best way to access study resources quickly.",
      image: "/images/charlie.jpg"
    },
  ];

  return (
    <Box sx={{ padding: 4, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 700, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
        What Our Users Say
      </Typography>
      
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((test, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper sx={{ padding: 4, borderRadius: 3, boxShadow: 3, textAlign: 'center', backgroundColor: '#fff', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: 6 } }}>
              <Avatar sx={{ width: 80, height: 80, margin: '0 auto', marginBottom: 2, border: '4px solid #000233' }} src={test.image} alt={test.name} />
              <Typography variant="h6" sx={{ fontWeight: 600, fontStyle: 'italic', color: theme.palette.primary.main }}>
                "{test.feedback}"
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#444' }}>
                - {test.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;
