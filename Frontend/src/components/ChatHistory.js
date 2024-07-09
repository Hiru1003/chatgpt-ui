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
    <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
        <Typography variant="subtitle1" style={{ color: 'white', flexGrow: 1, fontSize: '17px', marginRight: '8px' }}>{text}</Typography>
        <IconButton
          aria-label="more"
          aria-controls="menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={{ color: 'white', zIndex: 1, position: 'relative' }}
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
            zIndex: 2,
            marginTop: '5px', // Adjust margin top to prevent overlap with IconButton
          },
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose} sx={{ padding: '18px' }}>
          <IoShareOutline style={{ marginRight: '20px', color: 'white', fontSize: '1.3rem' }} />
          <Typography variant="body1" sx={{ color: 'white', fontSize: '1rem' }}>Share</Typography>
        </MenuItem>

        <MenuItem onClick={handleClose} sx={{ padding: '18px' }}>
          <MdOutlineModeEdit style={{ marginRight: '18px', color: 'white', fontSize: '1.3rem' }} />
          <Typography variant="body1" sx={{ color: 'white', fontSize: '1rem' }}>Rename</Typography>
        </MenuItem>

        <MenuItem onClick={handleClose} sx={{ padding: '18px' }}>
          <RiInboxUnarchiveLine style={{ marginRight: '20px', color: 'white', fontSize: '1.3rem' }} />
          <Typography variant="body1" sx={{ color: 'white', fontSize: '1rem' }}>Archive</Typography>
        </MenuItem>

        <MenuItem onClick={handleClose} sx={{ padding: '20px' }}>
          <RiDeleteBin6Line style={{ marginRight: '20px', color: 'red', fontSize: '1.3rem' }} />
          <Typography variant="body1" sx={{ color: 'red', fontSize: '1rem' }}>Delete</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default ChatHistory;
