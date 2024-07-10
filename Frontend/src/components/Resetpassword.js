import React, { useState } from 'react';
import { Box, Typography,Button, Grid, useMediaQuery } from '@mui/material';
import forgotpassword from '../assets/forgotpassword.png';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const [error] = useState('');

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
              
              <Typography
                variant="h2"
                gutterBottom
                sx={{
                  mb: 2,
                  fontWeight: 'bold',
                  background: 'linear-gradient(90deg, #84a6f0, #161EDD)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Recover Password!
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'semibold', color:'white' }}>
              Password reset email sent. Check your email for instructions.
              </Typography>
              {error && typeof error === 'string' && (
                <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
              )}
              {/* eslint-disable-next-line */}
              <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }} onClick={() => navigate('/login')}>
                Back to Login
              </Button>
              {/* eslint-disable-next-line */}
              <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }} onClick={() => navigate('/signup')}>
                Back to Signup
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ResetPasswordPage;
