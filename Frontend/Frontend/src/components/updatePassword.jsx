import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = queryParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      // Si no hay token en la URL, redirigir al usuario a una página de error o de inicio de sesión
      navigate('/login'); // Cambia '/login' por la ruta de tu página de inicio de sesión
    }
  }, [navigate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post('http://localhost:6001/validate/validate', { token, newPassword });
      toast.success('Contraseña restablecida exitosamente');
      navigate('/login'); // Redirigir al usuario a la página de inicio de sesión después de restablecer la contraseña
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      toast.error('Ha ocurrido un error al restablecer la contraseña');
    }

    setIsLoading(false);
  };

  return (
    <div>
      <ToastContainer />
      <h2>Restablecer contraseña</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Nueva contraseña:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Restableciendo...' : 'Restablecer contraseña'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
