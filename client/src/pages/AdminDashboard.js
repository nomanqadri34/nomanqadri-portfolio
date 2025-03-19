import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import RichTextEditor from '../components/RichTextEditor';
import {
  Box,
  Button,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Snackbar,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    status: 'draft',
    featuredImage: '',
    authorName: '',
    authorImage: '',
    category: 'Web Development',
  });
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleImageUpload = async (file, type) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showSnackbar('Please upload an image file', 'error');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showSnackbar('Image size should be less than 5MB', 'error');
      return;
    }

    setImageUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default'); // Replace with your Cloudinary upload preset

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dzhypofiv/image/upload',
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`Upload progress: ${progress}%`);
          },
        }
      );

      if (type === 'featured') {
        setFormData(prev => ({ ...prev, featuredImage: response.data.secure_url }));
        showSnackbar('Featured image uploaded successfully');
      } else if (type === 'author') {
        setFormData(prev => ({ ...prev, authorImage: response.data.secure_url }));
        showSnackbar('Author image uploaded successfully');
      }
    } catch (error) {
      showSnackbar(error.response?.data?.message || 'Error uploading image', 'error');
    } finally {
      setImageUploading(false);
    }
  };

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://alqadridev.onrender.com/api/blogs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(response.data);
    } catch (error) {
      showSnackbar(error.response?.data?.message || 'Error fetching blogs', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleOpen = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title,
        content: blog.content,
        tags: blog.tags.join(', '),
        status: blog.status,
        featuredImage: blog.featuredImage || '',
        authorName: blog.authorName || '',
        authorImage: blog.authorImage || '',
        category: blog.category || 'Web Development',
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: '',
        content: '',
        tags: '',
        status: 'draft',
        featuredImage: '',
        authorName: '',
        authorImage: '',
        category: 'Web Development',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingBlog(null);
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      showSnackbar('Title is required', 'error');
      return false;
    }
    if (!formData.content.trim()) {
      showSnackbar('Content is required', 'error');
      return false;
    }
    if (!formData.authorName.trim()) {
      showSnackbar('Author name is required', 'error');
      return false;
    }
    if (!formData.authorImage) {
      showSnackbar('Author image is required', 'error');
      return false;
    }
    if (!formData.featuredImage) {
      showSnackbar('Featured image is required', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      };

      if (editingBlog) {
        await axios.put(
          `https://alqadridev.onrender.com/api/blogs/${editingBlog._id}`,
          blogData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        showSnackbar('Blog updated successfully');
      } else {
        await axios.post(
          'https://alqadridev.onrender.com/api/blogs',
          blogData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        showSnackbar('Blog created successfully');
      }

      handleClose();
      fetchBlogs();
    } catch (error) {
      showSnackbar(error.response?.data?.message || 'Error saving blog', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          showSnackbar('Authentication required. Please login again.', 'error');
          navigate('/login');
          return;
        }

        // Make the delete request to your API
        await axios.delete(`https://alqadridev.onrender.com/api/blogs/${id}`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // Update the blogs state by filtering out the deleted blog
        setBlogs(currentBlogs => currentBlogs.filter(blog => blog._id !== id));
        showSnackbar('Blog deleted successfully');
        
      } catch (error) {
        console.error('Delete error:', error);
        if (error.response) {
          showSnackbar(error.response.data.message || 'Error deleting blog', 'error');
        } else if (error.request) {
          showSnackbar('Network error. Please check your connection.', 'error');
        } else {
          showSnackbar('An unexpected error occurred', 'error');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f7fa',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 2, sm: 3 },
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' }, gap: 2, mb: 4 }}>
            <Typography 
              variant="h4" 
              component="h1"
              sx={{
                fontWeight: 700,
                color: '#1a237e',
                fontSize: { xs: '1.75rem', sm: '2.125rem' }
              }}
            >
              Blog Management
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpen()}
                disabled={loading}
                sx={{
                  backgroundColor: '#1a237e',
                  '&:hover': {
                    backgroundColor: '#0d47a1',
                  },
                  px: 3,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                New Blog
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/login')}
                sx={{
                  borderColor: '#1a237e',
                  color: '#1a237e',
                  '&:hover': {
                    borderColor: '#0d47a1',
                    backgroundColor: 'rgba(13, 71, 161, 0.04)'
                  },
                  px: 3,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>

          {/* Blogs Table */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress sx={{ color: '#1a237e' }} />
            </Box>
          ) : (
            <TableContainer 
              component={Paper} 
              sx={{ 
                mb: 4,
                boxShadow: 'none',
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f7fa' }}>
                    <TableCell sx={{ fontWeight: 600, color: '#1a237e' }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#1a237e' }}>Author</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#1a237e' }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#1a237e' }}>Status</TableCell>
                    <TableCell sx={{ width: '100px', fontWeight: 600, color: '#1a237e' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow 
                      key={blog._id}
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: 'rgba(0, 0, 0, 0.02)',
                          transition: 'background-color 0.2s ease-in-out'
                        }
                      }}
                    >
                      <TableCell sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {blog.title}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar 
                            src={blog.authorImage} 
                            alt={blog.authorName}
                            sx={{ 
                              width: 32, 
                              height: 32,
                              border: '2px solid #fff',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {blog.authorName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={blog.category}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(25, 118, 210, 0.08)',
                            color: '#1976d2',
                            fontWeight: 500
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={blog.status}
                          color={blog.status === 'published' ? 'success' : 'warning'}
                          size="small"
                          sx={{
                            fontWeight: 500,
                            textTransform: 'capitalize',
                            minWidth: '90px',
                            justifyContent: 'center'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton 
                            onClick={() => handleOpen(blog)}
                            size="small"
                            sx={{
                              color: '#1976d2',
                              '&:hover': {
                                backgroundColor: 'rgba(25, 118, 210, 0.08)'
                              }
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            onClick={() => handleDelete(blog._id)}
                            size="small"
                            sx={{
                              color: '#d32f2f',
                              '&:hover': {
                                backgroundColor: 'rgba(211, 47, 47, 0.08)'
                              }
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Dialog for Create/Edit Blog */}
          <Dialog 
            open={open} 
            onClose={handleClose} 
            maxWidth="md" 
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            <DialogTitle 
              sx={{ 
                borderBottom: '1px solid #e0e0e0',
                px: 3,
                py: 2,
                backgroundColor: '#f5f7fa'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a237e' }}>
                {editingBlog ? 'Edit Blog' : 'Create New Blog'}
              </Typography>
            </DialogTitle>
            <DialogContent sx={{ p: 3 }}>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Author Name"
                      value={formData.authorName}
                      onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={formData.authorImage}
                        alt={formData.authorName}
                        sx={{ width: 56, height: 56 }}
                      />
                      <Button
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        disabled={imageUploading}
                      >
                        Upload Author Image
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e.target.files[0], 'author')}
                        />
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {formData.featuredImage && (
                        <Box
                          component="img"
                          src={formData.featuredImage}
                          alt="Featured"
                          sx={{ width: 200, height: 120, objectFit: 'cover', borderRadius: 1 }}
                        />
                      )}
                      <Button
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        disabled={imageUploading}
                      >
                        Upload Featured Image
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e.target.files[0], 'featured')}
                        />
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        label="Category"
                        disabled={loading}
                      >
                        <MenuItem value="Web Development">Web Development</MenuItem>
                        <MenuItem value="App Development">App Development</MenuItem>
                        <MenuItem value="AI">AI</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        label="Status"
                        disabled={loading}
                      >
                        <MenuItem value="draft">Draft</MenuItem>
                        <MenuItem value="published">Published</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Tags (comma-separated)"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      Content
                    </Typography>
                    <Box 
                      sx={{ 
                        '.rich-text-editor': {
                          '& .ql-container': {
                            height: '250px',
                            fontSize: '1rem',
                            lineHeight: '1.5',
                            border: '1px solid #e0e0e0',
                            borderTop: 'none',
                            borderRadius: '0 0 4px 4px'
                          },
                          '& .ql-editor': {
                            minHeight: '200px'
                          },
                          '& .ql-toolbar': {
                            border: '1px solid #e0e0e0',
                            borderRadius: '4px 4px 0 0',
                            backgroundColor: '#f8f9fa'
                          },
                          '& .ql-editor.ql-blank::before': {
                            color: '#999',
                            fontStyle: 'normal'
                          }
                        }
                      }}
                    >
                      <RichTextEditor
                        ref={editorRef}
                        value={formData.content}
                        onChange={(value) => setFormData({ ...formData, content: value })}
                        placeholder="Write your blog content here..."
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid #e0e0e0' }}>
              <Button 
                onClick={handleClose} 
                disabled={loading}
                sx={{
                  color: '#666',
                  textTransform: 'none',
                  fontWeight: 500
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                variant="contained" 
                disabled={loading}
                sx={{
                  backgroundColor: '#1a237e',
                  '&:hover': {
                    backgroundColor: '#0d47a1'
                  },
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  editingBlog ? 'Update' : 'Create'
                )}
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar 
            open={snackbar.open} 
            autoHideDuration={3000} 
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert 
              onClose={handleCloseSnackbar} 
              severity={snackbar.severity} 
              sx={{ 
                width: '100%',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                '& .MuiAlert-message': { fontSize: '0.95rem' }
              }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
