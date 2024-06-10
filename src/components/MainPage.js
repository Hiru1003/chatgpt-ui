import React from 'react';
import { Box, IconButton, TextField, Avatar } from '@mui/material';
import { FaCircleArrowUp } from "react-icons/fa6";
import MainpageContainer from './MainpageContainer';
import { SiOpenai } from "react-icons/si";
import Mainheader from './Mainheader';



const MainPage = () => {
  return (
    
    <Box sx={{ 
      pl: 10, 
      pr:10, 
      pt:1, 
      pb:3, 
      flexGrow: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between' ,
      bgcolor: 'grey.900',}}>

      <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', position: 'absolute', top: '20px', right: '30px' }}>
        <Avatar sx={{ bgcolor: 'orange' }}>HI</Avatar>
      </Box>

    {/* Main header */}
    <Box >
      <Mainheader/>
    </Box>
    
    {/* OpenAI Icon */}
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 20}}>
        <SiOpenai
          size={70}
          style={{ color: 'white', }} 
        />
    </div>


    {/* Main page container */}
    <Box sx={{display: 'flex', gap: 2, mb: 18}}>
      <MainpageContainer/>
    </Box>

      {/* Text Field and IconButton */}
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px' , color: 'white', justifyContent: 'center',}}>
        <TextField 
          fullWidth 
          placeholder="Message ChatGPT" 
          sx={{ 
              width: 'calc(80% - 55px)', 
              mr: 1, 
              bgcolor: '#333', 
              color: 'white', 
              '::placeholder': { 
                  color: 'white',
                  animation: 'blink-caret 0.75s step-end infinite'
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
