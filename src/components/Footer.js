import React from 'react';
import { BsStars } from 'react-icons/bs'; 
import { Box, Typography } from '@mui/material';

const SidebarFooter = () => {
  return (
    <Box sx={{ bgcolor: 'black', p: 2, textAlign: 'left', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ color: 'white', mr: 3 }}>
        <BsStars style={{ fontSize: '1.5rem', }} />
      </Box>
      <Box sx={{ color: 'white', }}>
        <Typography style={{color: 'white' , fontSize: '1.2rem'}}>Upgrade Plan<br/></Typography>
        <Typography   style={{color: 'white', fontSize: '0.9rem' }}>Get GPT-4, DALL-E, and more<br/></Typography>
     </Box>
    </Box>
  );
}

export default SidebarFooter;
