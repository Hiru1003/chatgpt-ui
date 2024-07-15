import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { MdContentCopy } from "react-icons/md";
import { BiDislike, BiLike } from "react-icons/bi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { FaRegPenToSquare } from "react-icons/fa6";

const MessageSender = ({ msg, index, hoverIndex, handleMouseEnter, handleMouseLeave }) => {
  return (
    <Box
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
                <HiOutlineSpeakerWave style={{ color: 'grey', fontSize: '1.2rem' }} />
              </IconButton>
              <IconButton aria-label="Copy">
                <MdContentCopy style={{ color: 'grey', fontSize: '1.2rem' }} />
              </IconButton>
              <IconButton aria-label="Dislike">
                <BiDislike style={{ color: 'grey', fontSize: '1.2rem' }} />
              </IconButton>
              <IconButton aria-label="Like">
                <BiLike style={{ color: 'grey', fontSize: '1.2rem' }} />
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
