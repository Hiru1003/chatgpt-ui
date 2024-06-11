import React from 'react';
import { Box, TextField, Button, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

const UploadForm = ({ onClose, activeForm, switchToYourPrompts, switchToCommunityPrompts }) => {
  return (
    <Box sx={{ 
      position: 'fixed',
      top: '50%',
      left: '50%',
      width: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex', 
      flexDirection: 'column', 
      bgcolor: 'black', 
      p: 3, 
      borderRadius: 1,
      boxShadow: 24,
      zIndex: 1300, 
    }}>
      <IconButton 
        sx={{ alignSelf: 'flex-end' }} 
        onClick={onClose}
      >
        <Close sx={{ color: 'white' }} />
      </IconButton>

      <Typography variant="subtitle1" style={{ color: 'white', fontSize: '29px', fontWeight: 'bold', mb: 3, textAlign: 'center' }}>Prompt Library</Typography>
      <Typography variant="subtitle1" style={{ color: 'white', fontSize: '18px', fontWeight: 'normal', paddingBottom: 8, textAlign: 'center' }}>
        Prompts are message templates that you can quickly fill in the chat<br/> input. Some prompts come with variables.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2, mb: 3 }}>
        <Typography 
          variant="subtitle1" 
          style={{ color: activeForm === 'yourPrompts' ? 'orange' : 'white', fontSize: '18px', fontWeight: 'normal', textAlign: 'center', cursor: 'pointer' }}
          onClick={switchToYourPrompts}
        >
          Your Prompts
        </Typography>
        <Typography 
          variant="subtitle1" 
          style={{ color: activeForm === 'communityPrompts' ? 'orange' : 'white', fontSize: '18px', fontWeight: 'normal', textAlign: 'center', cursor: 'pointer' }}
          onClick={switchToCommunityPrompts}
        >
          Community Prompts
        </Typography>
      </Box>

      {activeForm === 'yourPrompts' && (
        <>
          <TextField 
            placeholder="First Field" 
            sx={{ mb: 2, bgcolor: '#333', color: 'white' }} 
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField 
            placeholder="Second Field" 
            sx={{ mb: 2, bgcolor: '#333', color: 'white' }} 
            InputProps={{ style: { color: 'white' } }}
          />
        </>
      )}

      {activeForm === 'communityPrompts' && (
        <>
          <TextField 
            placeholder="Community Field 1" 
            sx={{ mb: 2, bgcolor: '#333', color: 'white' }} 
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField 
            placeholder="Community Field 2" 
            sx={{ mb: 2, bgcolor: '#333', color: 'white' }} 
            InputProps={{ style: { color: 'white' } }}
          />
        </>
      )}

      <Button 
        variant="contained" 
        color="primary" 
        onClick={onClose}
      >
        Submit
      </Button>
    </Box>
  );
};

export default UploadForm;
