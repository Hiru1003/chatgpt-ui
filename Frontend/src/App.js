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
import { useMediaQuery } from '@mui/material';
import DummyChat from './components/DummyChat';
import ResetPasswordPage from './components/Resetpassword';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

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
    const shouldShowSidebar = !['/login', '/signup', '/forgot-password', '/reset-password'].includes(location.pathname);
    setSidebarVisible(shouldShowSidebar && isLargeScreen);
  }, [location, isLargeScreen]);

  const handleToggleSidebar = () => {
    setSidebarVisible(prevState => !prevState);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', height: '100vh', backgroundColor: '#121212' }}>
        {/* Sidebar */}
        {isSidebarVisible && <Sidebar isVisible={isSidebarVisible} onToggleSidebar={handleToggleSidebar} />}

        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, backgroundColor: '#121212' }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/DummyChat" element={<ProtectedRoute><DummyChat isVisible={isSidebarVisible} /></ProtectedRoute>} />
            <Route path="/message" element={<ProtectedRoute><MessagePage /></ProtectedRoute>} />
            <Route path="/" element={<ProtectedRoute><MainPage isVisible={isSidebarVisible} /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
