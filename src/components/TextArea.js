import React, { useState, useRef } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { FaCircleArrowUp } from "react-icons/fa6";
import { CgAttachment } from "react-icons/cg";
import { MdKeyboardVoice, MdMenu } from "react-icons/md"; // Added MdMenu icon
import { LiaBookSolid } from "react-icons/lia";
import UploadForm from './UploadForm';
import QuestionMarkDropdown from './QuestionMarkDropdown';

const TextAreaTemplete = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeForm, setActiveForm] = useState('yourPrompts');
  const [showIcons, setShowIcons] = useState(true); // Initially show icons in larger screens
  const fileInputRef = useRef(null);

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

  const toggleIcons = () => {
    setShowIcons(!showIcons);
  };

  return (
    <div>
      <Box
        sx={{
          position: 'absolute',
          bottom: 45,
          left: '50%',
          transform: 'translateX(-50%)',
          width: { xs: '90%', sm: '70%' },
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px',
          color: 'white',
        }}
      >
        {/* New Menu Icon */}
        <IconButton aria-label="menu" onClick={toggleIcons} sx={{ fontSize: { xs: '1.8rem', sm: '1.8rem' }, color: "white" }}>
          <MdMenu />
        </IconButton>

        {/* Expanded Icons (shown in larger screens) */}
        {showIcons && (
          <>
            <IconButton aria-label="upload" sx={{ fontSize: { xs: '1.8rem', sm: '1.8rem' }, color: "white" }} onClick={handleUploadClick}>
            <LiaBookSolid />
            </IconButton>

            <IconButton aria-label="upload" sx={{ fontSize: { xs: '1.5rem', sm: '1.5rem' }, color: "white" }} onClick={handleFileUploadButtonClick}>
              <CgAttachment />
            </IconButton>

            <IconButton aria-label="send" sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem' }, color: "white" }}>
              <MdKeyboardVoice />
            </IconButton>

            
          </>
        )}

        {/* Text Area */}
        <Box sx={{ width: '100%', mr: 1, position: 'relative' }}>
          <textarea
            placeholder="Message ChatGPT"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid black',
              borderRadius: '15px',
              backgroundColor: '#333',
              color: 'white',
              resize: 'none',
              fontSize: '1rem',
              lineHeight: '1.2rem',
              verticalAlign: 'middle',
            }}
          />
        </Box>
        <IconButton aria-label="send" sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem' }, color: "white" }}>
              <FaCircleArrowUp />
            </IconButton>
      </Box>
      

      {/* Disclaimer */}
      <Box sx={{ position: 'relative', bottom: -30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{ color: "grey", fontSize: { xs: '12px', sm: '16px' }, textAlign: 'center' }}>ChatGPT can make mistakes. Check important info.</Typography>
      </Box>

      {/* Question mark dropdown */}
      <Box sx={{ position: 'relative', bottom: 0, display: 'flex', alignItems: 'left' }}>
        <QuestionMarkDropdown />
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
              backdropFilter: 'blur(2px)',
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
    </div>
  )
}

export default TextAreaTemplete;
