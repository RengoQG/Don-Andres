import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../EstilosComponentes/productos.css"; // Importar estilos CSS para el componente
import { FaWhatsapp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from "axios";



const Producto = () => {
    const location = useLocation();
    const producto = location.state.producto[0];
    const imageRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [detallesProducto, setDetallesProducto] = useState([]);

    useEffect(() => {
        // Realizar solicitud HTTP para obtener los detalles del producto
        const fetchDetallesProducto = async () => {
            try {
                const response = await axios.post(`http://192.168.20.238:6001/relacionados/products/${producto.product_id}`);
                setDetallesProducto(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los detalles del producto:', error);
                setLoading(false);
            }
        };

        fetchDetallesProducto();
    }, [producto.product_id]);

    console.log(detallesProducto);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100;
        const y = (e.pageY - top) / height * 100;
        imageRef.current.style.transformOrigin = `${x}% ${y}%`;
    };

    const relatedProducts = [
        {
            id: 1,
            name: "Producto 1",
            description: "Descripción del producto 1",
            price: "$19.99",
            image: "https://via.placeholder.com/150"
        },
        {
            id: 2,
            name: "Producto 2",
            description: "Descripción del producto 2",
            price: "$29.99",
            image: "https://via.placeholder.com/150"
        },
        {
            id: 3,
            name: "Producto 3",
            description: "Descripción del producto 3",
            price: "$39.99",
            image: "https://via.placeholder.com/150"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextProduct = () => {
        setCurrentIndex((prevIndex) => (prevIndex === relatedProducts.length - 1 ? 0 : prevIndex + 1));
    };

    const prevProduct = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? relatedProducts.length - 1 : prevIndex - 1));
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
                                {relatedProducts.map((product, index) => (
                                    <div
                                        className={`related-product ${index === currentIndex ? 'active' : ''}`}
                                        key={product.id}
                                        style={{
                                            transform: `translateX(${100 * (1 - currentIndex)}%)`,
                                            opacity: index === currentIndex ? 1 : 1,
                                            transition: 'transform 0.5s ease, opacity 0.5s ease'
                                        }}
                                    >
                                        <img src={product.image} alt={product.name} />
                                        <h3 className="related-product-title">{product.name}</h3>
                                        <p className="related-product-description">{product.description}</p>
                                        <span className="related-product-price">{product.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="related-products-controls">
                            <button className="related-products-control prev" onClick={prevProduct}>
                                <FaChevronLeft />
                            </button>
                            <button className="related-products-control next" onClick={nextProduct}>
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
                                <span className="detalles-tipo">Categoría: {producto.category_id}</span>
                            </li>
                            <li className="detalles-item">
                                <span className="detalles-tipo">Color:</span>
                                <span className="detalles-valor">{producto.color}</span>
                            </li>
                            <li className="detalles-item">
                                <span className="detalles-tipo">Descripción:</span>
                                <span className="detalles-valor">{producto.description}</span>
                            </li>
                            <li className="detalles-item">
                                <span className="detalles-tipo">Usos recomendados:</span>
                                <span className="detalles-valor">{producto.usos_recomendados}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="detalles__prod">
                        <h4 className="detalles-titulo">Especificaciones</h4>
                        <ul className="detalles-lista">
                            <li className="detalles-item">
                                <span className="detalles-tipo">Tamaño:</span>
                                <span className="detalles-valor">{producto.tamano}</span>
                            </li>
                            <li className="detalles-item">
                                <span className="detalles-tipo">Marca:</span>
                                <span className="detalles-valor">{producto.marca}</span>
                            </li>
                            <li className="detalles-item">
                                <span className="detalles-tipo">Compatibilidad:</span>
                                <span className="detalles-valor">{producto.compatibilidad}</span>
                            </li>
                            <li className="detalles-item">
                                <span className="detalles-tipo">Tecnología:</span>
                                <span className="detalles-valor">{producto.tecnologia}</span>
                            </li>
                            <li className="detalles-item">
                                <span className="detalles-tipo">Características:</span>
                                <span className="detalles-valor">{producto.caracteristicas}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr className="separador" />

                <div className="info__envio">
                    <h4>Sobre este artículo</h4>
                        <ul className="sobre-articulo-lista">
                        {detallesProducto.map((detalle) => (
                            <li key={detalle.detalle_id} className="sobre-articulo-item">
                                <span className="sobre-articulo-icon">&#10003;</span>
                                <span className="sobre-articulo-texto">{detalle.detalle_texto}</span>
                            </li>
                            ))}
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
