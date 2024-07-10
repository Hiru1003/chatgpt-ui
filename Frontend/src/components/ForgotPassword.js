import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, useMediaQuery, Link } from '@mui/material';
import { useHistory } from 'react-router-dom';  
import axios from 'axios';
import forgotpassword from '../assets/forgotpassword.png';

const ForgotPasswordPage = () => {
  const history = useHistory();  // Initialize history for navigation
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('/api/forgot-password', { email });
      console.log('Forgot password request successful:', response.data);
      // Redirect to success page after successful password reset
      history.push('/reset-success');
    } catch (error) {
      console.error('Forgot password error:', error);
      setError(error.response?.data?.detail || 'An error occurred. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: 'black',
        padding: '20px',
      }}
    >
      <Box
        sx={{
          border: '1px solid #ccc',
          borderRadius: '15px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          width: '80%',
          backgroundColor: '#404042',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Grid container spacing={3}>
          {/* Left column for forgot password image */}
          {!isSmallScreen && (
            <Grid item xs={12} sm={6} display="flex" alignItems="center" justifyContent="center">
              <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                <img src={forgotpassword} alt="Forgot Password" style={{ maxWidth: '100%', height: 'auto' }} />
              </Box>
            </Grid>
          )}

          {/* Right column for forgot password form */}
          <Grid item xs={12} sm={isSmallScreen ? 12 : 6} container justifyContent="center" alignItems="center">
            <Box>
              <Typography variant="h4" gutterBottom sx={{ mb: 2, fontWeight: 'bold', color: 'white' }}>
                Recover Password Here!
              </Typography>
              <Typography
                variant="h2"
                gutterBottom
                sx={{
                  mb: 2,
                  fontWeight: 'bold',
                  background: 'linear-gradient(90deg, #84a6f0, #02031a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Forgot Password
              </Typography>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                sx={{ mb: 2, border: '1px solid #ccc', borderRadius: '5px' }}
                value={email}
                InputProps={{
                  style: { color: 'white' },
                  placeholder: 'Email',
                }}
                InputLabelProps={{
                  style: { color: 'white' },
                }}
                onChange={(e) => setEmail(e.target.value)}
              />

              {error && typeof error === 'string' && (
                <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
              )}
              <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }} onClick={handleResetPassword}>
                Reset Password
              </Button>
              <Typography variant="body2" sx={{ mb: 2, fontSize: '16px', color: 'white' }}>
                <Link href="/login">Back to Login</Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
