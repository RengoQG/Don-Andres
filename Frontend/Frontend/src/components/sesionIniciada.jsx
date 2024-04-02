import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SesionIniciada = () => {
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  useEffect(() => {
    const verificar = localStorage.getItem('Bienvenida');

    if (!verificar) {
      // Establecer el estado para mostrar el mensaje
      setMostrarMensaje(true);

      // Guardar en localStorage
      localStorage.setItem('Bienvenida', 'Bienvenida');
    }
  }, []);

  useEffect(() => {
    if (mostrarMensaje) {
      // Mostrar el mensaje de bienvenida
      toast.success('Prueba');
    }
  }, [mostrarMensaje]);

  return (
    <div>
      <ToastContainer />
      <h1>Bienvenido a nuestra aplicación</h1>
      <p>Esperamos que disfrutes tu estancia.</p>
    </div>
  );
};

export default SesionIniciada;
