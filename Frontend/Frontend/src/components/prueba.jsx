import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../EstilosComponentes/pruebaS.css"; // Archivo de estilos CSS para el componente
import { FaSearch, FaTimes } from "react-icons/fa"; // Importar el icono de búsqueda de react-icons
import { useNavigate, useLocation  } from "react-router-dom";


const BuscadorProductos = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
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

  useEffect(() => {
    const storedHistorial = localStorage.getItem("busquedaHistorial");
    if (storedHistorial) {
      setHistorial(JSON.parse(storedHistorial));
    }
  }, []);

    // Escuchar cambios de navegación para actualizar historial
    useEffect(() => {
      // Actualizar el historial cuando cambie la ubicación (navegación)
      const storedHistorial = localStorage.getItem("busquedaHistorial");
      if (storedHistorial) {
        setHistorial(JSON.parse(storedHistorial));
      }
    }, [location.pathname]);


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
          "https://horizonsolutions.com.co:3000/sugerencias/sugerencias",
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
        "https://horizonsolutions.com.co:3000/sugerencias/sugerencias",
        {
          query: inputValue,
        }
      );
      if (response.data.error) {
        setError(response.data.error);
        setProductos([]); // Utiliza setProductos en lugar de productos
      } else {
        setProductos(response.data.productos); // Utiliza setProductos en lugar de productos
        navigateTo('/total-resultados', { state: { productos: response.data.productos } });
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
      const response = await axios.post('https://horizonsolutions.com.co:3000/searchName/search', {
        query: query
      });
  
      if (response.data.error) {
        setError(response.data.error);
        setProductos([]);
        setTotalResultados(0);
      } else {
        setProductos(response.data);
  
        if (response.data.length === 0) {
          setError('No se encontraron productos relacionados con la búsqueda.');
          setTotalResultados(0);
        } else {
          setError('');
          setTotalResultados(0);
  
          // Obtener el producto relacionado con la búsqueda
          const productoRelacionadoInfo = response.data[0]; // Accede al primer producto
  
          // Crear el objeto del producto a agregar
          const productoNuevo = {
            id: productoRelacionadoInfo.product_id,
            nombre: productoRelacionadoInfo.name,
            precio: productoRelacionadoInfo.price,
            codigo: productoRelacionadoInfo.codigo,
            image_url: productoRelacionadoInfo.image_url,
          };
  
          // Solo agregar el producto seleccionado al historial
          setHistorial((prevHistorial) => {
            // Filtrar productos duplicados
            const historialSinDuplicados = prevHistorial.filter(item => item.id !== productoNuevo.id);
  
            // Crear el nuevo historial y agregar el nuevo producto
            const nuevoHistorial = [productoNuevo, ...historialSinDuplicados];
  
            // Limitar el tamaño del historial a 5 elementos
            if (nuevoHistorial.length > 5) {
              nuevoHistorial.pop(); // Elimina el último elemento si hay más de 5
            }
  
            return nuevoHistorial;
          });
  
          // Redireccionar al producto
          const slug = productoRelacionadoInfo.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
          setTimeout(() => {
            navigateTo(`/producto?id=${productoRelacionadoInfo.product_id}&name=${slug}`);
          }, 1); // Retraso de 1 milisegundo
  
          setQuery('');
          setMostrarSugerencias(false);
        }
      }
    } catch (error) {
      setError('Error al buscar productos.');
      console.error(error);
    } finally {
      setSugerenciaSeleccionada(null); // Reset suggestion after search
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
        "https://horizonsolutions.com.co:3000/searchName/search",
        {
          query: sugerencia,
        }
      );
  
      if (response.data.error) {
        setError(response.data.error);
        setProductos([]);
      } else {
        // Filtrar elementos repetidos antes de agregar al historial
        const productoRelacionadoInfo = response.data[0]; // Producto relacionado con la búsqueda
        setProductos(response.data);
  
        if (response.data.length === 0) {
          setError("No se encontraron productos relacionados con la búsqueda.");
        } else {
          setError("");
        }
        setTotalResultados(0);
  
        // Filtrar productos duplicados y asegurarse de que solo se guarde el producto seleccionado
        const productosEnHistorial = response.data.map((producto) => ({
          id: producto.product_id,
          nombre: producto.name,
          precio: producto.price,
          codigo: producto.codigo,
          image_url: producto.image_url,
        }));
  
        // Filtrar productos duplicados
        const productosUnicos = [];
        const idsVistos = new Set();
        const nombresVistos = new Set();
  
        productosEnHistorial.forEach((producto) => {
          if (!idsVistos.has(producto.id) && !nombresVistos.has(producto.nombre)) {
            idsVistos.add(producto.id);
            nombresVistos.add(producto.nombre);
            productosUnicos.push(producto);
          }
        });
  
        // Filtrar productos que no estén en el historial
        const historialNombres = historial.map((producto) => producto.nombre);
        const productosNuevos = productosUnicos.filter(
          (producto) => !historialNombres.includes(producto.nombre)
        );
  
        // Solo agregar el producto seleccionado al historial
        const productoSeleccionado = productosUnicos.find((producto) => producto.nombre === sugerencia);
  
        if (productoSeleccionado) {
          setHistorial((prevHistorial) => {
            const nuevoHistorial = [productoSeleccionado, ...prevHistorial.filter(item => item.id !== productoSeleccionado.id)];
            
            // Limitar el tamaño del historial a 5 elementos
            if (nuevoHistorial.length > 5) {
              nuevoHistorial.pop(); // Elimina el último elemento
            }
  
            return nuevoHistorial;
          });
  
          // Redireccionar al producto seleccionado
          const slug = productoSeleccionado.nombre.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
          setTimeout(() => {
            navigateTo(`/producto?id=${productoSeleccionado.id}&name=${slug}`);
          }, 1); // Retraso de 1 milisegundo
        }
        
        setQuery("");
        setMostrarSugerencias(false);
      }
    } catch (error) {
      setError("Error al buscar productos.");
      console.error(error);
    } finally {
      setSugerenciaSeleccionada(null);
      setSugerenciaBajoCursor(null);
      setSeleccionConFlecha(false);
    }
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

  console.log(historial);

  return (
    <div className={`buscador-container ${mostrarSugerencias || mostrarHistorial ? "expanded" : ""}`} onMouseLeave={handleMouseLeave}>
      {(mostrarSugerencias || mostrarHistorial) && <div className="overlay" />}
      <form
        onSubmit={handleSubmit}
        className={`buscador-formSearch ${mostrarSugerencias ? "sugerencias-activas" : ""} buscadorContainerInput`}
      >
        <div className="input-container ">
          <FaSearch className="search-iconSe" />
          <input
            type="text"
            placeholder="Buscar productos..."
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
                      src={`../../public/images/Productos/${sugerencia.image_url}`}
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
            {/* <li className={`total-resultados ${mostrarSugerencias ? "sugerencia-item" : ""}`} onClick={() =>  handleMostrarTodosLosProductos(query)}>
              Ver todos los productos: {totalResultados}
            </li> */}
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
                    src={`../../public/images/Productos/${item.image_url}`}
                    alt={`${item.imagen}`}
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
            <a className ="btn-limpiarHistorial" onClick={handleClearHistory}>Limpiar historial</a>
          </span>
        </div>
        )}


      </form>
      {/* Historial de búsquedas */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );


};

export default BuscadorProductos;
