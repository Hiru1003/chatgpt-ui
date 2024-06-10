import React from 'react';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import { FaCircleArrowUp } from "react-icons/fa6";


const MainPage = () => {
  return (
    <Box sx={{ pl: 10, pr:10, pt:2, pb:2, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Containers Row */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          p: 2,
        }}
      >
        {/* Container 1 */}
        <Box sx={{ flex: 1, textAlign: 'center', border: '1px solid black' }}>
          <Typography variant="h6">Container 1</Typography>
          <Typography variant="body1">Example content here</Typography>
        </Box>

        {/* Container 2 */}
        <Box sx={{ flex: 1, textAlign: 'center', border: '1px solid black' }}>
          <Typography variant="h6">Container 2</Typography>
          <Typography variant="body1">Example content here</Typography>
        </Box>

        {/* Container 3 */}
        <Box sx={{ flex: 1, textAlign: 'center', border: '1px solid black' }}>
          <Typography variant="h6">Container 3</Typography>
          <Typography variant="body1">Example content here</Typography>
        </Box>

        {/* Container 4 */}
        <Box sx={{ flex: 1, textAlign: 'center', border: '1px solid black' }}>
          <Typography variant="h6">Container 4</Typography>
          <Typography variant="body1">Example content here</Typography>
        </Box>
      </Box>

      {/* Text Field and IconButton */}
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <TextField variant="outlined" fullWidth placeholder="Type your message..." sx={{ width: 'calc(100% - 55px)', mr: 1 }} />
        <IconButton  aria-label="send" sx={{ fontSize: '2.5rem', color:"black" }}>
          <FaCircleArrowUp />
        </IconButton>
      </Box>
    </Box>
  );
}

export default MainPage;
