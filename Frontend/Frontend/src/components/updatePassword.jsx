import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import '../EstilosComponentes/updatePassword.css'

const ResetPassword = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = queryParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
    if (newPassword !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);

    try {
      await axios.post('http://localhost:6001/validate/validate', { token, newPassword });
      toast.success('Contraseña restablecida exitosamente');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      toast.error('Ha ocurrido un error al restablecer la contraseña');
    }

    setIsLoading(false);
  };

  return (
    <div className='.container'>
      <ToastContainer />
      <h1 id='titleUpdate'>Restablecer contraseña</h1>
      <div className='form__main'>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Nueva contraseña:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirmar contraseña:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button id='btnUpdate' type="submit" disabled={isLoading}>
          {isLoading ? 'Restableciendo...' : 'Restablecer contraseña'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default ResetPassword;
