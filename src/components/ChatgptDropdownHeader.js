import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Box, colors, Typography } from '@mui/material';
import { RiWechatChannelsFill } from "react-icons/ri";
import { IoChatbubblesOutline } from "react-icons/io5";
import { BsStars } from 'react-icons/bs';
import { MdKeyboardArrowDown } from "react-icons/md";
import AvatarDropdown from './AvatarDropdown';
import logo from '../assets/2.png';

const MainHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="img" src={logo} sx={{ width: { xs: '100px', sm: '150px', md: '200px' } }} />
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
              <Box
                sx={{
                  bgcolor: 'black',
                  p: 2,
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: { xs: '0.8rem', sm: '1rem' },
                }}
              >
                <Box sx={{ color: 'white', mr: 3 }}>
                  <BsStars style={{ fontSize: { xs: '1rem', sm: '1.5rem' } }} />
                </Box>
                <Box sx={{ color: 'white' }}>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontSize: { xs: '1rem', sm: '1.2rem' } }}>ChatGPT Plus</Typography>
                  <Typography variant="body2" sx={{ color: 'white', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>Get GPT-4, DALL-E, and more</Typography>
                </Box>
              </Box>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <Box
                sx={{
                  bgcolor: 'black',
                  p: 2,
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: { xs: '0.8rem', sm: '1rem' },
                }}
              >
                <Box sx={{ color: 'white', mr: 3 }}>
                  <RiWechatChannelsFill style={{ fontSize: { xs: '1rem', sm: '1.5rem' } }} />
                </Box>
                <Box sx={{ color: 'white' }}>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontSize: { xs: '1rem', sm: '1.2rem' } }}>ChatGPT</Typography>
                  <Typography variant="body2" sx={{ color: 'white', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>Great for everyday tasks</Typography>
                </Box>
              </Box>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <Box
                sx={{
                  bgcolor: 'black',
                  p: 2,
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: { xs: '0.8rem', sm: '1rem' },
                }}
              >
                <Box sx={{ color: 'white', mr: 3 }}>
                  <IoChatbubblesOutline style={{ fontSize: { xs: '1rem', sm: '1.5rem' } }} />
                </Box>
                <Box sx={{ color: 'white' }}>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontSize: { xs: '1rem', sm: '1.2rem' } }}>Temporary chat</Typography>
                </Box>
              </Box>
            </MenuItem>
          </Menu>
        </Box>

        {/* Avatar */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', position: 'absolute', top: '20px', right: '30px' }}>
          <AvatarDropdown />
        </Box>
      </Box>
    </Box>
  );
};

export default MainHeader;
