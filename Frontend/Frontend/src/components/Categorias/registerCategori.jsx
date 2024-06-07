import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterCategori = ({ onClose, onCategoriaAgregada }) => {
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [imagenCategoria, setImagenCategoria] = useState(null);
  const [errorMessageShown, setErrorMessageShown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formularioRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting || errorMessageShown) {
      return;
    }

    if (nombreCategoria === "" || imagenCategoria === null) {
      toast.error('Los campos son requeridos');
      setIsSubmitting(false);
      setErrorMessageShown(true);
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', nombreCategoria);
    formData.append('imagen', imagenCategoria);

    try {
      const response = await axios.post('http://localhost:3000/agregarCategoria/categorias', formData);
      console.log('Respuesta del servidor:', response.data);
      toast.success('Categoría agregada correctamente');

      // Si se proporciona la función onCategoriaAgregada, llámala para notificar al componente padre que se ha agregado una nueva categoría
      setTimeout(() => {
        if (onCategoriaAgregada) {
          onCategoriaAgregada();
        }

        // Cerrar el formulario
      if (onClose) {
        onClose();
      }
      }, 2000);
     

      // Resetear el formulario y el estado del componente
      formularioRef.current.reset();
      setNombreCategoria('');
      setImagenCategoria(null);

      
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      toast.error('Hubo un error al procesar la solicitud.');
    } finally {
      setIsSubmitting(false);
      setErrorMessageShown(true);
    }
  };

  const handleFileChange = (e) => {
    setImagenCategoria(e.target.files[0]);
  };

  return (
    <div className="form-container">
      <ToastContainer
        onClose={() => setErrorMessageShown(false)}
        onExited={() => setErrorMessageShown(false)}
      />
      <form id='form' onSubmit={handleSubmit} ref={formularioRef}>
        <h4>Registrar nueva categoría</h4>
        <div className="form-group">
          <label htmlFor="nombreCategoria">Nombre de la Categoría:</label>
          <input
            type="text"
            id="nombreCategoria"
            value={nombreCategoria}
            onChange={(e) => setNombreCategoria(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imagenCategoria">Seleccionar imagen de la Categoría:</label>
          <input
            type="file"
            id="imagenCategoria"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className='btn-registerCategori' disabled={isSubmitting}>Crear Categoría</button>
      </form>
    </div>
  );
};

export default RegisterCategori;
