import { useRef } from "react";
import { useLocation } from "react-router-dom";
import "../EstilosComponentes/productos.css"; // Importar estilos CSS para el componente
import { FaWhatsapp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const Producto = () => {
    const location = useLocation();
    const producto = location.state.producto[0];
    const imageRef = useRef(null);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100;
        const y = (e.pageY - top) / height * 100;
        imageRef.current.style.transformOrigin = `${x}% ${y}%`;
    };

    return (
        <div className="producto-container">
            <div className="prueba">
                <div
                    className="producto-imagen"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => imageRef.current.classList.add("zoomed")}
                    onMouseLeave={() => imageRef.current.classList.remove("zoomed")}
                >
                    <img
                        ref={imageRef}
                        src="../../public/images/A01hd.png"
                        alt={producto.name}
                    />

                </div>
                <div className="ml-3">
                    <div className="related-products-container">
                        <h3 className="related-products-title">Productos Relacionados</h3>
                        <div className="related-products-scroll-container">
                            <div className="related-products-list">
                                {/* Producto 1 */}
                                <div className="related-product">
                                    <img src="https://via.placeholder.com/150" alt="Producto 1" />
                                    <h3 className="related-product-title">Producto 1</h3>
                                    <p className="related-product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus accumsan urna at libero ullamcorper, nec tempor lorem ultricies.</p>
                                    <span className="related-product-price">$19.99</span>
                                </div>
                                {/* Agrega más productos aquí */}
                            </div>
                        </div>
                        <div className="related-products-controls">
                            <button className="related-products-control prev">
                                <FaChevronLeft />
                            </button>
                            <button className="related-products-control next">
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="producto-info">
                <h1 className="producto-nombre">{producto.name}</h1>
                <hr className="separador" />
                <hr />
                <p className="producto-descripcion">{producto.description}</p>
                <div className="producto-detalles">
                    <div className="detalles__infor">
                        <h4 className="detalles-titulo">Detalles</h4>
                        <ul className="detalles-lista">
                            <li className="detalles-item">
                                <span className="detalles-tipo">Precio:</span>
                                <span className="detalles-valor">${producto.price}</span>
                            </li>
                            <li className="detalles-item">
                                <span className="detalles-tipo">Categoría:</span>
                                <span className="detalles-valor">Teclado</span>
                            </li>
                            <li className="detalles-item">
                                <span className="detalles-tipo">Color:</span>
                                <span className="detalles-valor">Negro</span>
                            </li>
                            <li className="detalles-item">
                                <span className="detalles-tipo">Descripción:</span>
                                <span className="detalles-valor">Accesible</span>
                            </li>
                            <li className="detalles-item">
                                <span className="detalles-tipo">Usos recomendados:</span>
                                <span className="detalles-valor">Oficina</span>
                            </li>
                            <li className="detalles-item">
                                <span className="detalles-tipo">Número de teclas:</span>
                                <span className="detalles-valor">105</span>
                            </li>
                        </ul>
                    </div>
                    <div className="detalles__prod">
                        <h4 className="detalles-titulo">Especificaciones</h4>
                        <ul className="detalles-lista">
                            <li className="detalles-item">
                                <span className="detalles-tipo">Tamaño:</span>
                                <span className="detalles-valor">25cm</span>
                            </li>
                            <li className="detalles-item">
                                <span className="detalles-tipo">Tipo:</span>
                                <span className="detalles-valor">Membrana</span>
                            </li>
                            <li className="detalles-item">
                                <span className="detalles-tipo">Marca:</span>
                                <span className="detalles-valor">Lenovo</span>
                            </li>
                            <li className="detalles-item">
                                <span className="detalles-tipo">Compatibilidad:</span>
                                <span className="detalles-valor">PC</span>
                            </li>
                            <li className="detalles-item">
                                <span className="detalles-tipo">Tecnología:</span>
                                <span className="detalles-valor">USB</span>
                            </li>
                            <li className="detalles-item">
                                <span className="detalles-tipo">Características:</span>
                                <span className="detalles-valor">Teclado multimedia</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr className="separador" />

                <div className="info__envio">
                    <h4>Sobre este artículo</h4>

                    <ul className="sobre-articulo-lista">
                        <li className="sobre-articulo-item">
                            <span className="sobre-articulo-icon">&#10003;</span>
                            <span className="sobre-articulo-texto">Las teclas de acceso rápido permiten un fácil acceso a los medios, mi computadora, silencio, reproductor multimedia</span>
                        </li>
                        <li className="sobre-articulo-item">
                            <span className="sobre-articulo-icon">&#10003;</span>
                            <span className="sobre-articulo-texto">Conexión por cable USB</span>
                        </li>
                        <li className="sobre-articulo-item">
                            <span className="sobre-articulo-icon">&#10003;</span>
                            <span className="sobre-articulo-texto">Compatible con Windows 2000, XP, Vista, 7, 8 y 10</span>
                        </li>
                        <li className="sobre-articulo-item">
                            <span className="sobre-articulo-icon">&#10003;</span>
                            <span className="sobre-articulo-texto">Dimensiones del producto: 17.4 x 5 x 1.1 pulgadas (largo x ancho x alto)</span>
                        </li>
                    </ul>
                </div>
                <div className="contactar-asesor ml-0 mt-3 text-center">
                    <a href="https://wa.me/5555555555" className="contactar-asesor-btn">
                        <FaWhatsapp className="icono-whatsapp" /> {/* Agregar el icono de WhatsApp */}
                        Finalizar pedido
                    </a>
                </div>
                <p className="politica-envio">Envío gratis en pedidos superiores a $50 | Política de devolución de 30 días</p>
            </div>
        </div>
    );
};

export default Producto;
