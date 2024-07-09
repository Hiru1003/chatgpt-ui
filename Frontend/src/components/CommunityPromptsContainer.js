import React from 'react';
import { Box, Typography, IconButton} from '@mui/material';
import { Add,  ArrowRightAlt } from '@mui/icons-material';

const CommunityPromptsContainer = ({ headline, normalText }) => {
  return (
    <Box sx={{ 
      backgroundColor: 'black',
      border: '1px solid white',
      borderRadius: '12px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: '10px',
      justifyContent: 'space-between',
    }}>
      <Box>
        <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>{headline}</Typography>
        <Typography variant="body1" sx={{ color: 'white' }}>{normalText}</Typography>

      </Box>
      
      <Box sx={{ display: 'flex', gap: 2 }}>
  
        {/* Use Button Container */}
        <Box sx={{ bgcolor: '#2464ec', borderRadius: '12px', padding: '6px' }}>
            <IconButton sx={{ color: 'white', '& svg': { color: 'white' } }}>
            <ArrowRightAlt />
            <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold', ml: 1 }}>Use</Typography>
            </IconButton>
        </Box>

        {/* Add Button Container */}
        <Box sx={{ bgcolor: '#2464ec', borderRadius: '12px', padding: '6px' }}>
            <IconButton sx={{ color: 'white', '& svg': { color: 'white' } }}>
            <Add />
            <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' , ml: 1}}>Add</Typography>
            </IconButton>
        </Box>
    </Box>


    </Box>
  );
}

export default CommunityPromptsContainer;
