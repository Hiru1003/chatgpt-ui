import React from 'react';
import { Box, Typography, Button, Divider, TextField, useMediaQuery } from '@mui/material';

const CustomizeChatGPT = ({ onClose }) => {
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme => theme.breakpoints.between('sm', 'md'));

  return (
    <Box sx={{ 
      position: 'fixed',
      top: '50%',
      left: '50%',
      width: isSmallScreen ? '90%' : isMediumScreen ? '60%' : '40%',
      transform: 'translate(-50%, -50%)',
      display: 'flex', 
      flexDirection: 'column', 
      bgcolor: 'black', 
      p: isSmallScreen ? 2 : 3, 
      borderRadius: 1,
      boxShadow: 24,
      zIndex: 1300, 
    }}>
       <Typography 
          variant="subtitle1" 
          style={{ 
            color: 'white', 
            fontSize: isSmallScreen ? '18px' : isMediumScreen ? '20px' : '22px', 
            fontWeight: 'bold', 
            pb: 5, 
            textAlign: 'left' 
          }}
        >
          Customize ChatGPT
        </Typography>
        <Divider sx={{ borderColor: 'white', borderBottomWidth: 1, mb: 2 }} />


        <Typography 
          variant="body1" 
          style={{ 
            color: 'white', 
            fontSize: isSmallScreen ? '16px' : '18px',  
            paddingBottom: 3, 
            textAlign: 'left' 
          }}
        > 
          What would you like ChatGPT to know about you to provide better responses?
        </Typography>
        <TextField 
            placeholder="Enter your prompt here..." 
            multiline
            rows={4}
            sx={{ mb: 2, bgcolor: '#333', color: 'white', borderRadius: '12px' }} 
            InputProps={{ style: { color: 'white' } }}
          />
          <Typography 
            variant="body1" 
            style={{ 
              color: 'grey', 
              fontSize: isSmallScreen ? '16px' : '18px',  
              paddingBottom: 1, 
              textAlign: 'left', 
              marginRight: 3 
            }}
          > 
            0/1500
          </Typography>

         <Typography 
           variant="body1" 
           style={{ 
             color: 'white', 
             fontSize: isSmallScreen ? '16px' : '18px',  
             paddingBottom: 3, 
             textAlign: 'left' 
           }}
         > 
           How would you like ChatGPT to respond?
          </Typography>
          <TextField 
              placeholder="Enter your prompt here..." 
              multiline
              rows={4}
              sx={{ mb: 2, bgcolor: '#333', color: 'white', borderRadius: '12px' }} 
              InputProps={{ style: { color: 'white' } }}
            />
            <Typography 
              variant="body1" 
              style={{ 
                color: 'grey', 
                fontSize: isSmallScreen ? '16px' : '18px',  
                paddingBottom: 1, 
                textAlign: 'left', 
                marginRight: 3 
              }}
            > 
              0/1500
            </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
            <Button onClick={onClose} variant="contained">Close</Button>
            <Button onClick={onClose} variant="contained">Save</Button>
          </Box>
    </Box>
  );
}

export default CustomizeChatGPT;
