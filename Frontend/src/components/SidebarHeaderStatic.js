import React from 'react'
import { BsStars } from 'react-icons/bs'; 
import { Box, Typography } from '@mui/material';

const SidebarHeaderStatic = () => {
  return (
    <div>
          <Box>
            <Box sx={{ bgcolor: 'black', p: 2, textAlign: 'left', display: 'flex', flexDirection: 'row', alignItems: 'left', justifyContent: 'left' }}>
              <Box sx={{ color: 'white', mr: 3 }}>
                <BsStars style={{ fontSize: '1.2rem', color:'grey' }} />
              </Box>
              <Box sx={{ color: 'white' }}>
                <Typography style={{ color: 'white', fontSize: '1rem' }}>Lissa Pro<br /></Typography>
              </Box>
            </Box>
          </Box>
    </div>
  )
}

export default SidebarHeaderStatic
