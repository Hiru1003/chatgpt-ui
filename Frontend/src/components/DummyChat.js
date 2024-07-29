import React, { useState, useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import ChatgptDropdownHeader from './ChatgptDropdownHeader';
import TextAreaTemplete from './TextArea';
import MessageSender from './MessageSender';
import axios from 'axios';

const DummyChat = () => {
  const { chatId } = useParams();
  const [hoverIndex, setHoverIndex] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  };

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        if (chatId) {
          const response = await axios.get(`http://127.0.0.1:8000/api/chat/${chatId}`);
          setMessages(response.data.messages || []);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, [chatId]);

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

    // Add the user's message to the state
    const newMessages = [...messages, { role: 'user', content: inputText }];
    setMessages(newMessages);
    setInputText('');

    try {
        const response = await fetch('/bot/response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ chat_id: chatId, text: inputText }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log('Bot response:', responseData);

        // Ensure responseData contains the messages array
        if (!responseData || !Array.isArray(responseData.messages)) {
            throw new Error('Invalid response format');
        }

        // Add all the new messages to state
        setMessages(prevMessages => [...prevMessages, ...responseData.messages]);

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
      <Box sx={{ padding: '10px 0', bgcolor: 'grey.900' }}>
        <ChatgptDropdownHeader />
      </Box>

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
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <MessageSender
              key={index}
              msg={{ text: msg.content, sender: msg.role === 'user' ? 'right' : 'left' }}
              index={index}
              hoverIndex={hoverIndex}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          ))
        ) : (
          <p style={{ color: 'grey', textAlign: 'center' }}>No messages to display.</p>
        )}
        <div ref={messagesEndRef} />
      </Box>

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
