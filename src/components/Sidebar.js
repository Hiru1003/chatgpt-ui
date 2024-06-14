import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { FaRegPenToSquare } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaQuestionCircle } from "react-icons/fa";
import ChatHistory from './ChatHistory'
import { BsStars } from 'react-icons/bs'; 

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
          alignItems: 'center',
          padding: '8px',
          paddingBottom: '10px',
        }}
      >
        <IconButton onClick={onToggleSidebar} style={{ color: 'grey' }}>
          <BsReverseLayoutTextSidebarReverse fontSize="1.3rem" />
        </IconButton>
        <Link to="/">
              <IconButton style={{ color: 'grey' }}>
                <FaRegPenToSquare fontSize="1.3rem" />
              </IconButton></Link>
        {!isVisible && (
          <>

            <IconButton style={{ color: 'grey',position: 'fixed',bottom: '45px', }}>
              <BsStars fontSize="1.2rem" />
            </IconButton>
            <IconButton style={{ color: 'grey',position: 'fixed', bottom: '10px', }}>
              <FaQuestionCircle fontSize="1.2rem" />
            </IconButton>
          </>
        )}
      </Box>

      {isVisible && (
        <div style={{ overflowY: 'auto', height: 'calc(100% - 50px)', scrollbarColor: '#666 #333', paddingLeft: '10px', paddingTop: '15px' }}>
          <Box>
            <Box sx={{ paddingLeft: 1 }}>
              <Typography variant="subtitle1" style={{ color: 'grey' }}>Today</Typography>
            </Box>

            <Link style={{ textDecoration: 'none' }} to='/DummyChat'> 
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
            <Link style={{ textDecoration: 'none' }} to='/DummyChat'>
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
            <Box sx={{ bgcolor: 'black', p: 2, textAlign: 'left', display: 'flex', flexDirection: 'row', alignItems: 'left', justifyContent: 'left' }}>
              <Box sx={{ color: 'white', mr: 3 }}>
                <BsStars style={{ fontSize: '1.2rem' }} />
              </Box>
              <Box sx={{ color: 'white' }}>
                <Typography style={{ color: 'white', fontSize: '0.9rem' }}>Explore New Release<br /></Typography>
              </Box>
            </Box>

            <Box sx={{ bgcolor: 'black', p: 2, textAlign: 'left', display: 'flex', flexDirection: 'row', alignItems: 'left', justifyContent: 'left' }}>
              <Box sx={{ color: 'white', mr: 3 }}>
                <FaQuestionCircle style={{ fontSize: '1.2rem' }} />
              </Box>
              <Box sx={{ color: 'white' }}>
                <Typography style={{ color: 'white', fontSize: '0.9rem' }}>Get Help<br /></Typography>
              </Box>
            </Box>
          </Box>
        </div>
      )}
    </Box>
  );
};

export default Sidebar;
