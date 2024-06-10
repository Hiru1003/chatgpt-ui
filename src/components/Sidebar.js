import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Menu as MenuIcon, Chat as ChatIcon } from '@mui/icons-material'; 
import Footer from './Footer';
import ChatHistory from './ChatHistory';

const Sidebar = () => {

  return (
    <Box
      sx={{
        width: '350px',
        height: '100vh',
        bgcolor: 'black',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <MenuIcon fontSize="large" style={{ cursor: 'pointer', color: 'grey' }} onClick={() => {}} />
        <ChatIcon fontSize="large" style={{ cursor: 'pointer', color: 'grey' }} onClick={() => {}} />
      </Box>
      <Box>
        <ChatHistory/>
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Sidebar;
