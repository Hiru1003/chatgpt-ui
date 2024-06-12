import React, { useState } from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { FaCircleArrowUp } from "react-icons/fa6";
import { CgAttachment } from "react-icons/cg";
import { MdKeyboardVoice } from "react-icons/md";
import { LiaBookSolid } from "react-icons/lia";
import AvatarDropdown from './AvatarDropdown';
import ChatgptDropdownHeader from './ChatgptDropdownHeader';

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  const handleMessageSend = () => {
    if (messageText.trim() !== '') {
      const newMessage = {
        text: messageText,
        sender: 'user', // Assuming the user sends the message
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  // Function to simulate receiving messages from the other side
  const simulateReceiveMessage = () => {
    const newMessage = {
      text: "This is a message from the other side.",
      sender: 'other', // Set a different sender identifier
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <Box sx={{ 
      pl: 10, 
      pr: 10, 
      pt: 1, 
      pb: 3, 
      flexGrow: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between',
      bgcolor: 'grey.900',
      position: 'relative',
      height: '100vh', // Set height to 100% of viewport height
    }}>
      {/* Avatar */}
      <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', position: 'absolute', top: '20px', right: '30px' }}>
        <AvatarDropdown/>
      </Box>

      {/* Main header */}
      <Box>
        <ChatgptDropdownHeader/>
      </Box>
      
      <Box
        sx={{
          mt: 2,
          maxHeight: 'calc(100% - 120px)', 
          overflowY: 'auto', 
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          px: 2,
          alignItems: 'flex-end', 
          width: '95%', 
          scrollbarColor: '#666 #333',
          '::-webkit-scrollbar': {
            width: '12px', // Set scrollbar width
            backgroundColor: '#333', // Set scrollbar background color
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: '#666', // Set scrollbar thumb color
            borderRadius: '6px', // Set scrollbar thumb border radius
          },
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start', // Align messages dynamically based on sender
              maxWidth: '70%',
              borderRadius: '10px',
              padding: '8px',
              bgcolor: message.sender === 'user' ? '#3f51b5' : '#e0e0e0',
              color: message.sender === 'user' ? 'white' : 'black',
            }}
          >
            <Typography>{message.text}</Typography>
          </Box>
        ))}
      </Box>

      {/* Text Field and IconButton */}
      <Box sx={{ 
          mt: 2, 
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center', 
          padding: '10px', 
          color: 'white', 
          justifyContent: 'center',
        }}>
        <IconButton aria-label="upload" sx={{ fontSize: '2.5rem', color: "white" }}>
          <LiaBookSolid />
        </IconButton>
        <IconButton aria-label="upload" sx={{ fontSize: '2rem', color: "white" }}>
          <CgAttachment />
        </IconButton>

        <TextField 
          fullWidth 
          placeholder="Message ChatGPT" 
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleMessageSend();
            }
          }}
          sx={{ 
            width: 'calc(80% - 55px)', 
            mr: 1, 
            border: '1px solid black', 
            borderRadius: '15px', 
            bgcolor: '#333', 
            color: 'white',
            '::placeholder': { 
              color: 'white',
              animation: 'blink-caret 0.75s step-end infinite'
            } 
          }} 
          InputProps={{ style: { color: 'white' } }}
        />
        
        <IconButton aria-label="send" sx={{ fontSize: '2.2rem', color: "white" }} onClick={handleMessageSend}>
          <MdKeyboardVoice />
        </IconButton>
        <IconButton aria-label="send" sx={{ fontSize: '2.5rem', color: "white" }} onClick={simulateReceiveMessage}>
          <FaCircleArrowUp />
        </IconButton>
      </Box>
      
    </Box>
  );
}

export default Message;
