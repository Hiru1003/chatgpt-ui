import React from 'react';
import { Box, Typography, TextField, Button, Grid, useMediaQuery } from '@mui/material';
import forgotpassword from '../assets/forgotpassword.jpeg';

const ForgotPasswordPage = () => {
  const isSmallScreen = useMediaQuery('(max-width:900px)');

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
          {/* Left column for forgot password form */}
          {!isSmallScreen && (
            <Grid item xs={12} sm={6} display="flex" alignItems="center" justifyContent="center">
              <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                <img src={forgotpassword} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
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
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                id="new-password"
                label="New Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                id="confirm-new-password"
                label="Confirm New Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />

              <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
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
