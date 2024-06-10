import React, { useState } from 'react';
import { Box, Typography, IconButton, Menu, MenuItem, colors } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ChatHistory = ({ text }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant="subtitle1" style={{ color: 'white', flexGrow: 1 }}>{text}</Typography>
        <IconButton
          aria-label="more"
          aria-controls="menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={{ color: 'white'}}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Share</MenuItem>
        <MenuItem onClick={handleClose}>Rename</MenuItem>
        <MenuItem onClick={handleClose}>Archive</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </Box>
  );
}

export default ChatHistory;
