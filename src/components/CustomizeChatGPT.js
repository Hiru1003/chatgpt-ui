import React from 'react';
import { Box, Typography, Button,Divider,TextField } from '@mui/material';

const CustomizeChatGPT = ({ onClose }) => {
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
       <Typography variant="subtitle1" style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', pb: 5, textAlign: 'left' }}>
          Customize ChatGPT
        </Typography>
        <Divider sx={{ borderColor: 'white', borderBottomWidth: 1, mb: 2 }} />


        <Typography variant="body1" style={{ color: 'white', fontSize: '18px',  paddingBottom:3, textAlign: 'left' }}> 
        What would you like ChatGPT to know about you to provide better responses?
        </Typography>
        <TextField 
            placeholder="Enter your prompt here..." 
            multiline
            rows={4}
            sx={{ mb: 2, bgcolor: '#333', color: 'white', borderRadius:'12px' }} 
            InputProps={{ style: { color: 'white' } }}
          />
          <Typography variant="body1" style={{ color: 'grey', fontSize: '18px',  paddingBottom:1 , textAlign: 'left' , marginRight: 3}}> 
          0/1500
         </Typography>

         <Typography variant="body1" style={{ color: 'white', fontSize: '18px',  paddingBottom:3, textAlign: 'left' }}> 
         How would you like ChatGPT to respond?
          </Typography>
          <TextField 
              placeholder="Enter your prompt here..." 
              multiline
              rows={4}
              sx={{ mb: 2, bgcolor: '#333', color: 'white', borderRadius:'12px' }} 
              InputProps={{ style: { color: 'white' } }}
            />
            <Typography variant="body1" style={{ color: 'grey', fontSize: '18px',  paddingBottom:1 , textAlign: 'left' , marginRight: 3}}> 
            0/1500
          </Typography>


          <Box sx={{ display: 'flex', justifyContent: 'center',gap:3, mt: 2 }}>
            <Button onClick={onClose} variant="contained">Close</Button>
            <Button onClick={onClose} variant="contained">Save</Button>
          </Box>
 </Box>

  );
}

export default CustomizeChatGPT;
