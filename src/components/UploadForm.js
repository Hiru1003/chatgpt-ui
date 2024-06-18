import React, { useState } from 'react';
import { Box, TextField, Button, IconButton, Typography, Divider, Link, Hidden } from '@mui/material';
import { Close } from '@mui/icons-material';
import CommunityPromptsContainer from './CommunityPromptsContainer';

const UploadForm = ({ onClose }) => {
  const [activeForm, setActiveForm] = useState('yourPrompts');
  const [showExtendedForm, setShowExtendedForm] = useState(false);

  const switchToYourPrompts = () => {
    setActiveForm('yourPrompts');
    setShowExtendedForm(false);
  };

  const switchToCommunityPrompts = () => {
    setActiveForm('communityPrompts');
    setShowExtendedForm(false);
  };

  const handleAddPromptClick = () => {
    setShowExtendedForm(true);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '90%',
        maxWidth: '600px',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'black',
        p: 3,
        borderRadius: 1,
        boxShadow: 24,
        zIndex: 1300,
      }}
    >
      <IconButton sx={{ alignSelf: 'flex-end' }} onClick={onClose}>
        <Close sx={{ color: 'white' }} />
      </IconButton>

      <Typography variant="h5" sx={{ color: 'white', mb: 3, textAlign: 'center' }}>Prompt Library</Typography>
      <Typography variant="body1" sx={{ color: 'white', mb: 3, textAlign: 'center' }}>
        Prompts are message templates that you can quickly fill in the chat input. Some prompts come with variables.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Hidden mdDown>
          <Typography
            variant="body1"
            onClick={switchToYourPrompts}
            sx={{
              color: activeForm === 'yourPrompts' ? 'lightskyblue' : 'white',
              fontSize: '1rem',
              fontWeight: 'normal',
              cursor: 'pointer',
              mr: 2,
            }}
          >
            Your Prompts
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'white',
              color: 'black',
              borderRadius: '15px',
              px: 2,
            }}
          >
            0
          </Box>

          <Typography
            variant="body1"
            onClick={switchToCommunityPrompts}
            sx={{
              color: activeForm === 'communityPrompts' ? 'lightskyblue' : 'white',
              fontSize: '1rem',
              fontWeight: 'normal',
              cursor: 'pointer',
              ml: 2,
            }}
          >
            Community Prompts
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'white',
              color: 'black',
              borderRadius: '15px',
              px: 2,
            }}
          >
            160
          </Box>
        </Hidden>

        <Hidden lgUp>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography
              variant="body1"
              onClick={switchToYourPrompts}
              sx={{
                color: activeForm === 'yourPrompts' ? 'lightskyblue' : 'white',
                fontSize: '0.9rem',
                fontWeight: 'normal',
                cursor: 'pointer',
                mb: 1,
              }}
            >
              Your Prompts
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'white',
                color: 'black',
                borderRadius: '15px',
                px: 2,
                mb: 1,
              }}
            >
              0
            </Box>
            <Typography
              variant="body1"
              onClick={switchToCommunityPrompts}
              sx={{
                color: activeForm === 'communityPrompts' ? 'lightskyblue' : 'white',
                fontSize: '0.9rem',
                fontWeight: 'normal',
                cursor: 'pointer',
                mt: 1,
              }}
            >
              Community Prompts
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'white',
                color: 'black',
                borderRadius: '15px',
                px: 2,
              }}
            >
              160
            </Box>
          </Box>
        </Hidden>
      </Box>

      <Divider sx={{ borderColor: 'white', borderBottomWidth: 2, mb: 3 }} />

      {activeForm === 'yourPrompts' && !showExtendedForm && (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 2 }}>
            <TextField
              placeholder="Search your prompt"
              sx={{ mr: 2, bgcolor: '#333', color: 'white', flex: 1, borderRadius: '12px' }}
              InputProps={{ style: { color: 'white' } }}
            />
            <Link href="#" underline="none" color="primary" sx={{ fontWeight: 'bold' }} onClick={handleAddPromptClick}>
              + Add Prompt
            </Link>
          </Box>
          <TextField
            placeholder="Filter by tags"
            sx={{ mr: 2, mb: 2, bgcolor: '#333', color: 'white', flex: 1, borderRadius: '12px' }}
            InputProps={{ style: { color: 'white' } }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 2,
              border: '4px white dashed',
              p: 2,
              borderRadius: '12px',
              textAlign: 'center',
            }}
          >
            <Typography variant="body1" sx={{ color: 'white', fontSize: '0.9rem' }}>
              You have no saved prompts. Tap "Add Prompt" to add a new prompt.
            </Typography>
          </Box>
          <Divider sx={{ borderColor: 'white', borderBottomWidth: 2, mb: 3 }} />
        </>
      )}

      {showExtendedForm && (
        <>
          <TextField
            placeholder="Prompt Title (e.g. : 'Domain Name')"
            sx={{ mb: 2, bgcolor: '#333', color: 'white', borderRadius: '12px' }}
            InputProps={{ style: { color: 'white' } }}
          />

          <TextField
            placeholder="List of domain names based on topics"
            sx={{ mb: 2, bgcolor: '#333', color: 'white', borderRadius: '12px' }}
            InputProps={{ style: { color: 'white' } }}
          />

          <TextField
            placeholder="Add new tag"
            sx={{ mb: 2, bgcolor: '#333', color: 'white', borderRadius: '12px' }}
            InputProps={{ style: { color: 'white' } }}
          />

          <TextField
            placeholder="Enter your prompt here..."
            sx={{ mb: 2, bgcolor: '#333', color: 'white', borderRadius: '12px' }}
            InputProps={{ style: { color: 'white' } }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Button variant="contained" color="primary" sx={{ mr: 2 }}>
              Add Prompt
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShowExtendedForm(false)}
              sx={{ bgcolor: 'red', '&:hover': { bgcolor: '#ff3d00' } }}
            >
              Cancel
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 2,
              border: '4px white dashed',
              p: 2,
              borderRadius: '12px',
              textAlign: 'center',
            }}
          >
            <Typography variant="body1" sx={{ color: 'white', fontSize: '0.9rem' }}>
              You have no saved prompts. Tap "Add Prompt" to add a new prompt.
            </Typography>
          </Box>
        </>
      )}

      {activeForm === 'communityPrompts' && (
        <>
          <TextField
            placeholder="Search prompts"
            sx={{ mr: 2, mb: 2, bgcolor: '#333', color: 'white', borderRadius: '12px', flex: 1 }}
            InputProps={{ style: { color: 'white' } }}
          />
          <CommunityPromptsContainer headline="Fix Grammar Errors" normalText="Fix grammar errors in the text" />
          <CommunityPromptsContainer headline="Act as an English Translator" normalText="Source: github.com/f/awesome-chatgpt-prompts" />
          <CommunityPromptsContainer headline="Act as a Job Interviewer" normalText="Source: github.com/f/awesome-chatgpt-prompts" />
        </>
      )}

      <Button variant="contained" color="primary" onClick={onClose} sx={{ width: '100px', mx: 'auto', mt: 2 }}>
        Close
      </Button>
   

    </Box>
  );
};

export default UploadForm;
