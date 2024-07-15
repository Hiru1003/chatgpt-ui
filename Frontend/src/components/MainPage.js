import React, { useState, useRef } from 'react';
import { Box} from '@mui/material';
import MainpageContainer from './MainpageContainer';
import { SiOpenai } from "react-icons/si";
import ChatgptDropdownHeader from './ChatgptDropdownHeader';
import { useTheme, useMediaQuery } from '@mui/material';
import TextAreaTemplete from './TextArea';

const MainPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [messages, setMessages] = useState('');
  const [inputText, setInputText] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputText.trim() === '') return;

    const newMessages = [...messages, { text: inputText, sender: 'right' }];
    setMessages(newMessages);
    setInputText('');

    try {
      const response = await fetch('/bot/response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      const fullBotResponse = responseData.text;

      let botResponse = '';
      setMessages((prevMessages) => [...prevMessages, { text: '', sender: 'left' }]);

      const interval = setInterval(() => {
        botResponse += fullBotResponse[botResponse.length];
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          return [
            ...prevMessages.slice(0, prevMessages.length - 1),
            { ...lastMessage, text: botResponse }
          ];
        });

        if (botResponse.length === fullBotResponse.length) {
          clearInterval(interval);
        }
      }, 50);

    } catch (error) {
      console.error('Error fetching bot response:', error);
    }
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
         
      <form onSubmit={handleSubmit} >
          <TextAreaTemplete inputText={inputText} setInputText={setInputText} handleSubmit={handleSubmit} />
        </form>   
    </Box>
  );
}

export default MainPage;
