import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { MdContentCopy } from "react-icons/md";
import { BiDislike, BiLike } from "react-icons/bi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { FaRegPenToSquare } from "react-icons/fa6";

const MessageSender = ({ msg, index, hoverIndex, handleMouseEnter, handleMouseLeave }) => {
    const [setResponseText] = useState('');
    const [setChatName] = useState('');
    const [chatId, setChatId] = useState(localStorage.getItem('chat_id') || '');

    useEffect(() => {
        if (!chatId) {
            initializeChatSession();
        }
    }, [chatId]);

    const initializeChatSession = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/bot/initialize');
            const data = await response.json();
            if (response.ok) {
                setChatId(data.chat_id);
                localStorage.setItem('chat_id', data.chat_id); // Store chat_id in local storage
            } else {
                console.error('Error initializing chat session:', data.detail);
            }
        } catch (error) {
            console.error('Error initializing chat session:', error);
        }
    };

    const renderTable = (text) => {
        const rows = text.trim().split('\n');
        const headers = rows[0].split('|').map(cell => cell.trim());
        const bodyRows = rows.slice(1).map(row => row.split('|').map(cell => cell.trim()));

        return (
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
                    gap: '1px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    width: '100%',
                    backgroundColor: 'transparent',
                }}
            >
                {headers.map((header, index) => (
                    <Box
                        key={`header-${index}`}
                        sx={{
                            backgroundColor: '#3a3a3a',
                            padding: '8px',
                            borderRight: '1px solid #ddd',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            borderBottom: '1px solid #ddd',
                        }}
                    >
                        <Typography variant="body2">{header}</Typography>
                    </Box>
                ))}
                {bodyRows.map((row, rowIndex) => (
                    <React.Fragment key={`row-${rowIndex}`}>
                        {row.map((cell, cellIndex) => (
                            <Box
                                key={`cell-${rowIndex}-${cellIndex}`}
                                sx={{
                                    padding: '8px',
                                    borderRight: cellIndex < row.length - 1 ? '1px solid #ddd' : 'none',
                                    borderBottom: rowIndex < bodyRows.length - 1 ? '1px solid #ddd' : 'none',
                                    textAlign: 'center',
                                    backgroundColor: 'transparent', // Transparent background for cells
                                }}
                            >
                                <Typography variant="body2">{cell}</Typography>
                            </Box>
                        ))}
                    </React.Fragment>
                ))}
            </Box>
        );
    };

    const renderMessageWithLineBreaks = (text) => {
        const parts = text.split(/(```[\s\S]*?```)/g);
        return parts.map((part, index) => {
            if (part.startsWith('```') && part.endsWith('```')) {
                const codeContent = part.slice(3, -3);
                return (
                    <Box key={index} sx={{ backgroundColor: '#272822', color: 'white', padding: 1, borderRadius: 1, mb: 1, fontSize: '1.2rem' }}>
                        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', fontSize: '1.2rem' }}>{codeContent}</Typography>
                    </Box>
                );
            } else {
                // Check for table syntax and render as table if found
                if (part.startsWith('|') && part.includes('|')) {
                    return renderTable(part);
                } else {
                    return (
                        <Typography key={index} variant="body1" sx={{ whiteSpace: 'pre-wrap', fontSize: '1.2rem', maxWidth: '100%', wordBreak: 'break-word' }}>
                            {part}
                        </Typography>
                    );
                }
            }
        });
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(msg.text)
            .then(() => {
                console.log('Text copied to clipboard');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    };

    const handleSendToBackend = async (message) => {
        if (!chatId) {
            console.error('No chat ID available.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/bot/response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ chat_id: chatId, text: message })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Response from backend:', data);

                // Update state with response data
                setResponseText(data.messages.map(msg => msg.content).join(' '));
                setChatName(data.topic);

                // Update chat ID if necessary (though it should not change)
                if (data.chat_id !== chatId) {
                    setChatId(data.chat_id);
                    localStorage.setItem('chat_id', data.chat_id);
                }
            } else {
                console.error('Error from backend:', data.detail);
            }
        } catch (error) {
            console.error('Error fetching response:', error);
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
                backgroundColor: 'transparent',
                borderRadius: '10px',
                width: '100%',
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
        >
            {msg.text.startsWith('```') && msg.text.endsWith('```') && (
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
                    bgcolor: msg.text.startsWith('```') && msg.text.endsWith('```') ? '#272822' : (msg.sender === 'left' ? '#1D1A1A' : '#343131'),
                    color: 'white',
                    borderRadius: 1,
                    p: 1,
                    mt: msg.text.startsWith('```') && msg.text.endsWith('```') ? '-1px' : '0',
                    maxWidth: '60%',
                    width: msg.text.startsWith('```') && msg.text.endsWith('```') ? '60%' : 'auto',
                }}
            >
                {renderMessageWithLineBreaks(msg.text)}
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
                            <IconButton aria-label="Send to Backend" onClick={() => handleSendToBackend(msg.text)}>
                                <FaRegPenToSquare style={{ color: 'grey', fontSize: '1.2rem' }} />
                            </IconButton>
                        </>
                    )}
                    {msg.sender === 'right' && (
                        <IconButton aria-label="edit" sx={{ color: 'grey', fontSize: '1.2rem' }}>
                            <FaRegPenToSquare style={{ color: 'grey', fontSize: '1.2rem' }} />
                        </IconButton>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default MessageSender;
