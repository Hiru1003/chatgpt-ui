import React, { useState } from 'react';
import { Box, TextField, Button, IconButton, Typography, Divider, Link } from '@mui/material';
import { Close } from '@mui/icons-material';

const UploadForm = ({ onClose }) => {
  const [activeForm, setActiveForm] = useState('yourPrompts');

  const switchToYourPrompts = () => setActiveForm('yourPrompts');
  const switchToCommunityPrompts = () => setActiveForm('communityPrompts');

  return (
    <Box sx={{ 
      position: 'fixed',
      top: '50%',
      left: '50%',
      width: '40%',
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
      <Typography variant="subtitle1" style={{ color: 'white', fontSize: '18px', fontWeight: 'normal', paddingBottom: 13, textAlign: 'center' }}>
        Prompts are message templates that you can quickly fill in the chat<br/> input. Some prompts come with variables.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'left', gap: 3, mt: 2, mb: 3, alignItems: 'center' }}>
        <Typography 
          variant="subtitle1" 
          style={{ color: activeForm === 'yourPrompts' ? 'lightskyblue' : 'white', fontSize: '18px', fontWeight: 'normal', textAlign: 'center', cursor: 'pointer' }}
          onClick={switchToYourPrompts}
        >
          Your Prompts
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          bgcolor: 'white', 
          color: 'black', 
          borderRadius: '15px', 
          px: 1.5, 
          py: 0.5,
          marginRight: '40px'
        }}>
          0
        </Box>
        <Typography 
          variant="subtitle1" 
          style={{ color: activeForm === 'communityPrompts' ? 'lightskyblue' : 'white', fontSize: '18px', fontWeight: 'normal', textAlign: 'center', cursor: 'pointer' }}
          onClick={switchToCommunityPrompts}
        >
          Community Prompts
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          bgcolor: 'white', 
          color: 'black', 
          borderRadius: '10px', 
          px: 1.5, 
          py: 0.5,
        }}>
          160
        </Box>
      </Box>
      <Divider sx={{ borderColor: 'white', borderBottomWidth: 2, mb: 2 }} />

      {activeForm === 'yourPrompts' && (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 2 }}>
            <TextField 
                placeholder="Search your prompt" 
                sx={{ mr: 2, bgcolor: '#333', color: 'white', width:'85%' , borderRadius:'12px'}} 
                InputProps={{ style: { color: 'white' } }}
            />
            <Link href="#" underline="none" color="primary" sx={{ fontWeight: 'bold' }}>
            + Add Prompt
            </Link>
         </Box>
            <TextField 
                placeholder="Filter by tags" 
                sx={{ mr: 2,mb:2, bgcolor: '#333', color: 'white', borderRadius:'12px' }} 
                InputProps={{ style: { color: 'white' } }}
            />

            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'center', 
                mb: 2, 
                border: '4px white dashed', 
                padding: 2, 
                borderRadius:'12px' ,
                justifyContent: 'center'
            }}>
            <Typography 
                variant="subtitle1" 
                style={{ color: activeForm === 'communityPrompts' ? 'lightskyblue' : 'white', fontSize: '18px', fontWeight: 'normal', textAlign: 'center', cursor: 'pointer' }}
                onClick={switchToCommunityPrompts}
                >
                You have no saved prompts. Tap "Add Prompt" to add a new <br/>prompt.
                </Typography>
                
            </Box>
            <Divider sx={{ borderColor: 'white', borderBottomWidth: 2, mb: 3, mt:3 }} />

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
        sx={{ width: '100px', mx: 'auto' }} 
        >
        Close
      </Button>
    </Box>
  );
};

export default UploadForm;
