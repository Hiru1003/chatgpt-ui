import React, { useState, useRef } from 'react';
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import { FaCircleArrowUp } from "react-icons/fa6";
import { CgAttachment } from "react-icons/cg";
import { MdKeyboardVoice, MdMenu } from "react-icons/md";
import { RiBook3Fill } from "react-icons/ri"; 
import UploadForm from './UploadForm';
import QuestionMarkDropdown from './QuestionMarkDropdown';

const TextAreaTemplete = ({ inputText, setInputText, handleSubmit }) => {
  const [showForm, setShowForm] = useState(false);
  const [activeForm, setActiveForm] = useState('yourPrompts');
  const [showIcons, setShowIcons] = useState(false);
  const fileInputRef = useRef(null);
  const isSmallScreen = useMediaQuery('(max-width:1000px)');
  
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
          width: { xs: '90%', sm: '90%' },
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px',
          color: 'white',
        }}
      >
        {/* Menu Icon for smaller screens */}
        {isSmallScreen ? (
          <IconButton aria-label="menu" onClick={toggleIcons} sx={{ fontSize: { xs: '1.8rem', sm: '1.8rem' }, color: "white" }}>
            <MdMenu />
          </IconButton>
        ) : (
          <>
            <IconButton aria-label="upload" sx={{ fontSize: { xs: '1.8rem', sm: '1.8rem' }, color: "white" }} onClick={handleUploadClick}>
              <RiBook3Fill />
            </IconButton>

            <IconButton aria-label="upload" sx={{ fontSize: { xs: '1.5rem', sm: '1.5rem' }, color: "white" }} onClick={handleFileUploadButtonClick}>
              <CgAttachment />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </IconButton>

            <IconButton aria-label="send" sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem' }, color: "white" }}>
              <MdKeyboardVoice />
            </IconButton>
          </>
        )}

        {/* Icons inside the menu for smaller screens */}
        {isSmallScreen && showIcons && (
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <IconButton aria-label="upload" sx={{ fontSize: { xs: '1.5rem', sm: '1.5rem' }, color: "white" }} onClick={handleUploadClick}>
              <RiBook3Fill />
            </IconButton>

            <IconButton aria-label="upload" sx={{ fontSize: { xs: '1.5rem', sm: '1.5rem' }, color: "white" }} onClick={handleFileUploadButtonClick}>
              <CgAttachment />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </IconButton>

            <IconButton aria-label="send" sx={{ fontSize: { xs: '1.5rem', sm: '1.5rem' }, color: "white" }}>
              <MdKeyboardVoice />
            </IconButton>
          </Box>
        )}

        {/* Text Area */}
        <Box sx={{ width: '100%', mr: 1, position: 'relative' }}>
          
          <textarea
            placeholder="Message ChatGPT"
            value={inputText}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); 
                handleSubmit(e); 
              }
            }}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid black',
              borderRadius: '15px',
              backgroundColor: '#333',
              color: 'white',
              resize: 'none',
              fontSize: '1rem',
              lineHeight: '0.9rem',
              verticalAlign: 'middle',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
            }}
          />
        </Box>

        <IconButton type="submit" aria-label="Send" sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem' }, color: "white" }}>
            <FaCircleArrowUp />
        </IconButton>
      </Box>

      <Box sx={{ position: 'relative', bottom: -35, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{ color: "grey", fontSize: { xs: '8px', sm: '14px' }, textAlign: 'center' }}>
          ChatGPT can make mistakes. Check important info.
        </Typography>
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
  );
};

export default TextAreaTemplete;
