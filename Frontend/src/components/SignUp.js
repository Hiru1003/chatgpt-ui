import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Link, Grid, useMediaQuery } from '@mui/material';
import SignupImage from '../assets/signup.png';

const SignupPage = () => {
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup', {
        username,
        email,
        password,
        confirm_password: confirmPassword
      });

      if (response && response.data && response.data.access_token) {
        const { access_token } = response.data;
        // Store token in localStorage or cookies as needed
        localStorage.setItem('accessToken', access_token);
        alert('Signup successful!');
        window.location.href = '/main'; // Redirect to main page after successful signup
      } else {
        throw new Error('Signup failed, please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.response?.data?.detail || 'Signup failed. Please try again.');
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
              <img src={SignupImage} alt="Signup" style={{ maxWidth: '100%', height: 'auto' }} />
            </Grid>
          )}

          <Grid item xs={12} sm={isSmallScreen ? 12 : 6} container justifyContent="center" alignItems="center">
            <Box width="100%">
              <Typography variant="h4" gutterBottom sx={{ mb: 2, fontWeight: 'bold', color: 'white' }}>
                Get Started!
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
                Sign Up
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  id="username"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{ mb: 2, border: '1px solid #ccc', borderRadius: '5px' }}
                  InputProps={{
                    style: { color: 'white' },
                    placeholder: 'Username',
                  }}
                  InputLabelProps={{
                    style: { color: 'white' },
                  }}
                  required
                />
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
                <TextField
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{ mb: 2, border: '1px solid #ccc', borderRadius: '5px' }}
                  InputProps={{
                    style: { color: 'white' },
                    placeholder: 'Confirm Password',
                  }}
                  InputLabelProps={{
                    style: { color: 'white' },
                  }}
                  required
                />
                {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
                  Sign Up
                </Button>
              </form>
              <Typography variant="body2" sx={{ mb: 1, fontSize: '16px', color: 'white' }}>
                Already have an account?
                <Link href="/login">Log In</Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignupPage;
