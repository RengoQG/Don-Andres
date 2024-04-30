import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../../EstilosComponentes/registerCategori.css'; // Archivo de estilos CSS para el formulario

const InsertarCategoriaForm = ({ categoria, isUpdateMode, onClose }) => {
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [imagenCategoria, setImagenCategoria] = useState(null);
  const [errorMessageShown, setErrorMessageShown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigateTo = useNavigate();

  const formularioRef = useRef(null);

  // Si se está en modo de actualización, establecer el estado con el nombre de la categoría
  useEffect(() => {
    if (isUpdateMode && categoria) {
      setNombreCategoria(categoria.name);
    }
  }, [categoria, isUpdateMode]);

  const handleClose = () => {
    // Llama a la función onClose cuando se cierre el formulario de edición
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting || errorMessageShown) {
      return;
    }

    if (nombreCategoria === "" || imagenCategoria === "") {
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
      if (isUpdateMode) {
        // Si estamos en modo actualización, enviar una solicitud PUT en lugar de POST
        const response = await axios.put(`http://192.168.20.238:6001/editarCategoria/categoria/${categoria.category_id}`, formData);
        console.log('Respuesta del servidor:', response.data);
        toast.success('Categoría actualizada correctamente');
      } else {
        // Si no estamos en modo actualización, enviar una solicitud POST para agregar una nueva categoría
        const response = await axios.post('http://192.168.20.238:6001/agregarCategoria/categorias', formData);
        console.log('Respuesta del servidor:', response.data);
        toast.success('Categoría agregada correctamente');
      }

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

  useEffect(() => {
    if (!isUpdateMode) {
        setNombreCategoria('');
        setImagenCategoria(null);
    }
}, [isUpdateMode]);

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
        <h4>{isUpdateMode ? 'Editar categoría' : 'Registrar nueva categoría'}</h4>
        <div className="form-group">
          <label htmlFor="nombreCategoria">Nombre de la Categoría:</label>
          <input
            type="text"
            id="nombreCategoria"
            value={nombreCategoria}
            onChange={(e) => setNombreCategoria(e.target.value)}
          />
        </div>
        {/* Mostrar la imagen de la categoría si está en modo de actualización */}
        {isUpdateMode && categoria && (
          <div className="form-group">
            <label>Imagen de la Categoría:</label>
            <img
              src={`public/images/CategoriaImagenes/${categoria.url_imagen}`}
              alt="Imagen de la categoría"
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="imagenCategoria">Seleccionar nueva imagen de la Categoría:</label>
          <input
            type="file"
            id="imagenCategoria"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className='btn-registerCategori' disabled={isSubmitting}>{isUpdateMode ? 'Actualizar' : 'Crear'} Categoría</button>
      </form>
    </div>
  );
};

export default InsertarCategoriaForm;
