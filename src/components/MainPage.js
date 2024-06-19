import React, { useState, useRef } from 'react';
import { Box} from '@mui/material';
import MainpageContainer from './MainpageContainer';
import { SiOpenai } from "react-icons/si";
import ChatgptDropdownHeader from './ChatgptDropdownHeader';
import { useTheme, useMediaQuery } from '@mui/material';
import TextAreaTemplete from './TextArea';

const MainPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeForm, setActiveForm] = useState('yourPrompts');
  const fileInputRef = useRef(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const handleUploadClick = () => {
    setShowForm(true);
    setActiveForm('yourPrompts');
  };

  const handleFileUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const switchToYourPrompts = () => {
    setActiveForm('yourPrompts');
  };

  const switchToCommunityPrompts = () => {
    setActiveForm('communityPrompts');
  };

  return (
    <Box sx={{ 
      height: '100vh',
        pl: { xs: 2, sm: 5 },
        pr: { xs: 2, sm: 0 },
        pt: 1, 
        pb: 3, 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        bgcolor: 'grey.900',
        position: 'relative',
        overflowX: 'hidden', 
        paddingLeft: '10px',
        paddingRight: '10px',
    }}>

      {/* Header */}
      <Box sx={{ padding: '10px 0', bgcolor: 'grey.900' }}>
        <ChatgptDropdownHeader/>
      </Box>
      
      {/* OpenAI Icon */}
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <SiOpenai size={isSmallScreen ? 30 : 60} style={{ color: 'white' }} />
     </Box>

      {/* Main page container */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom:'20px', flexDirection: { xs: 'column', sm: 'row' }}}>
        <MainpageContainer />
      </Box>
         
      <TextAreaTemplete/>
    </Box>
  );
}

export default MainPage;
