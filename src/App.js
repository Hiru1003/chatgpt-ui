import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar';
import MainPage from './components/MainPage';
import LoginPage from './components/Login';
import MessagePage from './components/Message';
import SignupPage from './components/SignUp';
import ForgotPasswordPage from './components/ForgotPassword'; 
import { Routes, Route, useLocation } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', height: '100vh' }}>
        {isSidebarVisible && (
          <Sidebar isVisible={isSidebarVisible} />
        )}
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* Route for the forgot password page */}
            <Route path="/message" element={<MessagePage />} />
            <Route path="/" element={<MainPage />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
