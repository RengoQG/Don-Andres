import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsAuthenticated(false);
          navigateTo('/login');
          return;
        }

        const response = await fetch('https://horizonsolutions.com.co:3000/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigateTo('/login');
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        setIsAuthenticated(false);
        navigateTo('/login');
      }
    };

    checkAuth();
  }, [navigateTo]);

  return isAuthenticated ? (
    <>
      {children}
    </>
  ) : null;
};

export default AuthGuard;
