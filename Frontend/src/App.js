import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar';
import MainPage from './components/MainPage';
import LoginPage from './components/Login';
import MessagePage from './components/Message';
import SignupPage from './components/SignUp';
import ForgotPasswordPage from './components/ForgotPassword';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import DummyChat from './components/DummyChat';
import ResetPasswordPage from './components/Resetpassword';
import ProtectedRoute from './components/ProtectedRoute';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    background: {
      darker:'#000000',
      normal: '#121212',
      light : '#212121',
      lighter: '#ffffff',
    },
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    text:{
      light: '',
      lighter: '#ffffff',
    },
    icon:{
      light: '#ffffff'
    }
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const shouldShowSidebar = !['/login', '/signup', '/forgot-password', '/reset-password'].includes(location.pathname);
    
    setIsLoggedIn(!!accessToken);
    setSidebarVisible(shouldShowSidebar && isLargeScreen);

    if (accessToken && ['/login', '/signup', '/forgot-password', '/reset-password'].includes(location.pathname)) {
      navigate('/');
    } else if (!accessToken && !['/login', '/signup', '/forgot-password', '/reset-password'].includes(location.pathname)) {
      navigate('/signup');
    }
  }, [location, isLargeScreen, navigate]);

  const handleToggleSidebar = () => {
    setSidebarVisible(prevState => !prevState);
  };

  const isSidebarVisibleOnCurrentPage = !['/login', '/signup', '/forgot-password'].includes(location.pathname);

  const handleLogoutClick = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, 
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
        navigate('/signup');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', height: '100vh', backgroundColor: '#121212' }}>
        {/* Sidebar */}
        {isSidebarVisibleOnCurrentPage && <Sidebar isVisible={isSidebarVisible} onToggleSidebar={handleToggleSidebar} onLogout={handleLogoutClick} />}

        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, backgroundColor: '#121212' }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/" element={isLoggedIn ? <MainPage isVisible={isSidebarVisible} /> : <Navigate to="/signup" />} />
            <Route path="/DummyChat" element={isLoggedIn ? <DummyChat isVisible={isSidebarVisible} /> : <Navigate to="/signup" />} />
            <Route path="/message" element={isLoggedIn ? <ProtectedRoute element={<MessagePage />} /> : <Navigate to="/signup" />} />
            <Route path="*" element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/signup" />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
