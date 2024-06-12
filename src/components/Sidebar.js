import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import Footer from './Footer';
import ChatHistory from './ChatHistory';
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { FaRegPenToSquare } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Sidebar = ({ isVisible, onToggleSidebar }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: 'black',
        ...(isVisible ? { width: '350px' } : { width: '50px' }),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isVisible ? 'row' : 'column',
          justifyContent: 'space-between',
          padding: '8px',
          paddingBottom: '10px',
        }}
      >
        <IconButton onClick={onToggleSidebar} style={{ color: 'grey' }}>
          <BsReverseLayoutTextSidebarReverse fontSize="1.3rem" />
        </IconButton>
        {!isVisible && (
          <Link to="/">
          <IconButton style={{ color: 'grey' }}>
            <FaRegPenToSquare fontSize="1.3rem" />
          </IconButton>
        </Link>
        )}

        <Box sx={{ marginTop: '5px', display: isVisible ? 'flex' : 'none', justifyContent: 'center' }}>
        <Link to="/">
          <IconButton style={{ color: 'grey' }}>
            <FaRegPenToSquare fontSize="1.3rem" />
          </IconButton>
        </Link>
      </Box>
      </Box>

      

      {isVisible && (
        <div style={{ overflowY: 'auto', height: 'calc(100% - 50px)', scrollbarColor: '#666 #333', paddingLeft: '10px', paddingTop: '15px' }}>
          <Box>
            <Box sx={{ paddingLeft: 1 }}>
              <Typography variant="subtitle1" style={{ color: 'grey' }}>Today</Typography>
            </Box>

            <Link style={{ textDecoration: 'none' }} to='/message'> 
              <ChatHistory text="Recipe for cake" />
              <ChatHistory text="Coding with python" />
              <ChatHistory text="React app with python" />
              <ChatHistory text="How to make a diy table" />
            </Link>

          </Box>
          <Box sx={{ paddingLeft: 1 }}>
            <Typography variant="subtitle1" style={{ color: 'grey' }}>Previous 7 Days</Typography>
          </Box>
          <Box>
            <Link style={{ textDecoration: 'none' }} to='/message'>
            <ChatHistory text="SE project ideas" />
            <ChatHistory text="Remake the house style" />
            <ChatHistory text="Breakfast ideas" />
            <ChatHistory text="OOP concepts" />
            <ChatHistory text="Meal plan generator" />
            <ChatHistory text="Port change solution" />
            <ChatHistory text="Breakfast ideas" />
            <ChatHistory text="OOP concepts" />
            <ChatHistory text="Meal plan generator" />
            <ChatHistory text="Port change solution" />
            </Link>
          </Box>
          <Box>
            <Footer />
          </Box>
        </div>
      )}
    </Box>
  );
};

export default Sidebar;
