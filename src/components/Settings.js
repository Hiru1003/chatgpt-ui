import React, { useState } from 'react';
import { Box, Typography, Button, Divider, TextField, Select, MenuItem } from '@mui/material';

const Settings = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('general');

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'black',
        p: 3,
        borderRadius: 8,
        zIndex: 1300,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
        <Box sx={{ width: '30%', paddingRight: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'white'}}>
            Settings
          </Typography>
          <Divider sx={{ mb: 2 , borderColor: 'white'}} />
          <Box>
            <Typography
              variant="subtitle1"
              gutterBottom
              onClick={() => handleTabChange('general')}
              style={{ cursor: 'pointer', color: activeTab === 'general' ? 'blue' : 'white' }}
            >
              General
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              onClick={() => handleTabChange('speech')}
              style={{ cursor: 'pointer', color: activeTab === 'speech' ? 'blue' : 'white' }}
            >
              Speech
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              onClick={() => handleTabChange('data-controls')}
              style={{ cursor: 'pointer', color: activeTab === 'data-controls' ? 'blue' : 'white' }}
            >
              Data controls
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              onClick={() => handleTabChange('connected-apps')}
              style={{ cursor: 'pointer', color: activeTab === 'connected-apps' ? 'blue' : 'white' }}
            >
              Connected apps
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              onClick={() => handleTabChange('security')}
              style={{ cursor: 'pointer', color: activeTab === 'security' ? 'blue' : 'white' }}
            >
              Security
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: '70%' }}>
          {/* General tab */}
          <Box id="general" sx={{ display: activeTab === 'general' ? 'block' : 'none' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white'}}>
              General
            </Typography>
            <Divider sx={{ mb: 2 , borderColor: 'white'}} />
            {/* General settings content */}
          </Box>


          {/* Speech tab */}
          <Box id="speech" sx={{ display: activeTab === 'speech' ? 'block' : 'none' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white'}}>
              Speech
            </Typography>
            <Divider sx={{ mb: 2 , borderColor: 'white'}} />
            {/* Speech settings content */}
             </Box>


          {/* Data controls tab */}
          <Box id="data-controls" sx={{ display: activeTab === 'data-controls' ? 'block' : 'none' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white'}}>
              Data controls
            </Typography>
            <Divider sx={{ mb: 2 , borderColor: 'white'}} />
            {/* Data controls settings content */}
          </Box>


          {/* Connected apps tab */}
          <Box id="connected-apps" sx={{ display: activeTab === 'connected-apps' ? 'block' : 'none' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white'}}>
              Connected apps
            </Typography>
            <Divider sx={{ mb: 2 , borderColor: 'white'}} />
            {/* Connected apps settings content */}
          </Box>


          {/* Security tab */}
          <Box id="security" sx={{ display: activeTab === 'security' ? 'block' : 'none' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white'}}>
              Security
            </Typography>
            <Divider sx={{ mb: 2 , borderColor: 'white'}} />
            {/* Security settings content */}
          </Box>


          
        </Box>
      </Box>
    </Box>
  );
}

export default Settings;
