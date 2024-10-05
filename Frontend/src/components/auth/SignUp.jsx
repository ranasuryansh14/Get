import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
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
      <Typography variant="h4" sx={{fontWeight: 500, marginBottom: 3 }}>
        Sign Up
      </Typography>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        margin="normal"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        margin="normal"
        required
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
        required
        type="password"
      />
      <TextField
        fullWidth
        label="Confirm Password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
        margin="normal"
        required
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
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;
