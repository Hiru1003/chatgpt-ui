import React from 'react';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import { FaCircleArrowUp } from "react-icons/fa6";
import MainpageContainer from './MainpageContainer';
import { SiOpenai } from "react-icons/si";


const MainPage = () => {
  return (
    <Box sx={{ 
      pl: 10, 
      pr:10, 
      pt:2, 
      pb:2, 
      flexGrow: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between' ,
      bgcolor: 'grey.900',}}>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          p: 4,
        }}
      >
      <SiOpenai sx={{ fontSize: '2.5rem', color: "white" }}/>
      <MainpageContainer/>
        
      </Box>

      {/* Text Field and IconButton */}
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px' }}>
      <TextField 
        fullWidth 
        placeholder="Type your message..." 
        sx={{ 
          width: 'calc(100% - 55px)', 
          mr: 1, 
          bgcolor: '#333', 
          color: 'white', 
          '::placeholder': { 
            color: 'white' 
          } 
        }} 
      />    
      
      <IconButton aria-label="send" sx={{ fontSize: '2.5rem', color: "white" }}>
        <FaCircleArrowUp />
      </IconButton>
    </Box>



    </Box>
  );
}

export default MainPage;
