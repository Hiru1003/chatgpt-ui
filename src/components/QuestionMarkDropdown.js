import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Typography,useTheme,useMediaQuery } from '@mui/material';
import { RxQuestionMarkCircled } from "react-icons/rx";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { FaRegKeyboard } from "react-icons/fa6";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { FaQuora } from "react-icons/fa";
import KeyboardShortcuts from './KeyboardShortcuts';

const QuestionMarkDropdown = () => {
    const [anchorEl, setAnchorEl] = useState(null);
     const theme = useTheme();
  const isXSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false); 
  
    const handleIconClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
        setAnchorEl(null);
    };
  
    const handleKeyboardShortcutsClick = () => {
        setShowKeyboardShortcuts(!showKeyboardShortcuts); 
        setAnchorEl(null);
    };
    
    const open = Boolean(anchorEl);

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000, 
        backdropFilter: 'blur(3px)', 
    };


    return (
        <>
            <Box sx={{ marginLeft: 'auto' }}>
                <IconButton onClick={handleIconClick}>
                    <RxQuestionMarkCircled style={{ fontSize: '1.2rem', color: 'white' }} />
                </IconButton>
            </Box>
            <Menu
                id="question-mark-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        backgroundColor: 'black',
                    },
                }}
            >
                {/* Menu Items */}
                <MenuItem onClick={handleClose}>
                    <Box sx={{ bgcolor: 'black', p: 2, textAlign: 'left', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ color: 'white', mr: 3 , mt:1}}>
                            <HiArrowTopRightOnSquare style={{ fontSize: '1.5rem' }} />
                        </Box>
                        <Box sx={{ color: 'white' }}>
                            <Typography variant="subtitle1" style={{ color: 'white', fontSize: { xs: '1rem', sm: '1.5rem' }  }}>Help and FAQ</Typography>
                        </Box>
                    </Box>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <Box sx={{ bgcolor: 'black', p: 2, textAlign: 'left', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ color: 'white', mr: 3 , mt:1}}>
                            <HiArrowTopRightOnSquare style={{ fontSize: '1.5rem' }} />
                        </Box>
                        <Box sx={{ color: 'white' }}>
                            <Typography variant="subtitle1" style={{ color: 'white', fontSize: { xs: '1rem', sm: '1.5rem' }  }}>Terms and Policies</Typography>
                        </Box>
                    </Box>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <Box sx={{ bgcolor: 'black', p: 2, textAlign: 'left', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ color: 'white', mr: 3 , mt:1}}>
                            <HiArrowTopRightOnSquare style={{ fontSize: '1.5rem' }} />
                        </Box>
                        <Box sx={{ color: 'white' }}>
                            <Typography variant="subtitle1" style={{ color: 'white', fontSize: { xs: '1rem', sm: '1.5rem' }  }}>Release Notes</Typography>
                        </Box>
                    </Box>
                </MenuItem>

                {/* Keyboard Shortcuts Menu Item */}
                <MenuItem onClick={handleKeyboardShortcutsClick}>
                    <Box sx={{ bgcolor: 'black', p: 2, textAlign: 'left', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ color: 'white', mr: 3 , mt:1}}>
                            <FaRegKeyboard style={{ fontSize: '1.5rem' }} />
                        </Box>
                        <Box sx={{ color: 'white' }}>
                            <Typography variant="subtitle1" style={{ color: 'white', fontSize: { xs: '1rem', sm: '1.5rem' }  }}>Keyboard Shortcuts</Typography>
                        </Box>
                    </Box>
                </MenuItem>
            </Menu>

            {/* Render KeyboardShortcuts component if showKeyboardShortcuts state is true */}
            {showKeyboardShortcuts && <KeyboardShortcuts onClose={() => setShowKeyboardShortcuts(false)} />}
        </>
    );
};

export default QuestionMarkDropdown;
