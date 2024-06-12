import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { MdContentCopy } from "react-icons/md";
import { BiDislike, BiLike } from "react-icons/bi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { CgAttachment } from "react-icons/cg";
import { MdKeyboardVoice } from "react-icons/md";
import { LiaBookSolid } from "react-icons/lia";
import { FaCircleArrowUp } from "react-icons/fa6";
import ChatgptDropdownHeader from './ChatgptDropdownHeader';

const DummyChat = () => {
    const messages = [
        { text: 'Hello! How can I help you today?', sender: 'left' },
        { text: 'I am looking for a recipe for cake.', sender: 'right' },
        { text: 'Sure, I can help with that! Do you have any specific ingredients in mind?', sender: 'left' },
        { text: 'I have eggs, flour, and sugar.', sender: 'right' },
        { text: 'Great! Here is a simple cake recipe you can try...', sender: 'left' },
        { text: 'Do you have any dietary restrictions?', sender: 'left' },
        { text: 'Yes, I prefer gluten-free options.', sender: 'right' },
        { text: 'No problem! Here\'s a gluten-free cake recipe for you:', sender: 'left' },
        { text: 'Thank you! That sounds perfect.', sender: 'right' },
        { text: 'You\'re welcome! Let me know if you need any more help.', sender: 'left' },
        { text: 'Sure, I can help with that.', sender: 'left' },
        { text: 'I need some advice on gardening.', sender: 'right' },
        { text: 'What kind of plants are you interested in?', sender: 'left' },
        { text: 'I want to grow some vegetables in my backyard.', sender: 'right' },
        { text: 'That\'s a great idea! Here are some tips for growing vegetables:', sender: 'left' },
        { text: 'Thank you! I\'ll give it a try.', sender: 'right' },
      ];

  return (
    <Box sx={{ padding: '10px', height: 'calc(100% - 50px)', overflowY: 'auto' }}>
        <Box sx={{ paddingBottom: '30px'}}>
            <ChatgptDropdownHeader/>
        </Box>
      {messages.map((msg, index) => (
        
        <Box
          key={index}
          sx={{
            display: 'flex',
            paddingLeft:10,
              paddingRight:10,
            justifyContent: msg.sender === 'left' ? 'flex-start' : 'flex-end',
            mb: 1,
          }}
        >
          <Box
            sx={{
              bgcolor: msg.sender === 'left' ? 'grey.300' : 'grey.500',
              color: 'black',
              borderRadius: 1,
              p: 1,
              maxWidth: '70%',
              position: 'relative', // Add position relative to position icons
            }}
          >
            <Typography variant="body1">{msg.text}</Typography>
          </Box>
          {/* Icons */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: msg.sender === 'left' ? '5px' : '0', // Adjust icon position based on sender
            }}
          >
            {msg.sender === 'left' && (
              <>
                <IconButton aria-label="Read Aloud">
                  <HiOutlineSpeakerWave style={{ color: 'white' }} />
                </IconButton>
                <IconButton aria-label="Copy">
                  <MdContentCopy style={{ color: 'white' }} />
                </IconButton>
                <IconButton aria-label="Dislike">
                  <BiDislike style={{ color: 'white' }} />
                </IconButton>
                <IconButton aria-label="Like">
                  <BiLike style={{ color: 'white' }} />
                </IconButton>
              </>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default DummyChat;
