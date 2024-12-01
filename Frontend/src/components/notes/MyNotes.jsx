import React, { useEffect, useState } from 'react';
import axios from '../../Api';
import { Box, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const username = localStorage.getItem("username");
  const API_URL = "http://127.0.0.1:8000"; // Adjust this if your API URL differs

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get(`/notes/user-notes/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    if (username) {
      fetchNotes();
    }
  }, [username]);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', my: 4, p: 2 }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        My Uploaded Notes
      </Typography>
      <Grid container spacing={3}>
        {notes.length > 0 ? (
          notes.map(note => (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {note.image && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${API_URL}${note.image}`} // Prepending base URL
                    alt="Note"
                  />
                )}
                <CardContent>
                  <Typography variant="h6" component="div" color="textPrimary">
                    {note.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    {note.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Category: {note.category}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: ${note.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary" align="center" sx={{ width: '100%', mt: 2 }}>
            No notes uploaded yet.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default MyNotes;
