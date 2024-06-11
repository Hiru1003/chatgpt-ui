import React, { useState } from 'react';
import { Box, TextField, Button, IconButton, Typography, Divider, Link } from '@mui/material';
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

      {activeForm === 'yourPrompts' && !showExtendedForm && (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 2 }}>
            <TextField 
              placeholder="Search your prompt" 
              sx={{ mr: 2, bgcolor: '#333', color: 'white', width:'80%' , borderRadius:'12px'}} 
              InputProps={{ style: { color: 'white' } }}
            />
            <Link href="#" underline="none" color="primary" sx={{ fontWeight: 'bold' }} onClick={handleAddPromptClick}>
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

      {showExtendedForm && (
        <>
         <Typography variant="body1" sx={{ color: 'white', mb:2 }}>Title</Typography>
          <TextField 
            placeholder="Prompt Title (e.g. : 'Domain Name')" 
            sx={{ mb: 2, bgcolor: '#333', color: 'white', borderRadius:'12px' }} 
            InputProps={{ style: { color: 'white' } }}
          />

           <Typography variant="body1" sx={{ color: 'white', mb:2 }}>Description (optional)</Typography>
          <TextField 
            placeholder="List of domain names based on topics" 
            sx={{ mb: 2, bgcolor: '#333', color: 'white', borderRadius:'12px' }} 
            InputProps={{ style: { color: 'white' } }}
          />

          <Typography variant="body1" sx={{ color: 'white', mb:2 }}>Tags (optional)</Typography>
          <TextField 
            placeholder="Add new tag" 
            sx={{ mb: 2, bgcolor: '#333', color: 'white', borderRadius:'12px' }} 
            InputProps={{ style: { color: 'white' } }}
          />

          <Typography variant="body1" sx={{ color: 'white' , mb:2}}>Prompt: Use to indicate the fill in the blank part.</Typography>
          <TextField 
            placeholder="Enter your prompt here..." 
            sx={{ mb: 2, bgcolor: '#333', color: 'white', borderRadius:'12px' }} 
            InputProps={{ style: { color: 'white' } }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Button variant="contained" color="primary" sx={{ mr: 2 }}>Add Prompt</Button>
            <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => setShowExtendedForm(false)}
            sx={{ bgcolor: 'red', '&:hover': { bgcolor: '#ff3d00' } }} // Change the background color to red
            >
            Cancel
            </Button>

            
          </Box>
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
        </>
      )}

      {activeForm === 'communityPrompts' && (
        <>
          <TextField 
            placeholder="Search prompts" 
            sx={{ mr: 2,mb:2, bgcolor: '#333', color: 'white', borderRadius:'12px', width: '100%' }} 
            InputProps={{ style: { color: 'white' } }}
          />
          <CommunityPromptsContainer
            headline="Fix Grammar Errors"
            normalText="Fix grammar errors in the text"
          />
          <CommunityPromptsContainer
            headline="Act as an English Translator"
            normalText="Source: github.com/f/awesome-chatgpt-prompts"
          />
          <CommunityPromptsContainer
            headline="Act as a Job Interviewer"
            normalText="Source: github.com/f/awesome-chatgpt-prompts"
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
