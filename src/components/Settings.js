import React, { useState } from 'react';
import { Box, Typography, Button, Divider, TextField, Select, MenuItem, IconButton } from '@mui/material';
import { MdClose } from 'react-icons/md'; // Import the close icon
import { TbSettings } from "react-icons/tb";
import { PiWaveformBold } from "react-icons/pi";
import { BsDatabaseAdd } from "react-icons/bs";
import { PiCirclesFour } from "react-icons/pi";
import { MdSecurity } from "react-icons/md";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Switch from '@mui/material/Switch';
import { FormControlLabel, Checkbox, FormControl, InputLabel } from '@mui/material';


const Settings = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('general');
    const [selectedTheme, setSelectedTheme] = useState('system');
    const [selectedLanguage, setSelectedLanguage] = useState('Auto-detect');
    const [showCode, setShowCode] = useState(false);
    const [improveModel, setImproveModel] = useState(false);
    const [selectedSharedLink, setSelectedSharedLink] = useState('');
  
    const handleTabChange = (tabId) => {
      setActiveTab(tabId);
    };

    const handleImproveModelChange = (event) => {
        setImproveModel(event.target.checked);
    };
    
    const handleSharedLinkChange = (event) => {
        setSelectedSharedLink(event.target.value);
    };
  
    const handleThemeChange = (event) => {
        setSelectedTheme(event.target.value);
    };
  
    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };
  
    const handleShowCodeChange = (event) => {
        setShowCode(event.target.checked);
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
                }}
                onClick={onClose}
            >
                <MdClose />
            </IconButton>
      
      
      
      <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
        <Box sx={{ width: '30%', paddingRight: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight:'bold'}}>
            Settings
          </Typography>
          <Divider sx={{ mb: 2 , borderColor: 'white'}} />
          <Box>
            
            <Typography
              variant="subtitle1"
              gutterBottom
              onClick={() => handleTabChange('general')}
              style={{ marginBottom:15, cursor: 'pointer', fontSize:'18px', color: activeTab === 'general' ? '#2464ec' : 'white' }}
            >
             <TbSettings style={{ fontSize: '1.1rem', marginRight:'8px',verticalAlign: 'middle'}}/> 
             General
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              onClick={() => handleTabChange('speech')}
              style={{ marginBottom:15, cursor: 'pointer', fontSize:'18px', color: activeTab === 'speech' ? '#2464ec' : 'white' }}
            >
                <PiWaveformBold style={{ fontSize: '1.1rem', marginRight:'8px',verticalAlign: 'middle'}}/> 
              Speech
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              onClick={() => handleTabChange('data-controls')}
              style={{ marginBottom:15, cursor: 'pointer', fontSize:'18px', color: activeTab === 'data-controls' ? '#2464ec' : 'white' }}
            >
              <BsDatabaseAdd style={{ fontSize: '1.1rem', marginRight:'8px',verticalAlign: 'middle'}}/> 
              Data controls
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              onClick={() => handleTabChange('connected-apps')}
              style={{ marginBottom:15, cursor: 'pointer', fontSize:'18px', color: activeTab === 'connected-apps' ? '#2464ec' : 'white' }}
            >
              <PiCirclesFour style={{ fontSize: '1.1rem', marginRight:'8px',verticalAlign: 'middle'}}/> 
              Connected apps
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              onClick={() => handleTabChange('security')}
              style={{ marginBottom:'5px', fontSize:'18px', cursor: 'pointer', color: activeTab === 'security' ? '#2464ec' : 'white' }}
            >
              <MdSecurity style={{ fontSize: '1.1rem', marginRight:'8px',verticalAlign: 'middle'}}/> 
              Security
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ width: '70%' }}>
            
          {/* General tab */}
          <Box id="general" sx={{ display: activeTab === 'general' ? 'block' : 'none' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                General
            </Typography>
            <Divider sx={{ mb: 2 , borderColor: 'white' }} />

            {/* Theme selection */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ color: 'white', flex: 1 }}>
                Theme
                </Typography>
                <Select
                id="theme-select"
                fullWidth
                value={selectedTheme}
                onChange={handleThemeChange}
                sx={{ color: 'white',borderColor: 'white', width:'65%' }}
                IconComponent={ArrowDropDownIcon}
                >
                <MenuItem value="system">System</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="light">Light</MenuItem>
                </Select>
            </Box>

            {/* Language selection */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ color: 'white', flex: 1 }}>
                Language
                </Typography>
                <Select
                id="language-select"
                fullWidth
                value={selectedLanguage}
                onChange={handleLanguageChange}
                sx={{ color: 'white' ,borderColor: 'white',width:'65%' }}
                IconComponent={ArrowDropDownIcon}
                >
                <MenuItem value="Auto-detect">Auto-detect</MenuItem>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                </Select>
            </Box>

            {/* Show code toggle */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ color: 'white', flex: 1 }}>
                Always show code when using data analyst
                </Typography>
                <Switch
                checked={showCode}
                onChange={handleShowCodeChange}
                sx={{ color: 'white' }}
                />
            </Box>
          </Box>


          {/* Speech tab */}
        <Box id="speech" sx={{ display: activeTab === 'speech' ? 'block' : 'none' }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
            Speech
        </Typography>
        <Divider sx={{ mb: 2, borderColor: 'white' }} />
        {/* Speech settings content */}
        <Box sx={{ color: 'white' }}>
            {/* Enable Speech Recognition */}
            <FormControlLabel
            control={<Checkbox defaultChecked color="primary" />}
            label="Enable Speech Recognition"
            />
            {/* Language selection */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'white', flex: 1 }}>
                Voice control
                </Typography>
                <Select
                id="language-select"
                fullWidth
                value={selectedLanguage}
                onChange={handleLanguageChange}
                sx={{ color: 'white' ,borderColor: 'white',width:'65%' }}
                IconComponent={ArrowDropDownIcon}
                >
                <MenuItem value="Auto-detect">Play</MenuItem>
                <MenuItem value="English">Breeze</MenuItem>
                <MenuItem value="Spanish">Pause</MenuItem>
                </Select>
            </Box>

        </Box>
        </Box>



          {/* Data controls tab */}
          <Box id="data-controls" sx={{ display: activeTab === 'data-controls' ? 'block' : 'none' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white'}}>
              Data controls
            </Typography>
            <Divider sx={{ mb: 2 , borderColor: 'white'}} />
            {/* Data controls settings content */}
<FormControl sx={{ width: '100%', mb: 2 }}>
  <FormControlLabel
    control={<Checkbox checked={improveModel} onChange={handleImproveModelChange} />}
    label="Improve the model for everyone"
    sx={{ color: 'white' }}
  />
</FormControl>
<FormControl sx={{ width: '100%', mb: 2 }}>
  <InputLabel htmlFor="shared-links" sx={{ color: 'white' }}>Shared links</InputLabel>
  <Select
    id="shared-links"
    value={selectedSharedLink}
    onChange={handleSharedLinkChange}
    fullWidth
    sx={{ color: 'white', borderColor: 'white' }}
  >
    <MenuItem value="manage">Manage</MenuItem>
    <MenuItem value="export">Export data</MenuItem>
    <MenuItem value="delete">Delete account</MenuItem>
  </Select>
</FormControl>

          </Box>


          {/* Connected apps tab */}
          <Box id="connected-apps" sx={{ display: activeTab === 'connected-apps' ? 'block' : 'none' }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'white'}}>
            Connected apps
        </Typography>
        <Divider sx={{ mb: 2, borderColor: 'white' }} />
        {/* Connected apps settings content */}
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'white', mb: 1, fontSize:'18px', fontWeight:'bold' }}>
            Connect apps to access their information in ChatGPT.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="body1" sx={{ color: 'white' }}>
                Google Drive
            </Typography>
            <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                Connect
            </Button>
            </Box>
           
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="body1" sx={{ color: 'white' }}>
                Microsoft OneDrive Personal
            </Typography>
            <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                Connect
            </Button>
            </Box>
       
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="body1" sx={{ color: 'white' }}>
                Microsoft OneDrive for Business
            </Typography>
            <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                Connect
            </Button>
            </Box>
     
        </Box>
          </Box>



          {/* Security tab */}
        <Box id="security" sx={{ display: activeTab === 'security' ? 'block' : 'none' }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'white'}}>
            Security
        </Typography>
        <Divider sx={{ mb: 2 , borderColor: 'white'}} />
        {/* Security settings content */}
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'white', mb: 1 }}>
            Multi-factor authentication
            </Typography>
            <Button variant="outlined" sx={{ color: 'white', borderColor: 'white', mb: 2 }}>
            Enable
            </Button>
        </Box>
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'white', mb: 1 }}>
            Log out of all devices
            </Typography>
            <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
            Log out all
            </Button>
        </Box>
        </Box>




        </Box>
      </Box>
    </Box>
  );
}

export default Settings;
