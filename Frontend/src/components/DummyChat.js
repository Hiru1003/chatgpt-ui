import React, { useState, useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import ChatgptDropdownHeader from './ChatgptDropdownHeader';
import TextAreaTemplete from './TextArea';
import MessageSender from './MessageSender';

const DummyChat = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [messages, setMessages] = useState([
    { text: 'I am looking for a java code.', sender: 'right' },
    { text: 'Sure, I can help with that! Do you have any specific code in mind?', sender: 'left' },
    { text: 'No.', sender: 'right' },
    { text: '```<TextField id="confirmPassword" label="Confirm Password" type="password" variant="outlined" fullWidth value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} sx={{ mb: 2 }} required/>```', sender: 'left' },
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

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
    <Box
      sx={{
        height: '100vh',
        pl: { xs: 2, sm: 5 },
        pr: { xs: 2, sm: 0 },
        pt: 1,
        pb: 3,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        bgcolor: '#212121',
        position: 'relative',
        overflowX: 'hidden',
        paddingLeft: '10px',
        paddingRight: '10px',
      }}
    >
      {/* Header */}
      <Box sx={{ padding: '10px 0', bgcolor: 'grey.900' }}>
        <ChatgptDropdownHeader />
      </Box>

      {/* Messages Container */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          scrollbarColor: '#666 #333',
          paddingLeft: '10px',
          paddingRight: '15px',
          paddingTop: '15px',
          paddingBottom: '10px',
          scrollbarWidth: 'thin',
          position: 'relative',
        }}
      >
        {messages.map((msg, index) => (
          <MessageSender
            key={index}
            msg={msg}
            index={index}
            hoverIndex={hoverIndex}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Footer with TextArea */}
      <Box
        sx={{
          bgcolor: 'grey.900',
          padding: '10px',
          marginTop: 3,
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextAreaTemplete inputText={inputText} setInputText={setInputText} handleSubmit={handleSubmit} />
        </form>
      </Box>

    </Box>
  );
};

export default DummyChat;
