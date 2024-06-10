import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import Footer from './Footer';
import ChatHistory from './ChatHistory';
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { FaRegPenToSquare } from "react-icons/fa6";

const Sidebar = ({ isVisible, onToggleSidebar }) => {
  return (
    <Box
      sx={{
        width: isVisible ? '350px' : '50px',
        transition: 'width 0.3s',
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
          justifyContent: isVisible ? 'space-between' : 'center',
        }}
      >
        
        <IconButton onClick={onToggleSidebar} style={{ color: 'grey' }}>
          <BsReverseLayoutTextSidebarReverse fontSize="x-large" />
        </IconButton>
        {isVisible && (
          <IconButton style={{ color: 'grey' }}>
            <FaRegPenToSquare fontSize="x-large" />
          </IconButton>
        )}
      </Box>
      {isVisible && (
        <>
          <Box>
            <Box sx={{ paddingLeft: 1 }}>
              <Typography variant="subtitle1" style={{ color: 'grey' }}>Today</Typography>
            </Box>
            <ChatHistory text="Recipe for cake" />
            <ChatHistory text="Coding with python" />
            <ChatHistory text="React app with python" />
            <ChatHistory text="How to make a diy table" />
            <Box sx={{ paddingLeft: 1 }}>
              <Typography variant="subtitle1" style={{ color: 'grey' }}>Previous 7 Days</Typography>
            </Box>
            <ChatHistory text="SE project ideas" />
            <ChatHistory text="Remake the house style" />
            <ChatHistory text="Breakfast ideas" />
            <ChatHistory text="OOP concepts" />
            <ChatHistory text="Meal plan generator" />
            <ChatHistory text="Port change solution" />
            <ChatHistory text="Free open source" />
          </Box>
          <Box>
            <Footer />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Sidebar;
