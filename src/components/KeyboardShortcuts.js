import React, { useState } from 'react';
import { Box, Typography, IconButton, Divider, Grid } from '@mui/material';
import { MdClose } from "react-icons/md";

const KeyboardShortcuts = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('general');
    const [selectedTheme, setSelectedTheme] = useState('system');

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    const handleThemeChange = (event) => {
        setSelectedTheme(event.target.value);
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                width: '55%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: ' #3D3C3B',
                p: 3,
                borderRadius: 8,
                zIndex: 1300,
            }}
        >
            {/* Close Icon */}
            <IconButton
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: '10px',
                    color: 'white',
                    zIndex: 1500, 
                    marginRight: 'auto'
                }}
                onClick={onClose}
            >
                <MdClose />
            </IconButton>

            <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
                <Box sx={{ width: '100%', paddingRight: 2 }}>
                    <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight:'bold'}}>
                        Keyboard Shortcuts
                    </Typography>
                    <Divider sx={{ mb: 2 , borderColor: 'white'}} />
                    <Box>
                        {/* Grid with two columns and two texts in each */}
                        <Grid container spacing={10}>
                            <Grid item xs={6}>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px'}}>
                                    <Typography variant="subtitle1" sx={{ color: 'white', fontSize:'18px', alignItems:'center' }}>Open new chat</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'end', mb:'10px'}}>  
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px',borderColor: 'white', border: '1px solid grey',padding:1, borderRadius:'18px', marginRight:2, width:'70px', justifyContent:'center'}}> 
                                            <Typography variant="subtitle1" sx={{ color: 'white' }}>⌘</Typography>
                                        </Box> 
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px',borderColor: 'white', border: '1px solid grey',padding:1, borderRadius:'18px', marginRight:2, width:'70px', justifyContent:'center'}}> 
                                            <Typography variant="subtitle1" sx={{ color: 'white' }}>Shift</Typography>
                                        </Box> 
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px',borderColor: 'white', border: '1px solid grey',padding:1, borderRadius:'18px', width:'70px', justifyContent:'center'}}> 
                                            <Typography variant="subtitle1" sx={{ color: 'white' }}>O</Typography>
                                        </Box>  
                                    </Box>  
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px'}}>
                                    <Typography variant="subtitle1" sx={{ color: 'white', fontSize:'18px', alignItems:'center' }}>Focus chat input</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'end', mb:'10px'}}>  
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px',borderColor: 'white', border: '1px solid grey',padding:1, borderRadius:'18px', marginRight:2, width:'70px', justifyContent:'center'}}> 
                                            <Typography variant="subtitle1" sx={{ color: 'white' }}>Shift</Typography>
                                        </Box> 
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px',borderColor: 'white', border: '1px solid grey',padding:1, borderRadius:'18px', width:'70px', justifyContent:'center'}}> 
                                            <Typography variant="subtitle1" sx={{ color: 'white' }}>Esc</Typography>
                                        </Box>  
                                    </Box>  
                                </Box>


                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px'}}>
                                    <Typography variant="subtitle1" sx={{ color: 'white', fontSize:'18px', alignItems:'center' }}>Copy last code block</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'end', mb:'10px'}}>  
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px',borderColor: 'white', border: '1px solid grey',padding:1, borderRadius:'18px', marginRight:2, width:'70px', justifyContent:'center'}}> 
                                            <Typography variant="subtitle1" sx={{ color: 'white' }}>⌘</Typography>
                                        </Box> 
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px',borderColor: 'white', border: '1px solid grey',padding:1, borderRadius:'18px', marginRight:2, width:'70px', justifyContent:'center'}}> 
                                            <Typography variant="subtitle1" sx={{ color: 'white' }}>Shift</Typography>
                                        </Box> 
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px',borderColor: 'white', border: '1px solid grey',padding:1, borderRadius:'18px', width:'70px', justifyContent:'center'}}> 
                                            <Typography variant="subtitle1" sx={{ color: 'white' }}>;</Typography>
                                        </Box>  
                                    </Box>  
                                </Box>


                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px'}}>
                                    <Typography variant="subtitle1" sx={{ color: 'white', fontSize:'18px', alignItems:'center' }}>Show shortcuts</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'end', mb:'10px'}}>  
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px',borderColor: 'white', border: '1px solid grey',padding:1, borderRadius:'18px', marginRight:2, width:'70px', justifyContent:'center'}}> 
                                            <Typography variant="subtitle1" sx={{ color: 'white' }}>⌘</Typography>
                                        </Box> 
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px',borderColor: 'white', border: '1px solid grey',padding:1, borderRadius:'18px', marginRight:2, width:'70px', justifyContent:'center'}}> 
                                            <Typography variant="subtitle1" sx={{ color: 'white' }}>Shift</Typography>
                                        </Box> 
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px',borderColor: 'white', border: '1px solid grey',padding:1, borderRadius:'18px', width:'70px', justifyContent:'center'}}> 
                                            <Typography variant="subtitle1" sx={{ color: 'white' }}>C</Typography>
                                        </Box>  
                                    </Box>  
                                </Box>


                            </Grid>
                            <Grid item xs={6}>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px'}}>
                                    <Typography variant="subtitle1" sx={{ color: 'white', fontSize:'18px', alignItems:'center' }}>Copy last response</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'end', mb:'10px'}}>  
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px',borderColor: 'white', border: '1px solid grey',padding:1, borderRadius:'18px', marginRight:2, width:'70px', justifyContent:'center'}}> 
                                            <Typography variant="subtitle1" sx={{ color: 'white' }}>⌘</Typography>
                                        </Box> 
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px',borderColor: 'white', border: '1px solid grey',padding:1, borderRadius:'18px', marginRight:2, width:'70px', justifyContent:'center'}}> 
                                            <Typography variant="subtitle1" sx={{ color: 'white' }}>Shift</Typography>
                                        </Box> 
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px',borderColor: 'white', border: '1px solid grey',padding:1, borderRadius:'18px', width:'70px', justifyContent:'center'}}> 
                                            <Typography variant="subtitle1" sx={{ color: 'white' }}>|</Typography>
                                        </Box>  
                                    </Box>  
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px'}}>
                                    <Typography variant="subtitle1" sx={{ color: 'white', fontSize:'18px', alignItems:'center' }}>Toggle sidebar</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'end', mb:'10px'}}>  
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px',borderColor: 'white', border: '1px solid grey',padding:1, borderRadius:'18px', marginRight:2, width:'70px', justifyContent:'center'}}> 
                                            <Typography variant="subtitle1" sx={{ color: 'white' }}>⌘</Typography>
                                        </Box> 
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px',borderColor: 'white', border: '1px solid grey',padding:1, borderRadius:'18px', marginRight:2, width:'70px', justifyContent:'center'}}> 
                                            <Typography variant="subtitle1" sx={{ color: 'white' }}>Shift</Typography>
                                        </Box> 
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px',borderColor: 'white', border: '1px solid grey',padding:1, borderRadius:'18px', width:'70px', justifyContent:'center'}}> 
                                            <Typography variant="subtitle1" sx={{ color: 'white' }}>S</Typography>
                                        </Box>  
                                    </Box>  
                                </Box>


                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px'}}>
                                    <Typography variant="subtitle1" sx={{ color: 'white', fontSize:'18px', alignItems:'center' }}>Delete chat</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'end', mb:'10px'}}>  
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px',borderColor: 'white', border: '1px solid grey',padding:1, borderRadius:'18px', marginRight:2, width:'70px', justifyContent:'center'}}> 
                                            <Typography variant="subtitle1" sx={{ color: 'white' }}>⌘</Typography>
                                        </Box> 
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px',borderColor: 'white', border: '1px solid grey',padding:1, borderRadius:'18px', marginRight:2, width:'70px', justifyContent:'center'}}> 
                                            <Typography variant="subtitle1" sx={{ color: 'white' }}>Shift</Typography>
                                        </Box> 
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px',borderColor: 'white', border: '1px solid grey',padding:1, borderRadius:'18px' ,width:'70px', justifyContent:'center'}}> 
                                            <Typography variant="subtitle1" sx={{ color: 'white' }}>⌫</Typography>
                                        </Box>  
                                    </Box>  
                                </Box>


                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px'}}>
                                    <Typography variant="subtitle1" sx={{ color: 'white', fontSize:'18px', alignItems:'center' }}>Show shortcuts</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'end', mb:'10px'}}>  
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px',borderColor: 'white', border: '1px solid grey',padding:1, borderRadius:'18px', marginRight:2, width:'70px', justifyContent:'center'}}> 
                                            <Typography variant="subtitle1" sx={{ color: 'white' }}>⌘</Typography>
                                        </Box> 
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:'10px',borderColor: 'white', border: '1px solid grey',padding:1, borderRadius:'18px',width:'70px', justifyContent:'center'}}> 
                                            <Typography variant="subtitle1" sx={{ color: 'white' }}>/</Typography>
                                        </Box>  
                                    </Box>  
                                </Box>

                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default KeyboardShortcuts;
