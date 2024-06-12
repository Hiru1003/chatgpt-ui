import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Sidebar from './components/Sidebar';
import MainPage from './components/MainPage';
import LoginPage from './components/Login';
import MessagePage from './components/Message';
import SignupPage from './components/SignUp';
import ForgotPasswordPage from './components/ForgotPassword'; 
import { Routes, Route, useLocation } from 'react-router-dom';
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";

const theme = createTheme({
  palette: {
    background: {
      default: '#121212' // Set the default background color to a dark theme
    },
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#121212', // Ensure the body background color is consistent
        },
      },
    },
  },
});

function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Hide the sidebar on the login, signup, and forgot password pages
    const shouldShowSidebar = !['/login', '/signup', '/forgot-password'].includes(location.pathname);
    setSidebarVisible(shouldShowSidebar);
  }, [location]);

  const handleToggleSidebar = () => {
    setSidebarVisible(prevState => !prevState);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', height: '100vh', backgroundColor: '#121212' }}>
        {/* Sidebar Toggle Button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleToggleSidebar}
          sx={{ position: 'absolute', top: 16, left: 16, zIndex: 1300, color: 'white' }}
        >
          <BsReverseLayoutTextSidebarReverse fontSize="x-large" />
        </IconButton>

        

        {/* Sidebar */}
        {isSidebarVisible && (
          <Sidebar isVisible={isSidebarVisible} />
        )}

        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, marginLeft: isSidebarVisible ? '0px' : '0', backgroundColor: '#121212' }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} /> 
            <Route path="/message" element={<MessagePage />} />
            <Route path="/" element={<MainPage />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
