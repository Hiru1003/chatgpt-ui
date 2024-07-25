import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { MdContentCopy } from "react-icons/md";
import { BiDislike, BiLike } from "react-icons/bi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { FaRegPenToSquare } from "react-icons/fa6";

const MessageSender = ({ msg, index, hoverIndex, handleMouseEnter, handleMouseLeave }) => {
  const [setResponseText] = useState('');
  const [setChatName] = useState('');

  if (!msg || !msg.text) {
    return null;
  }

  const isCodeMessage = msg.text.startsWith('```') && msg.text.endsWith('```');
  const messageWidth = isCodeMessage ? '60%' : 'auto'; 
  const codeContent = isCodeMessage ? msg.text.slice(3, -3) : msg.text;

  const renderMessageWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const handleCopy = () => {
    const textToCopy = isCodeMessage ? codeContent : msg.text;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  const handleSendToBackend = async () => {
    try {
      // Send message to backend to get response
      const response = await fetch('http://127.0.0.1:8000/bot/response', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: msg.text }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setResponseText(data.text);

      // Generate chat name and save it in the database
      // const chatNameResponse = await fetch('http://127.0.0.1:8000/bot/chat_name', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ text: msg.text }),
      // });

      // if (!chatNameResponse.ok) {
      //   throw new Error('Network response was not ok');
      // }

      // const chatNameData = await chatNameResponse.json();
      // setChatName(chatNameData.text);

    } catch (error) {
      console.error('Error fetching response or generating chat name:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: msg.sender === 'left' ? 'flex-start' : 'flex-end',
        mb: 3,
        pb: 2,
        position: 'relative',
        pr: 7,
        pl: 4,
        backgroundColor: isCodeMessage ? 'transparent' : 'transparent',
        borderRadius: isCodeMessage ? '10px' : '0',
        width: '100%', 
      }}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
    >
      {isCodeMessage && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#383830',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            p: 1,
            width: '60%',
          }}
        >
          <Typography variant="body2" sx={{ color: 'grey.500', mr: 1 }}>console</Typography> 
          <IconButton aria-label="Copy" sx={{ color: 'grey', fontSize: '0.8rem', ml: 'auto' }} onClick={handleCopy}>
            <MdContentCopy style={{ color: 'grey', fontSize: '1.1rem' }} />
          </IconButton>
        </Box>
      )}

      <Box
        sx={{
          bgcolor: isCodeMessage ? '#272822' : (msg.sender === 'left' ? '#1D1A1A' : '#343131'),
          color: 'white',
          borderRadius: 1,
          p: 1,
          mt: isCodeMessage ? '-1px' : '0', 
          maxWidth: '60%',
          width: messageWidth,
        }}
      >
        <Typography variant="body1" sx={{ fontSize: '1.2rem', maxWidth: '100%', wordBreak: 'break-word' }}>
          {renderMessageWithLineBreaks(codeContent)}
        </Typography>
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
                <HiOutlineSpeakerWave style={{ color: 'grey', fontSize: '1.2rem' }} />
              </IconButton>

              <IconButton aria-label="Copy" onClick={handleCopy}>
                <MdContentCopy style={{ color: 'grey', fontSize: '1.2rem' }} />
              </IconButton>
              <IconButton aria-label="Dislike">
                <BiDislike style={{ color: 'grey', fontSize: '1.2rem' }} />
              </IconButton>
              <IconButton aria-label="Like">
                <BiLike style={{ color: 'grey', fontSize: '1.2rem' }} />
              </IconButton>
              <IconButton aria-label="Send to Backend" onClick={handleSendToBackend}>
                <FaRegPenToSquare style={{ color: 'grey', fontSize: '1.2rem' }} />
              </IconButton>
            </>
          )}
          {msg.sender === 'right' && (
            <IconButton aria-label="edit" sx={{ color: 'grey', fontSize: '1.2rem' }}>
              <FaRegPenToSquare />
            </IconButton>
          )}
        </Box>
      )}
    </Box>
  );
};

export default MessageSender;