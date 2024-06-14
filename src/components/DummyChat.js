import React from 'react';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import { MdContentCopy } from "react-icons/md";
import { BiDislike, BiLike } from "react-icons/bi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { CgAttachment } from "react-icons/cg";
import { MdKeyboardVoice } from "react-icons/md";
import { LiaBookSolid } from "react-icons/lia";
import { FaCircleArrowUp } from "react-icons/fa6";
import ChatgptDropdownHeader from './ChatgptDropdownHeader';
import QuestionMarkDropdown from './QuestionMarkDropdown';

const DummyChat = () => {
  const messages = [
    { text: 'Hello! How can I help you today?', sender: 'left' },
    { text: 'I am looking for a recipe for cake.', sender: 'right' },
    { text: 'Sure, I can help with that! Do you have any specific ingredients in mind?', sender: 'left' },
    { text: 'I have eggs, flour, and sugar.', sender: 'right' },
    { text: 'Great! Here is a simple cake recipe you can try...', sender: 'left' },
  ];

  return (
    <Box sx={{ padding: '10px', height: 'calc(100% - 50px)', overflowY: 'auto' }} >
      <Box sx={{ padding: '10px', height: 'calc(100% - 50px)', overflowY: 'auto' }}>
        <Box sx={{ paddingBottom: '30px'}}>
          <ChatgptDropdownHeader/>
        </Box>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender === 'left' ? 'flex-start' : 'flex-end',
              mb: 1,
              paddingRight: 10,
              paddingLeft: 10,
            }}
          >
            <Box
              sx={{
                bgcolor: msg.sender === 'left' ? 'grey.300' : 'lightskyblue',
                color: 'black',
                borderRadius: 1,
                p: 1,
                maxWidth: '70%',
                position: 'relative',
              }}
            >
              <Typography variant="body1">{msg.text}</Typography>
            </Box>
            {/* Icons */}
            {msg.sender === 'left' && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: 1,
                }}
              >
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
              </Box>
            )}
          </Box>
        ))}
      </Box>

        {/* Text feild container */}
        <Box sx={{ 
            position: 'absolute', 
            bottom: 65, 
            left: '60%',
            transform: 'translateX(-50%)',
            width: '70%', 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '10px', 
            color: 'white',
        }}>
            <IconButton aria-label="upload" sx={{ fontSize: '2.5rem', color: "white" }}>
            <LiaBookSolid />
            </IconButton>
            <IconButton aria-label="upload" sx={{ fontSize: '2rem', color: "white" }} >
            <CgAttachment />
            </IconButton>

            <TextField 
            fullWidth 
            placeholder="Message ChatGPT" 
            sx={{ 
                width: '100%',
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
            
            <IconButton aria-label="send" sx={{ fontSize: '2.2rem', color: "white" }}>
            <MdKeyboardVoice />
            </IconButton>
            <IconButton aria-label="send" sx={{ fontSize: '2.5rem', color: "white" }}>
            <FaCircleArrowUp />
            </IconButton>
            
            <input 
            type="file" 
            style={{ display: 'none' }} 
            />
        </Box>

        <Box sx={{ position: 'relative',top:40, display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
            <Box>
            <Typography sx={{ color: "grey", fontSize: '16px', textAlign:'center' }}>ChatGPT can make mistakes. Check important info.</Typography>
            </Box>
        </Box>

        <Box sx={{ position: 'relative',bottom: 0, display: 'flex', alignItems: 'left', }}>
            <QuestionMarkDropdown/>
        </Box>

    </Box>
  );
};

export default DummyChat;
