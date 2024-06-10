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

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'ChatGPT',
        text: 'Check out ChatGPT!',
        url: window.location.href,
      }).catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle1" style={{ color: 'white', fontSize: '1.5rem' }}>ChatGPT</Typography>
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

        <IconButton onClick={handleShareClick}>
          <BsBoxArrowUp style={{ color: colors.grey[500], fontSize: '1.8rem' }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default MainHeader;
