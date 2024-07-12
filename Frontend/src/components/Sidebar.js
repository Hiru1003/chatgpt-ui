import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { FaRegPenToSquare } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaQuestionCircle } from "react-icons/fa";
import ChatHistory from './ChatHistory';
import { BsStars } from 'react-icons/bs'; 
import SidebarFooter from './Footer';
import SidebarHeaderStatic from './SidebarHeaderStatic';

const Sidebar = ({ isVisible, onToggleSidebar }) => {
  const [chatHistory, setChatHistory] = useState([
    { text: "Recipe for cake" },
    { text: "Coding with python" },
    { text: "React app with python" },
    { text: "How to make a diy table" },
    { text: "SE project ideas" },
    { text: "Remake the house style" },
    { text: "Breakfast ideas" },
    { text: "OOP concepts" },
    { text: "Meal plan generator" },
    { text: "Port change solution" },
  ]);

  const handleDelete = (textToDelete) => {
    setChatHistory(chatHistory.filter((item) => item.text !== textToDelete));
  };

  const handleRename = (oldText, newText) => {
    setChatHistory(
      chatHistory.map((item) =>
        item.text === oldText ? { ...item, text: newText } : item
      )
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: 'black',
        width: '350px',
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
          width: '350px',
          ...(isVisible ? { width: '350px' } : { width: '50px' }),
        }}
      >
        <IconButton onClick={onToggleSidebar} style={{ color: 'grey' }}>
          <BsReverseLayoutTextSidebarReverse fontSize="1.3rem" />
        </IconButton>
        <Link to="/">
          <IconButton style={{ color: 'grey' }}>
            <FaRegPenToSquare fontSize="1.3rem" />
          </IconButton>
        </Link>
        {!isVisible && (
          <>
            <IconButton style={{ color: 'grey', position: 'fixed', bottom: '45px' }}>
              <BsStars fontSize="1.2rem" />
            </IconButton>
            <IconButton style={{ color: 'grey', position: 'fixed', bottom: '10px' }}>
              <FaQuestionCircle fontSize="1.2rem" />
            </IconButton>
          </>
        )}
      </Box>
      <SidebarHeaderStatic />
      {isVisible && (
        <>
          <div style={{ overflowY: 'auto', height: 'calc(100% - 50px - 60px)', scrollbarColor: '#666 #333', paddingLeft: '10px', paddingTop: '15px' }}>
            <Box>
              <Box sx={{ paddingLeft: 1 }}>
                <Typography variant="subtitle1" style={{ color: 'grey' }}>Today</Typography>
              </Box>
              {chatHistory.slice(0, 4).map((item) => (
                <ChatHistory text={item.text} onDelete={handleDelete} onRename={handleRename} key={item.text} />
              ))}
            </Box>
            <Box sx={{ paddingLeft: 1 }}>
              <Typography variant="subtitle1" style={{ color: 'grey' }}>Previous 7 Days</Typography>
            </Box>
            <Box>
              {chatHistory.slice(4).map((item) => (
                <ChatHistory text={item.text} onDelete={handleDelete} onRename={handleRename} key={item.text} />
              ))}
            </Box>
          </div>
          <SidebarFooter />
        </>
      )}
    </Box>
  );
};

export default Sidebar;
