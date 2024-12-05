import React, { useEffect, useState } from 'react';
import axios from '../../Api';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Modal,
  TextField,
} from '@mui/material';

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false); // For modal
  const [currentNote, setCurrentNote] = useState(null); // Note to be edited
  const username = localStorage.getItem('username');
  const API_URL = 'http://127.0.0.1:8000';

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/notes/user-notes/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    if (username) {
      fetchNotes();
    }
  }, [username]);

  const handleDelete = async (noteId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/notes/${noteId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
    setOpen(true);
  };

  const handleUpdate = async () => {
    if (!currentNote) return;

    try {
      const token = localStorage.getItem('token');
      const { id, title, description, category, price } = currentNote;

      const response = await axios.put(
        `/notes/${id}/`,
        { title, description, category, price },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? response.data : note))
      );

      setOpen(false);
      setCurrentNote(null);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', my: 4, p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        My Uploaded Notes
      </Typography>
      <Grid container spacing={4}>
        {notes.length > 0 ? (
          notes.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  boxShadow: 3,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              >
                {note.image && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={`${API_URL}${note.image}`}
                    alt="Note"
                    sx={{ borderRadius: 1 }}
                  />
                )}
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    color="textPrimary"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    {note.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {note.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}
                  >
                    Category: {note.category}
                  </Typography>
                  <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold' }}>
                    Price: ${note.price}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(note.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(note)}
                  >
                    Edit
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography
            variant="body1"
            color="textSecondary"
            align="center"
            sx={{ width: '100%', mt: 2 }}
          >
            No notes uploaded yet.
          </Typography>
        )}
      </Grid>

      {/* Modal for updating notes */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Note
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            value={currentNote?.title || ''}
            onChange={(e) =>
              setCurrentNote({ ...currentNote, title: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            value={currentNote?.description || ''}
            onChange={(e) =>
              setCurrentNote({ ...currentNote, description: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Category"
            value={currentNote?.category || ''}
            onChange={(e) =>
              setCurrentNote({ ...currentNote, category: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            type="number"
            value={currentNote?.price || ''}
            onChange={(e) =>
              setCurrentNote({ ...currentNote, price: e.target.value })
            }
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default MyNotes;
