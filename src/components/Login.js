import React from 'react';
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Link, Grid, Divider, IconButton } from '@mui/material';
import {useMediaQuery } from '@mui/material';
import loginImage from '../assets/login.jpeg';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const LoginPage = () => {
  //const theme = useTheme();
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
          {/* Left column for login form */}
          {!isSmallScreen && (
            <Grid item xs={12} sm={6} display="flex" alignItems="center" justifyContent="center">
              <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                <img src={loginImage} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
              </Box>
            </Grid>
          )}

          {/* Right column for login form */}
          <Grid item xs={12} sm={isSmallScreen ? 12 : 6} container justifyContent="center" alignItems="center">
            <Box>
              <Typography variant="h4" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
                Welcome Back!
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
                Log In
              </Typography>
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
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember Me"
                sx={{ mb: 2, textAlign: 'left' }}
              />
              <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
                Login
              </Button>
              <Typography variant="body2" sx={{ mb: 1, fontSize: '16px' }}>
                <Link href="/forgot-password">Forgot Password?</Link>
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, fontSize: '16px' }}>
                Don't have an account? <Link href="/signup">Sign Up</Link>
              </Typography>

              {/* Divider and "or login with" text */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }}>
                <Divider sx={{ width: '33%', backgroundColor: 'black' }} />
                <Typography variant="body2" sx={{ color: '#ccc', px: 2, fontSize: '18px' }}>
                  or login with
                </Typography>
                <Divider sx={{ width: '33%', backgroundColor: 'black' }} />
              </Box>

              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={6}>
                  {/* Google login */}
                  <Box sx={{ border: '1px solid #ccc', borderRadius: '5px', p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton>
                      <GoogleIcon />
                    </IconButton>
                    <Typography variant="body2" sx={{ ml: 2 }}>
                      Continue with Google
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* LinkedIn login */}
                  <Box sx={{ border: '1px solid #ccc', borderRadius: '5px', p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton>
                      <LinkedInIcon />
                    </IconButton>
                    <Typography variant="body2" sx={{ ml: 2 }}>
                      Continue with LinkedIn
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginPage;
