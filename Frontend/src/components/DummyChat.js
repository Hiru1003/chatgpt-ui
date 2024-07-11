import React, { useState,useRef,useEffect } from 'react';
import { Box, Typography, IconButton} from '@mui/material';
import { MdContentCopy } from "react-icons/md";
import { BiDislike, BiLike } from "react-icons/bi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { FaRegPenToSquare } from "react-icons/fa6";
import { FaCircleArrowUp } from "react-icons/fa6";
import ChatgptDropdownHeader from './ChatgptDropdownHeader';
import { RiBook3Fill } from "react-icons/ri"; 
import { CgAttachment } from "react-icons/cg";
import { MdKeyboardVoice } from "react-icons/md";

const DummyChat = () => {
  const [setShowForm] = useState(false);
  const [setActiveForm] = useState('yourPrompts');
  const fileInputRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [messages, setMessages] = useState([
    { text: 'Hiiii! ', sender: 'right' },
    { text: 'Hello! How can I help you today?', sender: 'left' },
    { text: 'I am looking for a recipe for cake.', sender: 'right' },
    { text: 'Sure, I can help with that! Do you have any specific ingredients in mind?', sender: 'left' },
    { text: 'I have eggs, flour, and sugar.', sender: 'right' },
    { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet accumsan tortor. Ut pellentesque nulla in nunc bibendum, ac euismod metus bibendum. Morbi eget tortor non quam sollicitudin dictum. Vivamus euismod, purus a ullamcorper facilisis, urna nunc lacinia risus, non feugiat justo velit nec urna. Nam ac elit justo. Donec id sapien nec est dapibus vestibulum. Aenean convallis tincidunt nisl vel elementum. Nullam vehicula lacus non libero sagittis, in tempus est fermentum. Sed non odio libero. Nulla facilisi. Integer non urna non neque convallis pretium id ac odio. Fusce at lectus sit amet est placerat gravida.', sender: 'left' },
  ]);

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
      // Perform further actions with the selected file if needed
    }
  };



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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputText.trim() === '') return;

    const newMessages = [...messages, { text: inputText, sender: 'right' }];
    setMessages(newMessages);
    setInputText('');

    setTimeout(() => {
      simulateBotResponse(newMessages);
    }, 500);
  };

  const simulateBotResponse = (currentMessages) => {
    const botMessage = "Hi, how can I help you?";
    let botText = '';
    let index = 0;

    const interval = setInterval(() => {
      if (index < botMessage.length) {
        botText += botMessage[index];
        setMessages([...currentMessages, { text: botText, sender: 'left' }]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
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
        <ChatgptDropdownHeader/>
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
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender === 'left' ? 'flex-start' : 'flex-end',
              mb: 3,
              paddingBottom: 2,
              position: 'relative',
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: msg.sender === 'left' ? '#1D1A1A' : '#343131',
                color: 'white',
                borderRadius: 1,
                p: 1,
                maxWidth: '70%',
              }}
            >
              <Typography variant="body1" sx={{ flexGrow: 1, fontSize: '1.2rem' }}>{msg.text}</Typography>
            </Box>
            {(hoverIndex === index) && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: '-30px',
                }}
              >
                {msg.sender === 'left' && (
                  <>
                    <IconButton aria-label="Read Aloud">
                      <HiOutlineSpeakerWave style={{ color: 'grey', fontSize:'1.2rem' }} />
                    </IconButton>
                    <IconButton aria-label="Copy">
                      <MdContentCopy style={{ color: 'grey', fontSize:'1.2rem'  }} />
                    </IconButton>
                    <IconButton aria-label="Dislike">
                      <BiDislike style={{ color: 'grey', fontSize:'1.2rem'  }} />
                    </IconButton>
                    <IconButton aria-label="Like">
                      <BiLike style={{ color: 'grey', fontSize:'1.2rem'  }} />
                    </IconButton>
                  </>
                )}
                {msg.sender === 'right' && (
                  <IconButton aria-label="edit" sx={{ color: 'grey', fontSize:'1.2rem' }}>
                    <FaRegPenToSquare />
                  </IconButton>
                )}
              </Box>
            )}
          </Box>
        ))}
        {/* Dummy element to scroll to */}
        <div ref={messagesEndRef} />
      </Box>

      {/* Footer with TextArea */}
      <Box 
        sx={{
          bgcolor: 'grey.900',
          padding: '10px',
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton aria-label="upload" sx={{ fontSize: { xs: '1.5rem', sm: '1.5rem' }, color: "white" }} onClick={handleUploadClick}>
              <RiBook3Fill />
            </IconButton>

            <IconButton aria-label="upload" sx={{ fontSize: { xs: '1.5rem', sm: '1.5rem' }, color: "white" }} onClick={handleFileUploadButtonClick}>
              <CgAttachment />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </IconButton>

            <IconButton aria-label="send" sx={{ fontSize: { xs: '1.5rem', sm: '1.5rem' }, color: "white" }}>
              <MdKeyboardVoice />
            </IconButton>

            <Box sx={{ width: '100%', mr: 1, position: 'relative' }}>
                <textarea
                fullWidth
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                variant="outlined"
                placeholder="Type a message..."
                size="small"
                sx={{
                  mr: 1,
                  borderRadius: 1,
                  backgroundColor: '#333',
                  color: 'white',
                  '::placeholder': {
                    color: 'white'
                  }
                }}
                style={{
                  width: '80%',
                  padding: '10px',
                  border: '1px solid black',
                  borderRadius: '15px',
                  backgroundColor: '#333',
                  color: 'white',
                  resize: 'none',
                  fontSize: '1rem',
                  lineHeight: '0.9rem',
                  verticalAlign: 'middle',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                }}
              />
          </Box>

          <IconButton type="submit" aria-label="Send" sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem' }, color: "white" }}>
            <FaCircleArrowUp />
          </IconButton>
        </form>
      </Box>

    </Box>
  ); 
};

export default DummyChat;