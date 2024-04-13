import React, { useState, useEffect } from 'react';
import '../EstilosComponentes/search.css';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import { useTransition, animated } from 'react-spring'; // Asegúrate de importar useTransition y animated desde react-spring
import { FaWhatsapp } from 'react-icons/fa';

const BuscadorProductos = ({ productos }) => {
    const [busqueda, setBusqueda] = useState('');
    const [resultados, setResultados] = useState([]);
    const [paginaActual, setPaginaActual] = useState(0);
    const [productosPorPagina] = useState(6);

    useEffect(() => {
        const productosFiltrados = productos.filter(producto =>
            producto.name.toLowerCase().includes(busqueda.toLowerCase())
        );
        setResultados(productosFiltrados);
    }, [productos, busqueda]);

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

    const handleClickProducto = (producto) => {
        Swal.fire({
            title: producto.name,
            html: `
                <div>
                    <img src="images/A01.png" alt="${producto.name}" style="width: 60%; margin-bottom: 10px;" />
                    <p>Descripción: ${producto.description}</p>
                    <p>Precio: $${producto.price}</p>
                    <button className="btn-consultar">
                        <i className="fab fa-whatsapp whatsapp-icon"></i>
                        Consultar con un asesor
                    </button>
                </div>
            `,
            showCloseButton: true,
            showConfirmButton: false,
            focusConfirm: false,
            customClass: {
                container: 'custom-swal-container',
                closeButton: 'btn-close',
            },
            onOpen: () => {
                const modalContainer = document.querySelector('.swal2-container');
                modalContainer.style.width = '1000px';
            }
        }).then(() => {
            const btnConsultar = document.querySelector('.btn-consultar');
            btnConsultar.addEventListener('click', () => handleConsultarWhatsApp(producto.name));
        });
    };

    const handleConsultarWhatsApp = (nombreProducto) => {
        Swal.fire({
            icon: 'info',
            title: 'Contactar con un asesor',
            text: 'Puedes contactar con un asesor a través de WhatsApp al número XXX-XXXXXXX',
            confirmButtonText: 'Cerrar'
        });
    };

    return (
        <div className="search-bar-container">
            <div className="product-cards-container">
                {transitions((style, item) => (
                    <animated.div key={item.id} style={style} className="product-card" onClick={() => handleClickProducto(item)}>
                        <img src="../../public/images/A01.png" alt={item.name} />
                        <div className="product-details">
                            <h3>{item.name}</h3>
                            <p>JOHAN QUINTERO GRISALES</p>
                            <span>${item.price}</span>
                        </div>
                        <button className="btn-consultar">
                            <FaWhatsapp className="whatsapp-icon" style={{ fontSize: '1.5rem' }} />
                            Consultar con un asesor
                        </button>
                    </animated.div>
                ))}
                {resultados.length === 0 && (
                    <div className="sin-resultados">No se encontraron resultados</div>
                )}
            </div>
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
