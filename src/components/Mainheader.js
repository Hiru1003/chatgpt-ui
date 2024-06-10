import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Box, colors, Typography } from '@mui/material';
import { BsBoxArrowUp } from "react-icons/bs";
import { RiWechatChannelsFill } from "react-icons/ri";
import { IoChatbubblesOutline } from "react-icons/io5";
import { BsStars } from 'react-icons/bs';
import { MdKeyboardArrowDown } from "react-icons/md";

const MainHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file);
    }
  };

  const fileInputRef = React.useRef(null);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle1" style={{ color: 'white', fontSize: '1.2rem' }}>Chat GPT</Typography>
          <IconButton onClick={handleClick} aria-controls="menu" aria-haspopup="true">
            <MdKeyboardArrowDown style={{ color: colors.grey[500] }} />
          </IconButton>
          <Menu
            id="menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              style: {
                backgroundColor: 'black', 
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <Box sx={{ bgcolor: 'black', p: 2, textAlign: 'left', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ color: 'white', mr: 3 }}>
                  <BsStars style={{ fontSize: '1.5rem' }} />
                </Box>
                <Box sx={{ color: 'white' }}>
                  <Typography variant="subtitle1" style={{ color: 'white', fontSize: '1.2rem' }}>ChatGPT Plus</Typography>
                  <Typography variant="body2" style={{ color: 'white', fontSize: '0.9rem' }}>Get GPT-4, DALL-E, and more</Typography>
                </Box>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Box sx={{ bgcolor: 'black', p: 2, textAlign: 'left', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ color: 'white', mr: 3 }}>
                  <RiWechatChannelsFill style={{ fontSize: '1.5rem' }} />
                </Box>
                <Box sx={{ color: 'white' }}>
                  <Typography variant="subtitle1" style={{ color: 'white', fontSize: '1.2rem' }}>ChatGPT</Typography>
                  <Typography variant="body2" style={{ color: 'white', fontSize: '0.9rem' }}>Great for everyday tasks</Typography>
                </Box>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Box sx={{ bgcolor: 'black', p: 2, textAlign: 'left', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ color: 'white', mr: 3 }}>
                  <IoChatbubblesOutline style={{ fontSize: '1.5rem' }} />
                </Box>
                <Box sx={{ color: 'white' }}>
                  <Typography variant="subtitle1" style={{ color: 'white', fontSize: '1.2rem' }}>Temporary chat</Typography>
                </Box>
              </Box>
            </MenuItem>
          </Menu>
        </Box>
        <IconButton onClick={handleUploadClick}>
          <BsBoxArrowUp style={{ color: colors.grey[500], fontSize: '1.8rem'  }} />
        </IconButton>
      </Box>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
    </Box>
  );
}

export default MainHeader;
