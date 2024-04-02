import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const isAuthenticated = () => {
    // Verifica si el usuario está autenticado utilizando el token almacenado en el almacenamiento local
    return localStorage.getItem('token') !== null;
  };

  return isAuthenticated() ? (
    <>
      {children}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthGuard;
