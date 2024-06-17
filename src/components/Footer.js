import React from 'react';
import { BsStars } from 'react-icons/bs'; 
import { Box, Typography } from '@mui/material';
import { FaQuestionCircle } from "react-icons/fa";


const SidebarFooter = () => {
  return (
    <Box>
            <Box sx={{ bgcolor: 'black', p: 2, textAlign: 'left', display: 'flex', flexDirection: 'row', alignItems: 'left', justifyContent: 'left' }}>
              <Box sx={{ color: 'white', mr: 3 }}>
                <BsStars style={{ fontSize: '1.2rem' }} />
              </Box>
              <Box sx={{ color: 'white' }}>
                <Typography style={{ color: 'white', fontSize: '1.1rem' }}>Explore New Release<br /></Typography>
              </Box>
            </Box>

            <Box sx={{ bgcolor: 'black', p: 2, textAlign: 'left', display: 'flex', flexDirection: 'row', alignItems: 'left', justifyContent: 'left' }}>
              <Box sx={{ color: 'white', mr: 3 }}>
                <FaQuestionCircle style={{ fontSize: '1.2rem' }} />
              </Box>
              <Box sx={{ color: 'white' }}>
                <Typography style={{ color: 'white', fontSize: '1.1rem' }}>Get Help<br /></Typography>
              </Box>
            </Box>
          </Box>
    
  );
}

export default SidebarFooter;
