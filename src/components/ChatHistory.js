import React, { useState } from 'react';
import { Box, Typography, IconButton, Menu, MenuItem, colors } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IoShareOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiInboxUnarchiveLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";


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
        <Typography variant="subtitle1" style={{ color: 'white', flexGrow: 1 ,fontSize: '19px'}}>{text}</Typography>
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
        PaperProps={{
          style: {
            backgroundColor: colors.grey[800],
          },
        }}
      >
       <MenuItem onClick={handleClose}>
        <IoShareOutline style={{ marginRight: '10px', color: 'white' }} /> 
        <Typography variant="body1" sx={{ color: 'white', fontSize: '16px' }}>Share</Typography>
      </MenuItem>

      <MenuItem onClick={handleClose}>
        <MdOutlineModeEdit style={{ marginRight: '10px', color: 'white' }} /> 
        <Typography variant="body1" sx={{ color: 'white', fontSize: '16px' }}>Rename</Typography>
      </MenuItem>

      <MenuItem onClick={handleClose}>
        <RiInboxUnarchiveLine style={{ marginRight: '10px', color: 'white' }} /> 
        <Typography variant="body1" sx={{ color: 'white', fontSize: '16px' }}>Archive</Typography>
      </MenuItem>

      <MenuItem onClick={handleClose}>
        <RiDeleteBin6Line style={{ marginRight: '10px', color: 'red' }} /> 
        <Typography variant="body1" sx={{ color: 'red', fontSize: '16px' }}>Delete</Typography>
      </MenuItem>
       
      </Menu>

    </Box>
  );
}

export default ChatHistory;
