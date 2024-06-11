import React, { useState } from 'react';
import { Box, IconButton, TextField, Avatar, Typography } from '@mui/material';
import { FaCircleArrowUp } from "react-icons/fa6";
import MainpageContainer from './MainpageContainer';
import { SiOpenai } from "react-icons/si";
import ChatgptDropdownHeader from './ChatgptDropdownHeader';
import { CgAttachment } from "react-icons/cg";
import { MdKeyboardVoice } from "react-icons/md";
import { LiaBookSolid } from "react-icons/lia";
import UploadForm from './UploadForm';
import AvatarDropdown from './AvatarDropdown';

const MainPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeForm, setActiveForm] = useState('yourPrompts');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fileInputRef = React.useRef(null);

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
    }}>

      {/* Avatar */}
      <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', position: 'absolute', top: '20px', right: '30px' }}>
        <AvatarDropdown/>
      </Box>

      {/* Main header */}
      <Box>
        <ChatgptDropdownHeader/>
      </Box>
      
      {/* OpenAI Icon */}
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 20 }}>
        <SiOpenai size={70} style={{ color: 'white' }} />
      </Box>

      {/* Main page container */}
      <Box sx={{ display: 'flex', gap: 2, mb: 18 }}>
        <MainpageContainer />
      </Box>

      {/* Text Field and IconButton */}
      <Box sx={{ 
        mt: 2, display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: '10px', 
        color: 'white', 
        justifyContent: 'center',
      }}>
        <IconButton aria-label="upload" sx={{ fontSize: '2.5rem', color: "white" }} onClick={handleUploadClick}>
          <LiaBookSolid />
        </IconButton>
        <IconButton aria-label="upload" sx={{ fontSize: '2rem', color: "white" }} onClick={handleFileUploadButtonClick}>
          <CgAttachment />
        </IconButton>

        <TextField 
          fullWidth 
          placeholder="Message ChatGPT" 
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
        
        <IconButton aria-label="send" sx={{ fontSize: '2.2rem', color: "white" }}>
          <MdKeyboardVoice />
        </IconButton>
        <IconButton aria-label="send" sx={{ fontSize: '2.5rem', color: "white" }}>
          <FaCircleArrowUp />
        </IconButton>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileUpload} 
        />
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
}

export default MainPage;
