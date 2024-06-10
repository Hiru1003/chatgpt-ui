import React from 'react';
import { Box, Typography, colors } from '@mui/material';

const ChatHistory = () => {
  return (
    <Box sx={{ p:2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
      <Box>
        <Typography variant="subtitle1" style={{color: 'grey' }}>Today</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" style={{color: 'grey' }}>Previous 7 days</Typography>
      </Box>
    </Box>
  );
}

export default ChatHistory;
