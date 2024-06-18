import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Box, Typography, Avatar } from '@mui/material';
import { LuBookDown } from "react-icons/lu";
import { MdSettings } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import CustomizeChatGPT from './CustomizeChatGPT'; 
import SettingsPage from './Settings';
import { useNavigate } from 'react-router-dom';

const AvatarDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [customizeChatGPTDialogOpen, setCustomizeChatGPTDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false); 
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsClick = () => {
    setSettingsDialogOpen(true); 
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    navigate('/login'); 
  };

  const handleCustomizeChatGPTClick = () => {
    setCustomizeChatGPTDialogOpen(true); 
    setAnchorEl(null); 
  };

  const handleCloseCustomizeChatGPTDialog = () => {
    setCustomizeChatGPTDialogOpen(false); 
  };

  const handleCloseSettingsDialog = () => {
    setSettingsDialogOpen(false); 
  };

  return (
    <div>
      <IconButton onClick={handleClick} aria-controls="avatar-menu" aria-haspopup="true">
        <Avatar sx={{
          bgcolor: 'orange',
          width: { xs: 24, sm: 40 }, // Small on xs devices, default on sm and above
          height: { xs: 24, sm: 40 },
          fontSize: { xs: '0.75rem', sm: '1rem' }
        }}>HI</Avatar>
      </IconButton>
      <Menu
        id="avatar-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: 'black', 
          },
        }}
      >
        <MenuItem onClick={handleCustomizeChatGPTClick}>
          <Box sx={{ bgcolor: 'black', p: 2, textAlign: 'left', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ color: 'white', mr: 3 , mt:1}}>
              <LuBookDown style={{ fontSize: '1.5rem' }} />
            </Box>
            <Box sx={{ color: 'white' }}>
              <Typography variant="subtitle1" style={{ color: 'white', fontSize: '1.2rem' }}>Customize ChatGPT</Typography>
            </Box>
          </Box>
        </MenuItem>

        <MenuItem onClick={handleSettingsClick}>
          <Box sx={{ bgcolor: 'black', p: 2, textAlign: 'left', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ color: 'white', mr: 3 , mt:1}}>
              <MdSettings style={{ fontSize: '1.5rem' }} />
            </Box>
            <Box sx={{ color: 'white' }}>
              <Typography variant="subtitle1" style={{ color: 'white', fontSize: '1.2rem' }}>Settings</Typography>
            </Box>
          </Box>
        </MenuItem>

        <MenuItem onClick={handleLogoutClick}>
          <Box sx={{ bgcolor: 'black', p: 2, textAlign: 'left', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ color: 'white', mr: 3 }}>
              <BiLogOutCircle style={{ fontSize: '1.5rem' }} />
            </Box>
            <Box sx={{ color: 'white' }}>
              <Typography variant="subtitle1" style={{ color: 'white', fontSize: '1.2rem' }}>Logout</Typography>
            </Box>
          </Box>
        </MenuItem>
      </Menu>

      {/* Render CustomizeChatGPT dialog if open */}
      {customizeChatGPTDialogOpen && (
        <>
          <Box 
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1300, 
            }}
          >
            <CustomizeChatGPT open={customizeChatGPTDialogOpen} onClose={handleCloseCustomizeChatGPTDialog} />
          </Box>
        </>
      )}

      {/* Render Settings dialog if open */}
      {settingsDialogOpen && (
        <>
          <Box 
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1300, 
            }}
          >
            <SettingsPage open={settingsDialogOpen} onClose={handleCloseSettingsDialog} />
          </Box>
        </>
      )}
    </div>
  );
};

export default AvatarDropdown;
