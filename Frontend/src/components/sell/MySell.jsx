import React, { useState } from 'react';
import {
    Container, Grid, Box, Typography, TextField, Button, Select, MenuItem,
    FormControl, InputLabel, FormHelperText, Snackbar, Card, CardContent
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ACCESS_TOKEN } from "../../Constants";

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
        const token = localStorage.getItem(ACCESS_TOKEN);

        if (!userId || !token) {
            setError('User ID or token not found in local storage.');
            return;
        }

        formData.append('user', userId);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/notes/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                setSnackbarMessage('Notes uploaded successfully!');
                setSnackbarOpen(true);
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
            }
        } catch (error) {
            setError('An error occurred while uploading notes.');
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Grid container spacing={3} alignItems="center">
                {/* Left Side - Image */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'center' }}>
                        <img
                            src="/images/network.png"
                            alt="Sell Notes Illustration"
                            style={{
                                maxWidth: '90%',
                                borderRadius: '10px',
                                boxShadow: '0  rgba(0, 0, 0, 0)',
                            }}
                        />
                    </Box>
                </Grid>

                {/* Right Side - Form */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h4" component="h1" align="center" gutterBottom>
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

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 2 }}>
    <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
            Upload PDF
        </Typography>
        <Button
            variant="outlined"
            fullWidth
            component="label"
            startIcon={<CloudUploadIcon />}
        >
            Choose File
            <input
                type="file"
                accept="application/pdf"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
                required
            />
        </Button>
    </Box>
    <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
            Upload Cover Image
        </Typography>
        <Button
            variant="outlined"
            fullWidth
            component="label"
            startIcon={<CloudUploadIcon />}
        >
            Choose Image
            <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
                required
            />
        </Button>
    </Box>
</Box>


                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                    sx={{ mt: 3 }}
                                >
                                    Upload Notes
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
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
