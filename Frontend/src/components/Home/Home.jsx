import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

const Home = () => {
    return (
        <Container
            sx={{  display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%', 
                width: '100%',  
                minHeight: '50vh', 
                textAlign: 'center',
                fontFamily:"Poppins",
                color: '#000233',
                
            }}>
            <Box
                component="img"
                src="/images/home.png"
                alt="Notes Buddy"
                sx={{
                    width: '30%',  
                    maxWidth: '600px',  
                    marginBottom: 3,  
                    marginTop:10,
                    borderRadius: 2,  

                }}
            />
            <Typography variant="h2" component="h1" gutterBottom
                sx={{fontWeight:"700"}}>
                Connect, Collaborate, Conquer
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
                Your one-stop platform to buy and sell study notes with ease.
                Join our community of learners and make the most out of your studies!
            </Typography>
        </Container>
    );
};

export default Home;
