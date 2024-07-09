import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, useMediaQuery } from '@mui/material';
import axios from 'axios';
import forgotpassword from '../assets/forgotpassword.jpeg';

const ForgotPasswordPage = () => {
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('/api/reset-password', {
        oldPassword,
        newPassword,
        confirmNewPassword,
      });
      console.log('Password reset successful:', response.data);
      alert('Password reset successful. You can now log in with your new password.');
      // Optionally redirect user to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Password reset error:', error);
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
        bgcolor: 'white',
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
          backgroundColor: 'white',
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
              <Typography variant="h4" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
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
                id="old-password"
                label="Old Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <TextField
                id="new-password"
                label="New Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                id="confirm-new-password"
                label="Confirm New Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />

              {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
              <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }} onClick={handleResetPassword}>
                Reset Password
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
