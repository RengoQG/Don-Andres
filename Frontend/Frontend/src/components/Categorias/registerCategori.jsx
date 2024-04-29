import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../EstilosComponentes/registerCategori.css'; // Archivo de estilos CSS para el formulario

const InsertarCategoriaForm = () => {
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

    if(nombreCategoria === "" || imagenCategoria === ""){
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
      const response = await axios.post('http://192.168.20.238:6001/agregarCategoria/categorias', formData);
      console.log('Respuesta del servidor:', response.data);
      toast.success('Agregado correctamente');
      
      // Resetear el formulario y el estado del componente
      formularioRef.current.reset();
      setNombreCategoria('');
      setImagenCategoria(null);
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      toast.error('Hubo un error al registrar la categoría.');
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
        <h4>Registra una nueva categoria</h4>
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
          <label htmlFor="imagenCategoria">Imagen de la Categoría:</label>
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

export default InsertarCategoriaForm;
