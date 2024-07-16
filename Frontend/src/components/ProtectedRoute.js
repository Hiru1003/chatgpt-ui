import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...props }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken'); 

  return isAuthenticated ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/signup" replace />
  );
};

export default ProtectedRoute;
