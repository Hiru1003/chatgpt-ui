import React, { useState, useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { MdContentCopy } from "react-icons/md";
import { BiDislike, BiLike } from "react-icons/bi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { FaRegPenToSquare } from "react-icons/fa6";
import ChatgptDropdownHeader from './ChatgptDropdownHeader';
import TextAreaTemplete from './TextArea';

const DummyChat = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const messages = [
    { text: 'Hiiii! ', sender: 'right' },
    { text: 'Hello! How can I help you today?', sender: 'left' },
    { text: 'I am looking for a recipe for cake.', sender: 'right' },
    { text: 'Sure, I can help with that! Do you have any specific ingredients in mind?', sender: 'left' },
    { text: 'I have eggs, flour, and sugar.', sender: 'right' },
    { text: 'Great! Here is a simple cake recipe you can try... Great! Here is a simple cake recipe you can try...  Great! Here is a simple cake recipe you can try...  Great! Here is a simple cake recipe you can try...  Great! Here is a simple cake recipe you can try...  Great! Here is a simple cake recipe you can try...  Great! Here is a simple cake recipe you can try...  Great! Here is a simple cake recipe you can try...  Great! Here is a simple cake recipe you can try...  Great! Here is a simple cake recipe you can try...  Great! Here is a simple cake recipe you can try...  Great! Here is a simple cake recipe you can try...  v Great! Here is a simple cake recipe you can try...  Great! Here is a simple cake recipe you can try...  Great! Here is a simple cake recipe you can try... Great! Here is a simple cake recipe you can try...  Great! Here is a simple cake recipe you can try...  Great! Here is a simple cake recipe you can try...  Great! Here is a simple cake recipe you can try...  Great! Here is a simple cake recipe you can try...  Great! Here is a simple cake recipe you can try...  Great! Here is a simple cake recipe you can try...  Great! Here is a simple cake recipe you can try...  Great! Here is a simple cake recipe you can try...  Great! Here is a simple cake recipe you can try...  v Great! Here is a simple cake recipe you can try...  Great! Here is a simple cake recipe you can try...', sender: 'left' },
  ];

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  return (
    <Box 
      sx={{ 
        height: '100vh',
        display: 'flex', 
        flexDirection: 'column', 
        bgcolor: 'grey.900',
        paddingLeft: '10px', 
      }}
    >
      <Box sx={{ padding: '10px 0', pl: { xs: 2, sm: 5 }, pr: { xs: 2, sm: 5 }, bgcolor: 'grey.900' }}>
        <ChatgptDropdownHeader/>
      </Box>

      <Box 
        sx={{ 
          flexGrow: 1, 
          overflowY: 'auto', 
          scrollbarColor: '#666 #333', 
          paddingLeft: '10px', 
          paddingRight: '15px',  
          paddingTop: '15px',
          paddingBottom: '40px', 
          scrollbarWidth: 'thin',
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender === 'left' ? 'flex-start' : 'flex-end',
              mb: 3,
              paddingBottom: 2,
              position: 'relative',
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: msg.sender === 'left' ? 'grey.700' : 'grey.800',
                color: 'white',
                borderRadius: 1,
                p: 1,
                maxWidth: '70%',
              }}
            >
              <Typography variant="body1" sx={{ flexGrow: 1, fontSize: '1.2rem' }}>{msg.text}</Typography>
            </Box>
            {(hoverIndex === index) && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: '-30px',
                }}
              >
                {msg.sender === 'left' && (
                  <>
                    <IconButton aria-label="Read Aloud">
                      <HiOutlineSpeakerWave style={{ color: 'grey', fontSize:'1.2rem' }} />
                    </IconButton>
                    <IconButton aria-label="Copy">
                      <MdContentCopy style={{ color: 'grey', fontSize:'1.2rem'  }} />
                    </IconButton>
                    <IconButton aria-label="Dislike">
                      <BiDislike style={{ color: 'grey', fontSize:'1.2rem'  }} />
                    </IconButton>
                    <IconButton aria-label="Like">
                      <BiLike style={{ color: 'grey', fontSize:'1.2rem'  }} />
                    </IconButton>
                  </>
                )}
                {msg.sender === 'right' && (
                  <IconButton aria-label="edit" sx={{ color: 'grey', fontSize:'1.2rem' }}>
                    <FaRegPenToSquare />
                  </IconButton>
                )}
              </Box>
            )}
          </Box>
        ))}
      </Box>

      <Box 
        sx={{
          padding: '10px 0', 
          pl: { xs: 2, sm: 5 }, 
          pr: { xs: 2, sm: 5 }, 
          bgcolor: 'grey.900'
        }}
      >
        <TextAreaTemplete/>
      </Box>
    </Box>
  ); 
};

export default DummyChat;
