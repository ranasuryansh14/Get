import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';
import FeedbackSection from './FeedbackSection'
// Styled components for a more polished look
const StyledPaper = styled(Paper)({
  padding: '20px',
  textAlign: 'center',
  borderRadius: '15px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
  },
});

const AboutMe = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>
              Who I Am
            </Typography>
            <Typography variant="body1" paragraph>
              Hi! I’m Suryansh Rana, a third-year undergraduate student pursuing a degree in Computer Science Engineering. I’m passionate about technology and software development, exploring new ideas, and creating innovative solutions.
            </Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>
              What I Do
            </Typography>
            <Typography variant="body1" paragraph>
              I specialize in building web applications using technologies like React for the frontend and Django for the backend. I love tackling challenging projects and learning new concepts in programming and design.
            </Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>
              Why I Made This App
            </Typography>
            <Typography variant="body1" paragraph>
              This app was created to provide a platform for users to buy and sell educational notes efficiently. My goal is to help students access quality resources easily and foster knowledge sharing among peers.
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Thank You for Visiting!
        </Typography>
        <Typography variant="body1" paragraph>
          I appreciate your support, and I hope you find this app helpful. If you have any questions or feedback, feel free to reach out!
        </Typography>
      </Box>
      <center><FeedbackSection/></center>
    </Box>
  );
};

export default AboutMe;
