import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // Replace with actual login logic
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 400,
        margin: 'auto',
        marginTop: 8,
        padding: 4,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Login
      </Typography>
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        type="email"
      />
      <TextField
        fullWidth
        label="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        type="password"
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ marginTop: 3 }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
