import React, { useState } from 'react';
import { Box, Typography, IconButton, TextField, Avatar } from '@mui/material';
import Footer from './Footer';
import ChatHistory from './ChatHistory';
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { FaRegPenToSquare } from "react-icons/fa6";



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
        <BsReverseLayoutTextSidebarReverse fontSize="x-large" style={{ cursor: 'pointer', color: 'grey' }} onClick={() => {}} />
        <FaRegPenToSquare fontSize="x-large" style={{ cursor: 'pointer', color: 'grey' }} onClick={() => {}} />
      </Box>
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
          <ChatHistory text="Meal plan genarater" />
          <ChatHistory text="Port change solution" />
          <ChatHistory text="Free open source" />

      </Box>

      
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Sidebar;
