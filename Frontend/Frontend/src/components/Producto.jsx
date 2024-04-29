import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../EstilosComponentes/productos.css"; // Importar estilos CSS para el componente
import { FaWhatsapp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from "axios";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';




const Producto = () => {
    const navigateTo = useNavigate();
    const location = useLocation();
    const productoInicial = location.state.producto[0];
    const [producto, setProducto] = useState(productoInicial); // Estado para el producto actual
    const imageRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [detallesProducto, setDetallesProducto] = useState([]);

    useEffect(() => {
        // Realizar solicitud HTTP para obtener los detalles del producto
        const fetchDetallesProducto = async () => {
            try {
                const response = await axios.post(`http://192.168.20.238:6001/relacionados/products/${productoInicial.product_id}`);
                setDetallesProducto(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los detalles del producto:', error);
                setLoading(false);
            }
        };

        fetchDetallesProducto();
    }, [productoInicial.product_id]);

    useEffect(() => {
        // Realizar solicitud HTTP para obtener los productos similares
        const fetchDetallesProducto = async () => {
            try {
                const response = await axios.post(`http://192.168.20.238:6001/similares/similares/${productoInicial.product_id}`);
                setRelatedProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los detalles del producto:', error);
                setLoading(false);
            }
        };

        fetchDetallesProducto();
    }, [productoInicial.product_id]);

    const handleClickProductoRelacionado = async (productoRelacionado) => {
        try {
            // Realizar la solicitud al endpoint que obtiene un producto por su ID
            const response = await axios.get(`http://192.168.20.238:6001/producto/producto/${productoRelacionado.product_id}`);

            // Verificar si la solicitud fue exitosa
            if (response.status === 200) {
                // Obtener el producto relacionado del cuerpo de la respuesta
                const productoRelacionadoInfo = response.data;

                // Navegar a la página del producto con la información del producto relacionado
                navigateTo(`/producto`, { state: { producto: productoRelacionadoInfo } });
            } else {
                // Manejar cualquier error de solicitud
                console.error('Error al obtener el producto relacionado:', response.statusText);
            }
        } catch (error) {
            // Manejar errores de red u otros errores
            console.error('Error al obtener el producto relacionado:', error.message);
        }
    };


    const handleMouseMove = (e) => {
        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100;
        const y = (e.pageY - top) / height * 100;
        imageRef.current.style.transformOrigin = `${x}% ${y}%`;
    };

    // const relatedProducts = [
    //     {
    //         id: 1,
    //         name: "Producto 1",
    //         description: "Descripción del producto 1",
    //         price: "$19.99",
    //         image: "https://via.placeholder.com/150"
    //     },
    //     {
    //         id: 2,
    //         name: "Producto 2",
    //         description: "Descripción del producto 2",
    //         price: "$29.99",
    //         image: "https://via.placeholder.com/150"
    //     },
    //     {
    //         id: 3,
    //         name: "Producto 3",
    //         description: "Descripción del producto 3",
    //         price: "$39.99",
    //         image: "https://via.placeholder.com/150"
    //     },
    //     {
    //         id: 3,
    //         name: "Producto 3",
    //         description: "Descripción del producto 3",
    //         price: "$39.99",
    //         image: "https://via.placeholder.com/150"
    //     }
    // ];

    // Función para generar el mensaje de WhatsApp con los detalles del producto
    const generarMensaje = () => {
        let mensaje = `¡Hola! Estoy interesado en el producto "${producto.name}". Aquí están los detalles:\n`;
    
        // Agregar detalles del producto al mensaje
        mensaje += `Descripción: ${producto.description ?? 'No disponible'}\n`;
        mensaje += `Precio: $${producto.price ?? 'No disponible'}\n`;
        mensaje += `Categoría: ${producto.category_id ?? 'No disponible'}\n`;
        mensaje += `Color: ${producto.color ?? 'No disponible'}\n`;
        mensaje += `Usos recomendados: ${producto.usos_recomendados ?? 'No disponible'}\n`;
    
        // Agregar detalles adicionales si están disponibles
        if (detallesProducto.length > 0) {
            detallesProducto.forEach((detalle) => {
                mensaje += `${detalle.detalle_texto}\n`;
            });
        } else {
            mensaje += "No hay detalles adicionales disponibles.\n";
        }
    
        // URL de WhatsApp con el mensaje generado
        const url = `https://wa.me/573172124655?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank'); // Abre el enlace en una nueva pestaña
    };
    
    

    return (
        <div className="producto-container">
            <div className="prueba">
                {producto && (
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
                )}
                <div className="ml-3">
                    <div className="related-products-container">
                        <h3 className="related-products-title">Productos Relacionados</h3>
                        <Carousel showThumbs={false} infiniteLoop={true} showStatus={false} showIndicators={false}>
                            {/* Aquí van tus productos relacionados */}
                            {relatedProducts.map((relate) => (
                                <div className="related-product" key={relate.product_id} onClick={() => handleClickProductoRelacionado(relate)}>
                                    <img src="../../public/images/A01.png" alt="Product" />
                                    <h3 className="related-product-title">{relate.name}</h3>
                                    <p className="related-product-description">{relate.description}</p>
                                    <span className="related-product-price">{relate.price}</span>
                                </div>
                            ))}
                            {/* Repite estos divs para cada producto */}
                        </Carousel>
                    </div>
                </div>
            </div>

            <div className="producto-info">
                {producto ? (
                    <>
                        <h1 className="producto-nombre">{productoInicial.name}</h1>
                        <hr className="separador" />
                        <p className="producto-descripcion">{productoInicial.description}</p>
                        <div className="producto-detalles">
                            <div className="detalles__infor">
                                <h4 className="detalles-titulo">Detalles</h4>
                                <ul className="detalles-lista">
                                    <li className="detalles-item">
                                        <span className="detalles-tipo">Precio:</span>
                                        <span className="detalles-valor">${productoInicial.price}</span>
                                    </li>
                                    <li className="detalles-item">
                                        <span className="detalles-tipo">Categoría: {productoInicial.category_id}</span>
                                    </li>
                                    <li className="detalles-item">
                                        <span className="detalles-tipo">Color:</span>
                                        <span className="detalles-valor">{productoInicial.color}</span>
                                    </li>
                                    <li className="detalles-item">
                                        <span className="detalles-tipo">Descripción:</span>
                                        <span className="detalles-valor">{productoInicial.description}</span>
                                    </li>
                                    <li className="detalles-item">
                                        <span className="detalles-tipo">Usos recomendados:</span>
                                        <span className="detalles-valor">{productoInicial.usos_recomendados}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="detalles__prod">
                                <h4 className="detalles-titulo">Especificaciones</h4>
                                <ul className="detalles-lista">
                                    <li className="detalles-item">
                                        <span className="detalles-tipo">Tamaño:</span>
                                        <span className="detalles-valor">{productoInicial.tamano}</span>
                                    </li>
                                    <li className="detalles-item">
                                        <span className="detalles-tipo">Marca:</span>
                                        <span className="detalles-valor">{productoInicial.marca}</span>
                                    </li>
                                    <li className="detalles-item">
                                        <span className="detalles-tipo">Compatibilidad:</span>
                                        <span className="detalles-valor">{productoInicial.compatibilidad}</span>
                                    </li>
                                    <li className="detalles-item">
                                        <span className="detalles-tipo">Tecnología:</span>
                                        <span className="detalles-valor">{productoInicial.tecnologia}</span>
                                    </li>
                                    <li className="detalles-item">
                                        <span className="detalles-tipo">Características:</span>
                                        <span className="detalles-valor">{productoInicial.caracteristicas}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <hr className="separador" />
                        <div className="info__envio">
                            <h4>Sobre este artículo</h4>
                            {detallesProducto.length > 0 ? (
                                <ul className="sobre-articulo-lista">
                                    {detallesProducto.map((detalle) => (
                                        <li key={detalle.detalle_id} className="sobre-articulo-item">
                                            <span className="sobre-articulo-icon">&#10003;</span>
                                            <span className="sobre-articulo-texto">{detalle.detalle_texto}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No se encontraron detalles para este producto.</p>
                            )}
                        </div>
                        <div className="contactar-asesor ml-0 mt-3 text-center">
                            <button className="contactar-asesor-btn" onClick={generarMensaje}>
                                <FaWhatsapp className="icono-whatsapp" />
                                Finalizar pedido
                            </button>
                        </div>
                        <p className="politica-envio">Envío gratis en pedidos superiores a $50 | Política de devolución de 30 días</p>
                    </>
                ) : (
                    <p>Cargando producto...</p>
                )}
            </div>

        </div>
    );
};

export default Producto;
