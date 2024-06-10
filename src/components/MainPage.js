import React from 'react';
import { Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { Explore as ExploreIcon } from '@mui/icons-material';

const MainPage = () => {
  return (
    <Box sx={{ p: 2, flexGrow: 1 }}>
      {/* Containers Row */}
      <Box
        sx={{
          display: 'flex',
          gap: 2, // Adjust the gap between containers
          border: '1px solid black', // Add black border
          p: 2, // Add padding
        }}
      >
        {/* Container 1 */}
        <Box sx={{ flex: 1, textAlign: 'center' }}>
          <IconButton color="primary" aria-label="explore">
            <ExploreIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6">Container 1</Typography>
          <Typography variant="body1">Example content here</Typography>
        </Box>

        {/* Container 2 */}
        <Box sx={{ flex: 1, textAlign: 'center' }}>
          <IconButton color="primary" aria-label="explore">
            <ExploreIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6">Container 2</Typography>
          <Typography variant="body1">Example content here</Typography>
        </Box>

        {/* Container 3 */}
        <Box sx={{ flex: 1, textAlign: 'center' }}>
          <IconButton color="primary" aria-label="explore">
            <ExploreIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6">Container 3</Typography>
          <Typography variant="body1">Example content here</Typography>
        </Box>

        {/* Container 4 */}
        <Box sx={{ flex: 1, textAlign: 'center' }}>
          <IconButton color="primary" aria-label="explore">
            <ExploreIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6">Container 4</Typography>
          <Typography variant="body1">Example content here</Typography>
        </Box>
      </Box>

      {/* Text Field and Button */}
      <Box sx={{ mt: 2, display: 'flex' }}>
        <TextField variant="outlined" fullWidth placeholder="Type your message..." />
        <Button variant="contained" color="primary">Send</Button>
      </Box>
    </Box>
  );
}

export default MainPage;
