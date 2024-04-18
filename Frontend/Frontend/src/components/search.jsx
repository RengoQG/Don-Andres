import React, { useState, useEffect, useRef } from 'react';
import '../EstilosComponentes/search.css';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import { useTransition, animated } from 'react-spring';
import { FaWhatsapp, FaSearch } from 'react-icons/fa';
import pluralize from 'pluralize';

const BuscadorProductos = ({ productos, categorias }) => {
    const [busqueda, setBusqueda] = useState('');
    const [resultados, setResultados] = useState([]);
    const [paginaActual, setPaginaActual] = useState(0);
    const [productosPorPagina] = useState(9);
    const [historial, setHistorial] = useState([]);
    const [busquedaRealizada, setBusquedaRealizada] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarHistorial, setMostrarHistorial] = useState(false); // Nuevo estado para controlar si se muestra el historial

    const inputRef = useRef(null); // Referencia al input

    const handlePageChange = ({ selected }) => {
        setPaginaActual(selected);
    };

    const inicio = paginaActual * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPaginaActual = resultados.slice(inicio, fin);

    const transitions = useTransition(productosPaginaActual, {
        from: { opacity: 0, transform: 'translate3d(0, 50px, 0)' },
        enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        trail: 200,
    });

    const handleInputChange = (e) => {
        setBusqueda(e.target.value);
        setMostrarHistorial(true); // Mostrar el historial cuando se escriba en el input
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const nuevaBusqueda = e.target.value.trim();
            setHistorial(prevHistorial => [...new Set([...prevHistorial, nuevaBusqueda])]);
            setPaginaActual(0);
            setBusqueda(nuevaBusqueda);
            setBusquedaRealizada(true);
        }
    };

    useEffect(() => {
        if (busquedaRealizada) {
            if (busqueda.trim() !== '') {
                const singularBusqueda = pluralize.singular(busqueda.toLowerCase().trim());
                const productosFiltrados = productos.filter(producto => {
                    const nombreCategoria = producto.nombre_categoria.toLowerCase();
                    const nombreProducto = producto.name.toLowerCase();
                    const categoriaBuscada = singularBusqueda.toLowerCase();
                    return (
                        (nombreProducto.includes(categoriaBuscada)) || // Filtrar por nombre de producto
                        (nombreCategoria === categoriaBuscada) // Filtrar por nombre exacto de categoría
                    );
                });
                setResultados(productosFiltrados);
            } else {
                setResultados([]);
            }
            setBusquedaRealizada(false);
        }
    }, [productos, busqueda, busquedaRealizada]);
    
    
    useEffect(() => {
        if (busquedaRealizada) {
            // Limpiar el input después de que se establezcan los resultados de la búsqueda
            setBusqueda('');
        }
    }, [resultados, busquedaRealizada]);

    const handleClickHistorial = (busqueda) => {
        setBusqueda(busqueda);
        setHistorial([]);
        setBusquedaRealizada(true);
    };

    const handleClickProducto = (producto) => {
        // Código para manejar la visualización del producto en un modal
    };

    const handleConsultarWhatsApp = (nombreProducto) => {
        // Código para mostrar la información de contacto en WhatsApp
    };

    const handleOutsideClick = (e) => {
        // Si se hace clic fuera del input, oculta el historial
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            setMostrarHistorial(false); // Ocultar el historial cuando se hace clic fuera del input
        }
    };

    useEffect(() => {
        // Agregar un listener para hacer clic fuera del input
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            // Limpiar el listener cuando el componente se desmonte
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleInputClick = () => {
        setMostrarHistorial(true); // Mostrar el historial cuando se hace clic dentro del input
    };

    return (
        <div className="search-bar-container">
            <div ref={inputRef} className="input-container">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o categoría..."
                        value={busqueda}
                        className={mostrarModal ? "modalSearch active" : "modalSearch"} // Aplica la clase "active" cuando la modal está activa
                        onChange={handleInputChange}
                        onClick={handleInputClick} // Activamos la modal al hacer clic en el input
                        onKeyPress={handleSearch}
                    />

                    {mostrarHistorial && historial.length > 0 && (
                        <div className="historial">
                            {historial.map((item, index) => (
                                <div key={index} className="historial-item" onClick={() => handleClickHistorial(item)}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            <div className="product-cards-container">
                
                {transitions((style, item) => (
                    <animated.div
                        key={item.id}
                        style={style}
                        className="product-card"
                        onClick={() => handleClickProducto(item)}
                        onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
                        onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
                    >
                        <img src="../../public/images/A01.png" alt={item.name} />
                        <div className="product-details">
                            <h3>{item.name}</h3>
                            <p>{item.category}</p>
                            <span>${item.price}</span>
                        </div>
                        <div className="search-icon">
                            <FaSearch />
                        </div>
                        <button className="btn-consultar">
                            <FaWhatsapp className="whatsapp-icon" style={{ fontSize: '1.5rem' }} />
                            Consultar con un asesor
                        </button>
                    </animated.div>
                ))}
                {resultados.length === 0 && busquedaRealizada && (
                    <div className="sin-resultados">No se encontraron resultados</div>
                )}
            </div>
            {/* Aquí se incluye la modal */}
            {mostrarModal && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Búsquedas recientes</h2>
                            <button className="close-modal" onClick={() => setMostrarModal(false)}>X</button>
                        </div>
                        <div className="modal-body">
                            {historial.map((item, index) => (
                                <div key={index} className="historial-item" onClick={() => handleClickHistorial(item)}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <div className='pagination-container'>
                <ReactPaginate
                    previousLabel="Anterior"
                    nextLabel="Siguiente"
                    pageCount={Math.ceil(resultados.length / productosPorPagina)}
                    onPageChange={handlePageChange}
                    containerClassName="pagination"
                    activeClassName="active"
                    previousClassName="page-item"
                    nextClassName="page-item"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                />
            </div>
        </div>
    );

};

export default BuscadorProductos;
