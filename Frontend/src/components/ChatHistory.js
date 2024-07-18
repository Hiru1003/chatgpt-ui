import React, { useState } from 'react';
import { Box, Typography, IconButton, Menu, MenuItem, TextField, colors, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IoShareOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiInboxUnarchiveLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router-dom';

const ChatHistory = ({ text, onDelete, onRename }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRename = () => {
    setIsRenaming(true);
    handleClose();
  };

  const handleRenameSubmit = () => {
    if (newText.trim()) {
      onRename(text, newText);
    }
    setIsRenaming(false);
  };

  const handleDeleteClick = () => {
    onDelete(text);
    handleClose();
  };

  const handleAchieveClick = () => {
    handleClose();
  };

  const handleShareClick = () => {
    handleClose();
  };

  return (
    <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
        <Typography variant="subtitle1" style={{ color: 'white', flexGrow: 1, fontSize: '17px', marginRight: '8px' }}>
          <Link to="/DummyChat" style={{ textDecoration: 'none', color: 'inherit' }}>{text}</Link>
        </Typography>
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
            marginTop: '5px',
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
        <MenuItem onClick={handleShareClick} sx={{ padding: '18px' }}>
          <IoShareOutline style={{ marginRight: '20px', color: 'white', fontSize: '1.3rem' }} />
          <Typography variant="body1" sx={{ color: 'white', fontSize: '1rem' }}>Share</Typography>
        </MenuItem>

        <MenuItem onClick={handleRename} sx={{ padding: '18px' }}>
          <MdOutlineModeEdit style={{ marginRight: '18px', color: 'white', fontSize: '1.3rem' }} />
          <Typography variant="body1" sx={{ color: 'white', fontSize: '1rem' }}>Rename</Typography>
        </MenuItem>

        <MenuItem onClick={handleAchieveClick} sx={{ padding: '18px' }}>
          <RiInboxUnarchiveLine style={{ marginRight: '20px', color: 'white', fontSize: '1.3rem' }} />
          <Typography variant="body1" sx={{ color: 'white', fontSize: '1rem' }}>Achieve</Typography>
        </MenuItem>

        <MenuItem onClick={handleDeleteClick} sx={{ padding: '20px' }}>
          <RiDeleteBin6Line style={{ marginRight: '20px', color: 'red', fontSize: '1.3rem' }} />
          <Typography variant="body1" sx={{ color: 'red', fontSize: '1rem' }}>Delete</Typography>
        </MenuItem>
      </Menu>

      <Dialog open={isRenaming} onClose={() => setIsRenaming(false)} PaperProps={{ style: { backgroundColor: '#333' } }}>
        <DialogTitle sx={{ color: 'white' }}>Rename Chat</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Name"
            type="text"
            fullWidth
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            sx={{ input: { color: 'white' }, label: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsRenaming(false)} sx={{ color: 'white' }}>
            Cancel
          </Button>
          <Button onClick={handleRenameSubmit} sx={{ color: 'white' }}>
            Rename
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChatHistory;