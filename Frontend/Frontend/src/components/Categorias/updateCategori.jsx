import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../../EstilosComponentes/registerCategori.css'; // Archivo de estilos CSS para el formulario

const EditarCategoriaForm = ({ categoria, onCategoriaActualizada, onClose }) => {
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [imagenCategoria, setImagenCategoria] = useState(null);
  const [errorMessageShown, setErrorMessageShown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigateTo = useNavigate();

  const formularioRef = useRef(null);

  // Establecer el estado con el nombre de la categoría si existe una categoría proporcionada
  useEffect(() => {
    if (categoria) {
      setNombreCategoria(categoria.name);
    }
  }, [categoria]);

  // Si se proporciona la función onCategoriaAgregada, llámala para notificar al componente padre que se ha agregado una nueva categoría
  if (onCategoriaActualizada) {
    onCategoriaActualizada();
  }

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

    if (nombreCategoria === "") {
      toast.error('El nombre de la categoría es requerido');
      setIsSubmitting(false);
      setErrorMessageShown(true);
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', nombreCategoria);
    if (imagenCategoria) {
      formData.append('imagen', imagenCategoria);
    }

    try {
      // Enviar una solicitud PUT para actualizar la categoría
      const response = await axios.put(`http://localhost:6001/editarCategoria/categoria/${categoria.category_id}`, formData);
      console.log('Respuesta del servidor:', response.data);
      toast.success('Categoría actualizada correctamente');

      // Resetear el formulario y el estado del componente
      formularioRef.current.reset();
      setNombreCategoria('');
      setImagenCategoria(null);

      // Mostrar la tabla nuevamente
      handleClose();
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
        <h4>Editar categoría</h4>
        <div className="form-group">
          <label htmlFor="nombreCategoria">Nombre de la Categoría:</label>
          <input
            type="text"
            id="nombreCategoria"
            value={nombreCategoria}
            onChange={(e) => setNombreCategoria(e.target.value)}
          />
        </div>
        {/* Mostrar la imagen de la categoría si está disponible */}
        {categoria && (
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
        <button type="submit" className='btn-registerCategori' disabled={isSubmitting}>Actualizar Categoría</button>
      </form>
    </div>
  );
};

export default EditarCategoriaForm;
