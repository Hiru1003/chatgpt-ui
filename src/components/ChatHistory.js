// src/components/ChatHistory.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const ChatHistory = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Chat History</Typography>
      <Box>
        <Typography variant="subtitle1">Today</Typography>
        {/* Today's chat history */}
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Previous 7 days</Typography>
        {/* Previous 7 days' chat history */}
      </Box>
    </Box>
  );
}

export default ChatHistory;
