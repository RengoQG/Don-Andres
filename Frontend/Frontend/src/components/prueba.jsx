import React, { useState, useEffect, useRef,useHistory } from "react";
import axios from "axios";
import "../EstilosComponentes/pruebaS.css"; // Archivo de estilos CSS para el componente
import { FaSearch, FaTimes } from "react-icons/fa"; // Importar el icono de búsqueda de react-icons
import { useNavigate } from 'react-router-dom';


const BuscadorProductos = () => {
  const navigateTo = useNavigate();
  const [query, setQuery] = useState("");
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [sugerenciaSeleccionada, setSugerenciaSeleccionada] = useState(null);
  const [sugerenciaBajoCursor, setSugerenciaBajoCursor] = useState(null);
  const [totalResultados, setTotalResultados] = useState(0);
  const [seleccionConFlecha, setSeleccionConFlecha] = useState(false);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [historial, setHistorial] = useState(() => {
    const storedHistorial = localStorage.getItem("busquedaHistorial");
    return storedHistorial ? JSON.parse(storedHistorial) : [];
  });
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(
      "busquedaHistorial",
      JSON.stringify([...new Set(historial)])
    );
  }, [historial]);

  const handleClearHistory = () => {
    localStorage.removeItem("busquedaHistorial");
    setHistorial([]);
    setSugerenciaSeleccionada(null); 
    setSugerenciaBajoCursor(null); 
    setSeleccionConFlecha(false); 
  };

  // Dentro del componente BuscadorProductos

  useEffect(() => {
    // Función para manejar los clics fuera del campo de búsqueda y de las sugerencias
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        // Si el clic no proviene del campo de búsqueda o de las sugerencias, ocultar las sugerencias
        setMostrarSugerencias(false);
        setMostrarHistorial(false);
        setTotalResultados(0); // Ocultar el número de resultados al hacer clic fuera del campo de búsqueda
        // Reiniciar la selección de sugerencias al hacer clic fuera del campo de búsqueda o de las sugerencias
        setSugerenciaSeleccionada(null);
      }
    };

    // Agregar un event listener al documento para detectar clics fuera del campo de búsqueda y de las sugerencias
    document.addEventListener("click", handleClickOutside);

    // Retornar una función de limpieza para eliminar el event listener cuando el componente se desmonte
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []); // Se ejecuta solo una vez al montar el componente

  // Restablecer la selección de sugerencias cuando se realiza una búsqueda
  // useEffect(() => {
  //   setSugerenciaSeleccionada(null);
  // }, [query]);
  const handleInputChange = async (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    setError("");

    if (inputValue.trim().length >= 3) {
      try {
        const response = await axios.post(
          "http://192.168.20.238:6001/sugerencias/sugerencias",
          {
            query: inputValue,
          }
        );
        if (response.data.error) {
          setError(response.data.error);
          setSugerencias([]);
          setTotalResultados(0);
        } else {
          setSugerencias(response.data.sugerencias || []);
          setTotalResultados(response.data.totalResults || 0);
          setMostrarSugerencias(true);
          setMostrarHistorial(false);
        }
      } catch (error) {
        // setError('Error al obtener sugerencias de productos.');
        // console.error(error);
      }
    } else {
      setSugerencias([]);
      setTotalResultados(0);
      setMostrarSugerencias(false);
    }
  };

  const handleInputClick = () => {
    // Mostrar el historial solo cuando se hace clic en el campo de búsqueda y este esté vacío
    if (query.trim() === '') {
      setMostrarHistorial(true);
      setMostrarSugerencias(false);
    }
  };

  const handleMostrarTodosLosProductos = async (inputValue) => {
    try {
      const response = await axios.post(
        "http://192.168.20.238:6001/sugerencias/sugerencias",
        {
          query: inputValue,
        }
      );
      if (response.data.error) {
        setError(response.data.error);
        setProductos([]); // Utiliza setProductos en lugar de productos
      } else {
        setProductos(response.data.productos); // Utiliza setProductos en lugar de productos
      }
    } catch (error) {
      setError("Error al obtener todos los productos.");
      console.error(error);
      setProductos([]); // Utiliza setProductos en lugar de productos
    }
    setQuery("");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!query.trim()) {
      setError('Por favor, ingrese un término de búsqueda.');
      setProductos([]);
      setTotalResultados(0);
      return;
    }
    try {
      const response = await axios.post('http://192.168.20.238:6001/searchName/search', {
        query: query
      });
      if (response.data.error) {
        setError(response.data.error);
        setProductos([]);
        setTotalResultados(0);
      } else {
        setProductos(response.data);
        setMostrarSugerencias(false);
        setQuery('');
        if (response.data.length === 0) {
          setError('No se encontraron productos relacionados con la búsqueda.');
        } else {
          setError('');
        }
        setTotalResultados(0);
      }
    } catch (error) {
      setError('Error al buscar productos.');
      console.error(error);
    } finally {
      setSugerenciaSeleccionada(null); // Reiniciar sugerenciaSeleccionada después de realizar la búsqueda
    }
  };
  const handleMouseEnter = (index) => {
    setSugerenciaBajoCursor(index);
    setSugerenciaSeleccionada(index);
    setSeleccionConFlecha(true); // Establecer selección con flecha para mantener consistencia
  };
  
  const handleMouseLeave = () => {
    // setSugerenciaBajoCursor(null);
    setSugerenciaSeleccionada(null);
  };
  const handleSugerenciaClick = async (sugerencia) => {
    setQuery(sugerencia);
    setMostrarSugerencias(false);
    try {
      const response = await axios.post(
        "http://192.168.20.238:6001/searchName/search",
        {
          query: sugerencia,
        }
      );
      if (response.data.error) {
        setError(response.data.error);
        setProductos([]);
      } else {
        setProductos(response.data);
        navigateTo(`/producto/${response.data[0].name}`, { state: { producto: response.data } });
        setQuery("");
        setMostrarSugerencias(false);
        if (response.data.length === 0) {
          setError("No se encontraron productos relacionados con la búsqueda.");
        } else {
          setError("");
        }
        setTotalResultados(0);
        // Verificar si el producto ya existe en el historial
        const productoExistente = historial.find(item => item.nombre === sugerencia);
        if (!productoExistente) {
          // Agregar la búsqueda al historial solo si no existe
          setHistorial(prevHistorial => [...prevHistorial, { nombre: sugerencia, precio: 300 }]);
        }
      }
    } catch (error) {
      setError("Error al buscar productos.");
      console.error(error);
    }
    setSugerenciaSeleccionada(null); 
    setSugerenciaBajoCursor(null); 
    setSeleccionConFlecha(false); 
  };
  const handleClearInput = () => {
    setQuery("");
    setSugerencias([]);
    setMostrarSugerencias(false);
    setTotalResultados(0);
  };  
  const highlightMatches = (sugerencia) => {
    if (typeof sugerencia === "string") {
      const matchIndex = sugerencia.toLowerCase().indexOf(query.toLowerCase());
      if (matchIndex !== -1) {
        return (
          <span>
            {sugerencia.substring(0, matchIndex)}
            <span className="highlight">
              {sugerencia.substring(matchIndex, matchIndex + query.length)}
            </span>
            {sugerencia.substring(matchIndex + query.length)}
          </span>
        );
      }
    }
    return sugerencia;
  };
  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      let nextIndex;
      if (mostrarHistorial) {
        // Navegación y selección en el historial
        nextIndex =
          sugerenciaSeleccionada === null
            ? event.key === "ArrowDown"
              ? 0
              : historial.length - 1
            : event.key === "ArrowDown"
            ? (sugerenciaSeleccionada + 1) % historial.length
            : sugerenciaSeleccionada === 0
            ? historial.length - 1
            : sugerenciaSeleccionada - 1;
        // No mostrar los mensajes de "No se encontraron resultados" en el historial
        setError("");
        setTotalResultados(0);
      } else {
        // Navegación y selección en las sugerencias
        nextIndex =
          event.key === "ArrowDown"
            ? sugerenciaSeleccionada === null || sugerenciaSeleccionada === sugerencias.length - 1
              ? 0
              : sugerenciaSeleccionada + 1
            : sugerenciaSeleccionada === null || sugerenciaSeleccionada === 0
            ? sugerencias.length - 1
            : sugerenciaSeleccionada - 1;
      }
      setSugerenciaSeleccionada(nextIndex);
      setSeleccionConFlecha(true);
      setMostrarSugerencias(true);
    } else if (event.key === "Enter" && sugerenciaSeleccionada !== null) {
      if (mostrarHistorial) {
        handleSugerenciaClick(historial[sugerenciaSeleccionada].nombre);
      } else {
        handleSugerenciaClick(sugerencias[sugerenciaSeleccionada].name);
      }
      setSeleccionConFlecha(false);
      setMostrarHistorial(false);
      setSugerenciaSeleccionada(null); // Reiniciar sugerenciaSeleccionada después de realizar la búsqueda
    }
  };
  
  
  useEffect(() => {
    if (mostrarSugerencias && sugerencias.length > 0) {
      inputRef.current.focus();
      setSugerenciaSeleccionada(null); // Reiniciar la selección cuando se muestran nuevas sugerencias
      inputRef.current.focus();
    }
  }, [mostrarSugerencias, sugerencias]);

  return (
    <div className={`buscador-container ${mostrarSugerencias || mostrarHistorial ? "expanded" : ""}`} onMouseLeave={handleMouseLeave}>
      {(mostrarSugerencias || mostrarHistorial) && <div className="overlay" />}
      <form
        onSubmit={handleSubmit}
        className={`buscador-form ${mostrarSugerencias ? "sugerencias-activas" : ""}`}
      >
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
            onClick={handleInputClick}
            // onBlur={() => setTimeout(() => setMostrarSugerencias(false), 100)}
          />
          {mostrarSugerencias && query && (
            <FaTimes className="clear-icon" onClick={handleClearInput} />
          )}
        </div>
        {mostrarSugerencias && !mostrarHistorial && (
          <ul className="sugerencias-list">
            {sugerencias.length > 0 ? (
              sugerencias.map((sugerencia, index) => (
                <li
                  key={index}
                  className={`sugerencia-item ${seleccionConFlecha && index === sugerenciaSeleccionada ? "selected" : ""}`}
                  onClick={() => handleSugerenciaClick(sugerencia.name)}
                  onMouseEnter={() => handleMouseEnter(index)}
                >
                  {/* Contenido de la sugerencia */}
                  <div className={`sugerencia-content ${seleccionConFlecha && index === sugerenciaSeleccionada ? "sugerencia-seleccionada" : ""}`}>
                    <img
                      src="../../public/images/A01.jpg"
                      alt="Producto"
                      className="sugerencia-imagen"
                    />
                    <div className="sugerencia-info">
                      <span className="sugerencia-nombre">
                        {highlightMatches(sugerencia.name)}
                      </span>
                      <span className="sugerencia-precio">
                        ${sugerencia.price}
                      </span>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="no-results-message">
                No se encontraron resultados
              </li>
            )}
            {/* Elemento de la lista para mostrar todos los productos */}
            <li className={`total-resultados ${mostrarSugerencias ? "sugerencia-item" : ""}`} onClick={() =>  handleMostrarTodosLosProductos(query)}>
              Ver todos los productos: {totalResultados}
            </li>
          </ul>
        )}

        {/* historial */}
        {mostrarHistorial && (
          <div>
            <h4 className="ml-2">Historial</h4>
            <ul className="sugerencias-list">
              {historial.map((item, index) => (
                <li
                  key={index}
                  className={`sugerencia-item ${seleccionConFlecha && index === sugerenciaSeleccionada ? "selected" : ""}`}
                  onClick={() => handleSugerenciaClick(item.nombre)}
                  onMouseEnter={() => handleMouseEnter(index)}
                >
                  {/* Contenido del historial */}
                  <div className="sugerencia-content">
                    <img
                      src="../../public/images/A01.jpg"
                      alt="Producto"
                      className="sugerencia-imagen"
                    />
                    <div className="sugerencia-info">
                      <span className="sugerencia-nombre">{item.nombre}</span>
                      <span className="sugerencia-precio">${item.precio}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <span className="ml-2">
              <a href="#" onClick={handleClearHistory}>Limpiar historial</a>
            </span>
          </div>
        )}


      </form>
      {/* Historial de búsquedas */}
      {error && <p className="error-message">{error}</p>}
      {productos.length > 0 && (
        <ul className="productos-list">
          {productos.map((producto) => (
            <li key={producto.product_id} className="producto-item">
              {producto.name} - {producto.price} - {producto.codigo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );


};

export default BuscadorProductos;
