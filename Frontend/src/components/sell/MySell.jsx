import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
const SellNotes = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null); 
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file || !image) {
            setError('Please upload a PDF file and an image.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('file', file);
        formData.append('image', image); 

        // Send data to the backend 
        try {
            const response = await fetch('http://127.0.0.1:8000/notes/', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                // Handle successful upload
                alert('Notes uploaded successfully!');
                // Optionally reset the form
                setTitle('');
                setDescription('');
                setPrice('');
                setCategory('');
                setFile(null);
                setImage(null); 
                setError('');
            } else {
                // Handle error response
                alert('Failed to upload notes.');
            }
        } catch (error) {
            console.error('Error uploading notes:', error);
            alert('An error occurred while uploading notes.');
        }
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
                        <MenuItem value="History">Others</MenuItem>
                        
                    </Select>
                    {error && <FormHelperText>{error}</FormHelperText>}
                </FormControl>

                {/* PDF file upload */}
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

                {/* Image file upload */}
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="subtitle1" component="h2" gutterBottom>
                        Upload Cover Image
                    </Typography>
                    <input
                        type="file"
                        accept="image/*" // Accepts any image type
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
        </Container>
    );
};

export default SellNotes;
