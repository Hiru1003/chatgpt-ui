import React from 'react';
import { Box, Typography, TextField, Button, Link, Grid} from '@mui/material';
import SignupImage from '../assets/signup.jpeg'

const SignupPage = () => {
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
          <Grid item xs={12} sm={6}>
          <img src={SignupImage} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
          
          </Grid>
          <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">
            <Box>
            <Typography variant="h4" gutterBottom sx={{ mb: 2 ,fontWeight:'bold'}} >
                Get Started !
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
                Sign Up
              </Typography>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
                Sign Up
              </Button>
              <Typography variant="body2" sx={{ mb: 1, fontSize: '16px' }}>
                Already have an account? <Link href="/login">Log In</Link>
              </Typography>


            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignupPage;

