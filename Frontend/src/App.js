import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar';
import MainPage from './components/MainPage';
import LoginPage from './components/Login';
import MessagePage from './components/Message';
import SignupPage from './components/SignUp';
import ResetSuccessPage from './components/ResetSuccessPage';
import ForgotPasswordPage from './components/ForgotPassword'; 
import { Routes, Route, useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import DummyChat from './components/DummyChat';

const theme = createTheme({
  palette: {
    background: {
      default: '#121212' 
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
          backgroundColor: '#121212', 
        },
      },
    },
  },
});

function App() {
  const location = useLocation();
  const isLargeScreen = useMediaQuery('(min-width:1000px)');
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    const shouldShowSidebar = !['/login', '/signup', '/forgot-password','/reset-success'].includes(location.pathname);
    setSidebarVisible(shouldShowSidebar && isLargeScreen);
  }, [location.pathname, isLargeScreen]);

  const handleToggleSidebar = () => {
    setSidebarVisible(prevState => !prevState);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', height: '100vh', backgroundColor: '#121212' }}>
        {/* Conditionally render Sidebar */}
        {isSidebarVisible && (
          <Sidebar isVisible={isSidebarVisible} onToggleSidebar={handleToggleSidebar} />
        )}

        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, backgroundColor: '#121212' }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/reset-success" element={<ResetSuccessPage />} />
            <Route path="/DummyChat" element={<DummyChat isVisible={isSidebarVisible} />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} /> 
            <Route path="/message" element={<MessagePage />} />
            <Route path="/" element={<MainPage isVisible={isSidebarVisible} />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
