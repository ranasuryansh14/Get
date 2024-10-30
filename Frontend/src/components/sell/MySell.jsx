import React, { useState } from 'react';
import {
    Container, Box, Typography, TextField, Button, Select, MenuItem,
    FormControl, InputLabel, FormHelperText, Snackbar
} from '@mui/material';
import { ACCESS_TOKEN } from "../../Constants"; // Ensure this matches with your constants file

const SellNotes = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate inputs
        if (!file || !image) {
            setError('Please upload a PDF file and an image.');
            return;
        }

        if (price <= 0) {
            setError('Price must be a positive number.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('file', file);
        formData.append('image', image);

        const userId = localStorage.getItem('user_id');
        const token = localStorage.getItem(ACCESS_TOKEN); // Retrieve JWT access token
        
        if (!userId) {
            setError('User ID not found in local storage.');
            return;
        }

        if (!token) {
            setError('Token not found in local storage.');
            return;
        }

        formData.append('user', userId); // Attach user ID

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/notes/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`, // Pass token in Authorization header
                },
                body: formData,
            });

            if (response.ok) {
                setSnackbarMessage('Notes uploaded successfully!');
                setSnackbarOpen(true);
                // Reset form fields
                setTitle('');
                setDescription('');
                setPrice('');
                setCategory('');
                setFile(null);
                setImage(null);
                setError('');
            } else {
                const errorData = await response.json();
                setError(errorData?.detail || 'Failed to upload notes. Please try again.');
                console.error('Error response:', errorData);
            }
        } catch (error) {
            console.error('Error uploading notes:', error);
            setError('An error occurred while uploading notes.');
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container sx={{ padding: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Sell Your Notes
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <TextField
                    label="Price"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <FormControl fullWidth margin="normal" required error={Boolean(error)}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setError('');
                        }}
                    >
                        <MenuItem value="Science">Science</MenuItem>
                        <MenuItem value="Mathematics">Mathematics</MenuItem>
                        <MenuItem value="Literature">Literature</MenuItem>
                        <MenuItem value="History">History</MenuItem>
                    </Select>
                    {error && <FormHelperText>{error}</FormHelperText>}
                </FormControl>

                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="subtitle1" component="h2" gutterBottom>
                        Upload PDF
                    </Typography>
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                </Box>

                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="subtitle1" component="h2" gutterBottom>
                        Upload Cover Image
                    </Typography>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </Box>

                <Box sx={{ marginTop: 2 }}>
                    <Button variant="contained" color="primary" type="submit">
                        Upload Notes
                    </Button>
                </Box>
            </form>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </Container>
    );
};

export default SellNotes;
