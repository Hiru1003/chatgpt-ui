import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import AvatarDropdown from './AvatarDropdown';
import ChatgptDropdownHeader from './ChatgptDropdownHeader';
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { LiaRedoAltSolid } from "react-icons/lia";
import { MdContentCopy } from "react-icons/md";
import { BiDislike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { CgAttachment } from "react-icons/cg";
import { MdKeyboardVoice } from "react-icons/md";
import { LiaBookSolid } from "react-icons/lia";
import { FaCircleArrowUp } from "react-icons/fa6";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const containerRef = useRef(null);

  const handleMessageSend = () => {
    if (messageText.trim() !== '') {
      const newMessage = {
        text: messageText,
        sender: 'user',
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  // Function to simulate receiving messages from the other side
  const simulateReceiveMessage = () => {
    const newMessage = {
      text: "This is a message from the other side.",
      sender: 'other', 
    };
    setMessages([...messages, newMessage]);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

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
      height: '100vh', 
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
        ref={containerRef}
        sx={{
          mt: 2,
          maxHeight: 'calc(100% - 120px)', 
          overflowY: messages.length ? 'auto' : 'hidden', 
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          px: 2,
          alignItems: 'flex-end', 
          width: '95%', 
          scrollbarColor: '#666 #333',
          '::-webkit-scrollbar': {
            width: '12px',
            backgroundColor: '#333', 
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: '#666', 
            borderRadius: '6px', 
          },
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '70%',
              borderRadius: '10px',
              padding: '8px',
              bgcolor: message.sender === 'user' ? '#3f51b5' : '#e0e0e0',
              color: message.sender === 'user' ? 'white' : 'black',
              position: 'relative',
              marginBottom: '10px',
              transition: 'background-color 0.3s',
            }}
          >
            <Typography>{message.text}</Typography>
            {message.sender === 'user' && (
              <Box
                className="iconBox"
                sx={{
                  position: 'absolute',
                  bottom: '-40px',
                  right: 0,
                  display: 'flex',
                  gap: '5px',
                  color: 'white',
                }}
              >
                <IconButton aria-label="Read Aloud">
                  <HiOutlineSpeakerWave style={{ color: 'white' }} />
                </IconButton>
                <IconButton aria-label="Copy">
                  <MdContentCopy style={{ color: 'white' }} />
                </IconButton>
                <IconButton aria-label="Regenerate">
                  <LiaRedoAltSolid style={{ color: 'white' }} />
                </IconButton>
                <IconButton aria-label="Dislike">
                  <BiDislike style={{ color: 'white' }} />
                </IconButton>
                <IconButton aria-label="Like">
                  <BiLike style={{ color: 'white' }} />
                </IconButton>
              </Box>
            )}
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
