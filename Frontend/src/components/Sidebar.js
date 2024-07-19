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
import axios from 'axios';

const Sidebar = ({ isVisible, onToggleSidebar }) => {
  const [chatHistory, setChatHistory] = useState([
    { chatId: '1', text: "Recipe for cake" },
    { chatId: '2', text: "Coding with python" },
    { chatId: '3', text: "React app with python" },
    { chatId: '4', text: "How to make a diy table" },
    { chatId: '5', text: "SE project ideas" },
    { chatId: '6', text: "Remake the house style" },
    { chatId: '7', text: "Breakfast ideas" },
    { chatId: '8', text: "OOP concepts" },
    { chatId: '9', text: "Meal plan generator" },
    { chatId: '10', text: "Port change solution" },
  ]);

  const handleDelete = async (chatId) => {
    try {
      await axios.delete(`/api/chat/delete/${chatId}`);
      setChatHistory(chatHistory.filter((item) => item.chatId !== chatId));
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const handleRename = async (chatId, newText) => {
    try {
      await axios.put(`/api/chat/rename/${chatId}`, { chatId, new_name: newText });
      setChatHistory(
        chatHistory.map((item) =>
          item.chatId === chatId ? { ...item, text: newText } : item
        )
      );
    } catch (error) {
      console.error('Error renaming chat:', error);
    }
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
                <ChatHistory 
                  key={item.chatId} 
                  chatId={item.chatId} 
                  text={item.text} 
                  onDelete={handleDelete} 
                  onRename={handleRename} 
                />
              ))}
            </Box>
            <Box sx={{ paddingLeft: 1 }}>
              <Typography variant="subtitle1" style={{ color: 'grey' }}>Previous 7 Days</Typography>
            </Box>
            <Box>
              {chatHistory.slice(4).map((item) => (
                <ChatHistory 
                  key={item.chatId} 
                  chatId={item.chatId} 
                  text={item.text} 
                  onDelete={handleDelete} 
                  onRename={handleRename} 
                />
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