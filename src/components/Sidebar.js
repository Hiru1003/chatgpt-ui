import React from 'react';
import { Box } from '@mui/material';
import { Menu as MenuIcon, Chat as ChatIcon } from '@mui/icons-material'; // Importing icons from Material-UI

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: '250px',
        height: '100vh',
        bgcolor: 'grey.200',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        {/* Icon for Hidden Bar */}
        <Box mr={2}>
          <MenuIcon fontSize="large" style={{ cursor: 'pointer' }} onClick={() => {}} />
        </Box>
        {/* Icon for New Chat */}
        <ChatIcon fontSize="large" style={{ cursor: 'pointer' }} onClick={() => {}} />
      </Box>
    </Box>
  );
  
};

export default Sidebar;
