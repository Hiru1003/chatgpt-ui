import React from 'react';
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Link, Grid , Divider, IconButton} from '@mui/material';
import forgotpassword from '../assets/forgotpassword.jpeg'

const ForgotPasswordPage = () => {

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
              backgroundColor:'white',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Grid container spacing={3}>
              {/* Left column for login form */}
              <Grid item xs={12} sm={6}>
                <img src={forgotpassword} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
              </Grid>
              {/* Right column for login form */}
              <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">
                <Box>
                  <Typography variant="h4" gutterBottom sx={{ mb: 2 ,fontWeight:'bold'}} >
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
                    id="Old Password"
                    label="oldpassword"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    id="New Password"
                    label="New Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                   <TextField
                    id="Confirm New Password"
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
