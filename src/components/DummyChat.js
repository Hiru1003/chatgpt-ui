import React, { useState, useRef } from 'react';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import { MdContentCopy } from "react-icons/md";
import { BiDislike, BiLike } from "react-icons/bi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { CgAttachment } from "react-icons/cg";
import { MdKeyboardVoice } from "react-icons/md";
import { LiaBookSolid } from "react-icons/lia";
import { FaCircleArrowUp, FaRegPenToSquare } from "react-icons/fa6";
import ChatgptDropdownHeader from './ChatgptDropdownHeader';
import QuestionMarkDropdown from './QuestionMarkDropdown';
import UploadForm from './UploadForm';

const DummyChat = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeForm, setActiveForm] = useState('yourPrompts');
  const fileInputRef = useRef(null);

  const messages = [
    { text: 'Hiiii! ', sender: 'right' },
    { text: 'Hello! How can I help you today?', sender: 'left' },
    { text: 'I am looking for a recipe for cake.', sender: 'right' },
    { text: 'Sure, I can help with that! Do you have any specific ingredients in mind?', sender: 'left' },
    { text: 'I have eggs, flour, and sugar.', sender: 'right' },
    { text: 'Great! Here is a simple cake recipe you can try...', sender: 'left' },
  ];

  const handleUploadClick = () => {
    setShowForm(true);
    setActiveForm('yourPrompts');
  };

  const handleFileUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const switchToYourPrompts = () => {
    setActiveForm('yourPrompts');
  };

  const switchToCommunityPrompts = () => {
    setActiveForm('communityPrompts');
  };

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  return (
    <Box sx={{ padding: '10px', height: 'calc(100% - 50px)', overflowY: 'auto' ,bgcolor: 'grey.900', height: '100vh',}} >
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
              mb: 3,
              paddingRight: 10,
              paddingBottom: 2,
              paddingLeft: 10,
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
            {/* Icons on hover */}
            {(hoverIndex === index) && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: msg.sender === 'left' ? '-30px' : '-30px',
                  right: msg.sender === 'left' ? 'auto' : '70px',
                  left: msg.sender === 'left' ? '70px' : 'auto',
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

      {/* Text field container */}
      <Box sx={{ 
          position: 'absolute', 
          bottom: 60, 
          left: '60%',
          transform: 'translateX(-50%)',
          width: '60%', 
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '10px', 
          color: 'white',
      }}>
        <IconButton aria-label="upload" sx={{ fontSize: '2.5rem', color: "white" }} onClick={handleUploadClick}>
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

      <Box sx={{ position: 'relative', top: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
        <Box>
          <Typography sx={{ color: "grey", fontSize: '16px', textAlign:'center' }}>ChatGPT can make mistakes. Check important info.</Typography>
        </Box>
      </Box>

      <Box sx={{ position: 'relative', bottom: 0, display: 'flex', alignItems: 'left', }}>
        <QuestionMarkDropdown/>
      </Box>



{/* Forms */}
{showForm && (
        <>
          <Box 
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0, 0, 240, 0.05)',
              zIndex: 1200,
              backdropFilter: 'blur(2px)', // Apply blur to the background overlay
            }}
            onClick={handleFormClose}
          />
          <UploadForm 
            onClose={handleFormClose} 
            activeForm={activeForm} 
            switchToYourPrompts={switchToYourPrompts}
            switchToCommunityPrompts={switchToCommunityPrompts}
          />
        </>
      )}


    </Box>
  ); 
};

export default DummyChat;
