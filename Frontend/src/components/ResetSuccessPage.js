import React from 'react';
import { Box, Typography, Button, Link } from '@mui/material';

const ResetSuccessPage = () => {
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
        <Typography variant="h4" gutterBottom sx={{ mb: 2, fontWeight: 'bold', color: 'white' }}>
          Password Reset Successful!
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 2, color: 'white' }}>
          Password reset email sent. Check your email for instructions.
        </Typography>
        <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
          <Link href="/login" sx={{ color: 'white', textDecoration: 'none' }}>Login</Link>
        </Button>
        <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
          <Link href="/signup" sx={{ color: 'white', textDecoration: 'none' }}>Sign Up</Link>
        </Button>
        <Button variant="contained" color="primary" fullWidth>
          <Link href="/" sx={{ color: 'white', textDecoration: 'none' }}>Back to Main Page</Link>
        </Button>
      </Box>
    </Box>
  );
};

export default ResetSuccessPage;
