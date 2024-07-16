import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Link, Grid, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/login.png';

const LoginPage = () => {
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });

      if (response && response.data && response.data.access_token) {
        const { access_token } = response.data;
        localStorage.setItem('accessToken', access_token);
        alert('Login successful!');
        navigate('/');
      } else {
        throw new Error('Login failed, please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.detail || 'Login failed. Please try again.');
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
          {!isSmallScreen && (
            <Grid item xs={12} sm={6}>
              <img src={loginImage} alt="Login" style={{ maxWidth: '100%', height: 'auto' }} />
            </Grid>
          )}

          <Grid item xs={12} sm={isSmallScreen ? 12 : 6} container justifyContent="center" alignItems="center">
            <Box width="100%">
              <Typography variant="h4" gutterBottom sx={{ mb: 2, fontWeight: 'bold', color: 'white' }}>
                Welcome Back!
              </Typography>
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
                Login
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 2, border: '1px solid #ccc', borderRadius: '5px' }}
                  InputProps={{
                    style: { color: 'white' },
                    placeholder: 'Email',
                  }}
                  InputLabelProps={{
                    style: { color: 'white' },
                  }}
                  required
                />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 2, border: '1px solid #ccc', borderRadius: '5px' }}
                  InputProps={{
                    style: { color: 'white' },
                    placeholder: 'Password',
                  }}
                  InputLabelProps={{
                    style: { color: 'white' },
                  }}
                  required
                />
                {error && (
                  <Typography variant="body1" color="error" sx={{ mb: 2 }}>
                    {error}
                  </Typography>
                )}
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Log In
                </Button>
              </form>
              <Typography variant="body1" sx={{ mt: 2, color: 'white' }}>
                Don't have an account?{' '}
                <Link href="/signup" sx={{ color: '#ccc' }}>
                  Sign Up
                </Link>
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, color: 'white' }}>
                <Link href="/forgot-password" sx={{ color: '#ccc' }}>
                  Forgot Password?
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginPage;
