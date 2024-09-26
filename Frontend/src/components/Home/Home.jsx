import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

const Features = () => {
  return (
    <Box sx={{marginTop:10,padding: 4,border:"1px black solid",borderRadius:"18px", backgroundColor: '#fff',textAlign:"center", fontFamily:"Popins"}}>
      <Typography variant="h4" gutterBottom sx={{fontWeight:"800"}}>
        Features
      </Typography>
      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
        <Box sx={{flex: 1, padding: 2 }}>
          <Typography variant="h6" sx={{fontWeight:"550"}}>Easy to Use</Typography>
          <Typography>Simple interface for quick navigation and transactions.</Typography>
        </Box>
        <Box sx={{ flex: 1, padding: 2 }}>
          <Typography variant="h6"sx={{fontWeight:"550"}}>Secure Payments</Typography>
          <Typography>Safe and secure payment methods for buying and selling notes.</Typography>
        </Box>
        <Box sx={{ flex: 1, padding: 2 }}>
          <Typography variant="h6"sx={{fontWeight:"550"}}>Community Driven</Typography>
          <Typography>Join a community of learners sharing valuable resources.</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const Testimonials = () => {
  const testimonials = [
    { name: "Alice", feedback: "Great platform! Helped me with my studies." },
    { name: "Bob", feedback: "Easy to sell my notes and earn some cash!" },
  ];

  return (
    <Box sx={{textAlign:"center", padding: 4 }}>
      <Typography variant="h4" gutterBottomsx={{fontWeight:"700"}}>
        Testimonials
      </Typography>
      {testimonials.map((test, index) => (
        <Box key={index} sx={{fontStyle:"italic" ,marginBottom: 2 }}>
          <Typography variant="h6">"{test.feedback}"</Typography>
          <Typography variant="subtitle1">- {test.name}</Typography>
        </Box>
      ))}
    </Box>
  );
};

const CallToAction = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: '#000233', color: '#fff', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Ready to get started?
      </Typography>
      <Button variant="contained" color="primary" href="/signup">
        Sign Up Now
      </Button>
    </Box>
  );
};

// Footer Component
const Footer = () => {
  return (
    <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
      <Typography variant="body2">© 2024 Notes Buddy</Typography>
      <Typography variant="body2">Privacy Policy | Terms of Service</Typography>
    </Box>
  );
};

// Home Component
const Home = () => {
  return (
    <Container sx={{ padding: 4 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, // Stack on small screens, row on larger screens
          alignItems: 'center',
          justifyContent: 'center', // Center content horizontally
          textAlign: { xs: 'center', sm: 'left' }, // Center text on small screens, left-align on larger
        }}
      >
        <Box
          component="img"
          src="/images/home.png" // Ensure the path to your image is correct
          alt="Notes Buddy"
          sx={{
            width: { xs: '80%', sm: '100%' }, // Responsive width
            maxWidth: '600px',
            borderRadius: 2,
            marginBottom: { xs: 2, sm: 0 }, // Add bottom margin for small screens
          }}
        />
        <Box sx={{ marginLeft: { sm: 4 }, textAlign: 'center', width: '100%' }}> {/* Center content on small screens */}
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: "700", color: '#000233' }}>
            Connect, Collaborate, Conquer
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Your one-stop platform to buy and sell study notes with ease.
            Join our community of learners and make the most out of your studies!
          </Typography>
        </Box>
      </Box>
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer /> 
    </Container>
  );
};

export default Home;
