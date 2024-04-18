import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../EstilosComponentes/pruebaS.css'; // Archivo de estilos CSS para el componente
import { FaSearch, FaTimes } from 'react-icons/fa'; // Importar el icono de búsqueda de react-icons

const BuscadorProductos = () => {
  const [query, setQuery] = useState('');
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  const [sugerencias, setSugerencias] = useState([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [sugerenciaSeleccionada, setSugerenciaSeleccionada] = useState(null);
  const inputRef = useRef(null);

  const handleInputChange = async (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    setError('');

    if (inputValue.trim().length >= 3) {
      try {
        const response = await axios.post('http://192.168.20.238:6001/sugerencias/sugerencias', {
          query: inputValue
        });
        if (response.data.error) {
          setError(response.data.error);
          setSugerencias([]);
        } else {
          setSugerencias(response.data);
          setMostrarSugerencias(true);
        }
      } catch (error) {
        // setError('Error al obtener sugerencias de productos.');
        // console.error(error);
      }
    } else {
      setSugerencias([]);
      setMostrarSugerencias(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!query.trim()) {
      setError('Por favor, ingrese un término de búsqueda.');
      setProductos([]);
      return;
    }
    try {
      const response = await axios.post('http://192.168.20.238:6001/searchName/search', {
        query: query
      });
      if (response.data.error) {
        setError(response.data.error);
        setProductos([]);
      } else {
        setProductos(response.data);
        setMostrarSugerencias(false);
        setQuery('');
        if (response.data.length === 0) {
          setError('No se encontraron productos relacionados con la búsqueda.');
        } else {
          setError('');
        }
      }
    } catch (error) {
      setError('Error al buscar productos.');
      console.error(error);
    }
  };

  const handleSugerenciaClick = async (sugerencia) => {
    setQuery(sugerencia);
    setMostrarSugerencias(false);
    try {
      const response = await axios.post('http://192.168.20.238:6001/searchName/search', {
        query: sugerencia
      });
      if (response.data.error) {
        setError(response.data.error);
        setProductos([]);
      } else {
        setProductos(response.data);
        setQuery('');
        setMostrarSugerencias(false);
        if (response.data.length === 0) {
          setError('No se encontraron productos relacionados con la búsqueda.');
        } else {
          setError('');
        }
      }
    } catch (error) {
      setError('Error al buscar productos.');
      console.error(error);
    }
  };


  const handleClearInput = () => {
    setQuery('');
    setSugerencias([]);
    setMostrarSugerencias(false);
  };

  const highlightMatches = (sugerencia) => {
    if (typeof sugerencia === 'string') {
      const matchIndex = sugerencia.toLowerCase().indexOf(query.toLowerCase());
      if (matchIndex !== -1) {
        return (
          <span>
            {sugerencia.substring(0, matchIndex)}
            <span className="highlight">{sugerencia.substring(matchIndex, matchIndex + query.length)}</span>
            {sugerencia.substring(matchIndex + query.length)}
          </span>
        );
      }
    }
    return sugerencia;
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (sugerenciaSeleccionada === null || sugerenciaSeleccionada === sugerencias.length - 1) {
        setSugerenciaSeleccionada(0);
      } else {
        setSugerenciaSeleccionada((prevIndex) => prevIndex + 1);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (sugerenciaSeleccionada === null || sugerenciaSeleccionada === 0) {
        setSugerenciaSeleccionada(sugerencias.length - 1);
      } else {
        setSugerenciaSeleccionada((prevIndex) => prevIndex - 1);
      }
    } else if (event.key === 'Enter' && sugerenciaSeleccionada !== null) {
      handleSugerenciaClick(sugerencias[sugerenciaSeleccionada].name);
    }
  };

  useEffect(() => {
    if (mostrarSugerencias && sugerencias.length > 0) {
      inputRef.current.focus();
    }
  }, [mostrarSugerencias, sugerencias]);

  return (
    <div className={`buscador-container ${mostrarSugerencias ? 'expanded' : ''}`}>
      {mostrarSugerencias && <div className="overlay" />}
      <form onSubmit={handleSubmit} className={`buscador-form ${mostrarSugerencias ? 'sugerencias-activas' : ''}`}>
        <div className="input-container">
          <FaSearch className="search-iconSe" />
          <input
            type="text"
            placeholder="Buscar producto por nombre, precio o código..."
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            className="buscador-input"
            onBlur={() => setTimeout(() => setMostrarSugerencias(false), 100)}
          />
          {mostrarSugerencias && query && (
            <FaTimes className="clear-icon" onClick={handleClearInput} />
          )}
        </div>
        {mostrarSugerencias && (
          <ul className="sugerencias-list">
            {sugerencias.length > 0 ? (
              sugerencias.map((sugerencia, index) => (
                <li
                  key={index}
                  className={`sugerencia-item ${index === sugerenciaSeleccionada ? 'selected' : ''}`}
                  onClick={() => handleSugerenciaClick(sugerencia.name)}
                >
                  {/* Contenido de la sugerencia */}
                  <div className={`sugerencia-content ${index === sugerenciaSeleccionada ? 'sugerencia-seleccionada' : ''}`}>
                    <img src="../../public/images/A01.jpg" alt="Producto" className="sugerencia-imagen" />
                    <div className="sugerencia-info">
                      <span className="sugerencia-nombre">{highlightMatches(sugerencia.name)}</span>
                      <span className="sugerencia-precio">${sugerencia.price}</span>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="no-results-message">No se encontraron resultados</li>
            )}
          </ul>
        )}
      </form>
      {error && <p className="error-message">{error}</p>}
      {productos.length > 0 && (
        <ul className="productos-list">
          {productos.map((producto) => (
            <li key={producto.id} className="producto-item">
              {producto.name} - {producto.price} - {producto.codigo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BuscadorProductos;
