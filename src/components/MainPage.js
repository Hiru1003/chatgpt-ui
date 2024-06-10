// src/components/MainPage.js
import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const MainPage = () => {
  return (
    <Box sx={{ p: 2, flexGrow: 1 }}>
      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Typography variant="h3">ChatGPT Interface</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 200px)', overflowY: 'auto' }}>
      </Box>
      <Box sx={{ mt: 2, display: 'flex' }}>
        <TextField variant="outlined" fullWidth placeholder="Type your message..." />
        <Button variant="contained" color="primary">Send</Button>
      </Box>
    </Box>
  );
}

export default MainPage;
