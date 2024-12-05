import React from 'react';
import Testimonials from './Testimonials';
import { Container, Typography, Box, Button, Grid, Card, CardContent } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import { ScreenFitText } from './ScreenFitTest';

// Features Section
const Features = () => {
  return (
    <Box sx={{ marginTop: 10, padding: 4, border: "1px solid #ddd", borderRadius: "18px", backgroundColor: '#fff', textAlign: "center", fontFamily: "Poppins" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "800", fontSize: { xs: '1.5rem', sm: '2rem' } }}>
        Features
      </Typography>
      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={2}>
        <Box sx={{ flex: 1, padding: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "550" }}>Easy to Use</Typography>
          <Typography variant="body2">Simple interface for quick navigation and transactions.</Typography>
        </Box>
        <Box sx={{ flex: 1, padding: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "550" }}>Secure Payments</Typography>
          <Typography variant="body2">Safe and secure payment methods for buying and selling notes.</Typography>
        </Box>
        <Box sx={{ flex: 1, padding: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "550" }}>Community Driven</Typography>
          <Typography variant="body2">Join a community of learners sharing valuable resources.</Typography>
        </Box>
      </Box>
    </Box>
  );
};

// Testimonials Section


// About Us Section
const AboutUs = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', padding: 4, borderRadius: 2, textAlign: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: "800", fontSize: { xs: '1.5rem', sm: '2rem' } }}>
        About Us
      </Typography>
      <Typography variant="h6" sx={{ marginTop: 2, fontWeight: "500" }}>
        We are a team of passionate learners dedicated to creating an easy-to-use platform to connect students globally.
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Join our growing community of students and make your learning journey easier by sharing and accessing valuable study notes!
      </Typography>
    </Box>
  );
};

// Pricing Section
const Pricing = () => {
  return (
    <Box sx={{ padding: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: "700", fontSize: { xs: '1.5rem', sm: '2rem' } }}>
        Membership Plans
      </Typography>
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: "600" }}>Basic</Typography>
              <Typography variant="h6" sx={{ fontWeight: "400" }}>$5/month</Typography>
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Access basic study notes and collaborate with others.
              </Typography>
              <Button variant="contained" sx={{ marginTop: 3, backgroundColor: '#000233' }}>
                Choose Plan
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: "600" }}>Pro</Typography>
              <Typography variant="h6" sx={{ fontWeight: "400" }}>$15/month</Typography>
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Get access to premium notes, earn commissions, and more!
              </Typography>
              <Button variant="contained" sx={{ marginTop: 3, backgroundColor: '#000233' }}>
                Choose Plan
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: "600" }}>Enterprise</Typography>
              <Typography variant="h6" sx={{ fontWeight: "400" }}>$50/month</Typography>
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Special pricing for schools and universities, including custom features.
              </Typography>
              <Button variant="contained" sx={{ marginTop: 3, backgroundColor: '#000233' }}>
                Choose Plan
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

// Hero Section
const Hero = () => {
  return (
    <Container sx={{ padding: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'center', textAlign: { xs: 'center', sm: 'left' }, gap: 2 }}>
        <Box sx={{ marginLeft: { sm: 4 }, textAlign: 'center', width: '100%' }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: "700", color: '#000233', fontSize: { xs: '2rem', sm: '3rem' } }}>
            World-Wide Access
          </Typography>
          <Typography variant="h5" component="p" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
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

// Footer Section
const Footer = () => {
  return (
    <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
      <Typography variant="body2">© 2024 Notes Buddy</Typography>
      <Typography variant="body2">Privacy Policy | Terms of Service</Typography>
    </Box>
  );
};

// Main Home Component
const Home = () => {
  return (
    <Container sx={{ padding: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'center', textAlign: { xs: 'center', sm: 'left' }, gap: 2 }}>
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
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: "700", color: '#000233', fontSize: { xs: '2rem', sm: '3rem' } }}>
            Welcome to Notes Buddy!
          </Typography>
          <Typography variant="h5" component="p" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            The easiest way to buy and sell study notes. Join our community and start learning better!
          </Typography>
          <Button variant="contained" sx={{ marginTop: 2, backgroundColor: '#000233' }}>
            Get Started
          </Button>
        </Box>
      </Box>
      <Hero />
      <Testimonials />
      <Features />
      <Pricing />
      <AboutUs />
      <Footer />

    </Container>
  );
};

export default Home;
