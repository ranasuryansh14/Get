import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import { ScreenFitText } from './ScreenFitTest';




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

const Hero = () => {
  return (
    <Container sx={{ padding: 4 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: { xs: 'center', sm: 'left' }, 
        }}
      >
        <Box sx={{ marginLeft: { sm: 4 }, textAlign: 'center', width: '100%' }}> 
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: "700", color: '#000233' }}>
            World-Wide Access
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Your one-stop platform to buy and sell study notes with ease.
            Join our community of learners and make the most out of your studies!
          </Typography>
        </Box>
        <Box
          component="img"
          src="/images/network.png" 
          alt="Notes Buddy"
          sx={{
            width: { xs: '80%', sm: '100%' }, 
            maxWidth: '400px',
            borderRadius: 2,
            marginBottom: { xs: 2, sm: 0 }, 
          }}
        />
      </Box>
    </Container>
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
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: { xs: 'center', sm: 'left' }, 
        }}
      >
        <Box
          component="img"
          src="/images/home.png" 
          alt="Notes Buddy"
          sx={{
            width: { xs: '80%', sm: '100%' },
            maxWidth: '600px',
            borderRadius: 2,
            marginBottom: { xs: 2, sm: 0 }, 
          }}
        />
        <Box sx={{ marginLeft: { sm: 4 }, textAlign: 'center', width: '100%' }}> 
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
      <Hero/>
      <Testimonials />
      <Footer /> 
    </Container>
  );
};

export default Home;
