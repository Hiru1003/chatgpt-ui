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
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const shouldShowSidebar = !['/login', '/signup', '/forgot-password', '/reset-password'].includes(location.pathname);
    
    setIsLoggedIn(!!accessToken);
    setSidebarVisible(shouldShowSidebar && isLargeScreen);

    if (!!accessToken && ['/login', '/signup', '/forgot-password', '/reset-password'].includes(location.pathname)) {
      navigate('/');
    }
  }, [location, isLargeScreen, navigate]);

  const handleToggleSidebar = () => {
    setSidebarVisible(prevState => !prevState);
  };

  const isSidebarVisibleOnCurrentPage = !['/login', '/signup', '/forgot-password'].includes(location.pathname);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', height: '100vh', backgroundColor: '#121212' }}>
        {/* Sidebar */}
        {isSidebarVisibleOnCurrentPage && <Sidebar isVisible={isSidebarVisible} onToggleSidebar={handleToggleSidebar} />}

        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, backgroundColor: '#121212' }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/" element={<MainPage isVisible={isSidebarVisible} />} />
            <Route path="/DummyChat" element={<DummyChat isVisible={isSidebarVisible} />} />
            {/* Protected Routes */}
            <Route
              path="/message"
              element={
                isLoggedIn ? (
                  <ProtectedRoute element={<MessagePage />} />
                ) : (
                  <Navigate to="/signup" replace />
                )
              }
            />
            {/* Handle all other paths */}
            <Route
              path="*"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/signup" replace />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
