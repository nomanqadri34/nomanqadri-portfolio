import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { LockOutlined, EmailOutlined } from '@mui/icons-material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/auth/request-otp', { email });
      setShowOtpInput(true);
      setSuccess('OTP sent successfully!');
    } catch (error) {
      setError(error.response?.data?.message || 'Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/auth/verify-otp', {
        email,
        otp,
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      if (response.data.user.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        setError('Admin access required');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
        py: 3,
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={24}
          sx={{
            p: isMobile ? 3 : 4,
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <LockOutlined sx={{ fontSize: 40, color: 'white' }} />
            </Box>

            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom 
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                textAlign: 'center',
                mb: 3,
              }}
            >
              Admin Login
            </Typography>
            
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  width: '100%',
                  mb: 2,
                  '& .MuiAlert-message': { width: '100%' }
                }}
              >
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert 
                severity="success" 
                sx={{ 
                  width: '100%',
                  mb: 2,
                  '& .MuiAlert-message': { width: '100%' }
                }}
              >
                {success}
              </Alert>
            )}

            {!showOtpInput ? (
              <form onSubmit={handleRequestOTP} style={{ width: '100%' }}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  required
                  disabled={loading}
                  InputProps={{
                    startAdornment: <EmailOutlined sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: 'white' }} />
                  ) : (
                    'Request OTP'
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} style={{ width: '100%' }}>
                <TextField
                  fullWidth
                  label="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  margin="normal"
                  required
                  disabled={loading}
                  type="number"
                  InputProps={{
                    startAdornment: <LockOutlined sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: 'white' }} />
                  ) : (
                    'Verify OTP'
                  )}
                </Button>
              </form>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login; 