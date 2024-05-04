import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:6001/reset/reset', { email });
      const token = response.data.token; // Suponiendo que el servidor devuelve el token en la respuesta

      // Construye la URL con el token
      const resetPasswordUrl = `http://localhost:5173/updatePassword?token=${token}`;

      // Envía la solicitud de restablecimiento de contraseña al servidor
      await axios.post('http://localhost:6001/reset/reset', { email, resetPasswordUrl });

      // Muestra un mensaje de éxito
      toast.success('Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña');
    } catch (error) {
      console.error('Error al enviar la solicitud de restablecimiento de contraseña:', error);
      toast.error('Ha ocurrido un error al enviar la solicitud de restablecimiento de contraseña');
    }

    setIsLoading(false);
  };

  return (
    <div>
      <ToastContainer />
      <h2>Olvidé mi contraseña</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Correo electrónico:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar correo electrónico de restablecimiento'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
