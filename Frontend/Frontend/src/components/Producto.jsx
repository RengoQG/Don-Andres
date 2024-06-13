import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../EstilosComponentes/productos.css"; // Importar estilos CSS para el componente
import { FaWhatsapp } from 'react-icons/fa';
import axios from "axios";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Producto = () => {
    const navigateTo = useNavigate();
    const location = useLocation();
    const productoInicial = Array.isArray(location.state.producto) ? location.state.producto[0] : location.state.producto;
    const [producto, setProducto] = useState(productoInicial); // Estado para el producto actual
    const imageRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [detallesProducto, setDetallesProducto] = useState([]);

    useEffect(() => {
        const fetchDetallesProducto = async () => {
            try {
                const response = await axios.get(`https://horizonsolutions.com.co:3000/relacionados/products/${productoInicial.product_id}`);
                setDetallesProducto(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los detalles del producto:', error);
                setLoading(false);
            }
        };

        fetchDetallesProducto();
    }, [productoInicial.product_id]);
    console.log(productoInicial.detalles);
    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const response = await axios.post(`https://horizonsolutions.com.co:3000/similares/similares/${productoInicial.product_id}`);
                const uniqueProducts = removeDuplicates(response.data);
                setRelatedProducts(uniqueProducts);
                console.log(uniqueProducts)
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los productos relacionados:', error);
                setLoading(false);
            }
        };

        fetchRelatedProducts();
    }, [productoInicial.product_id]);

    const removeDuplicates = (products) => {
        const uniqueProducts = [];
        const productIds = new Set();

        for (const product of products) {
            if (!productIds.has(product.product_id)) {
                uniqueProducts.push(product);
                productIds.add(product.product_id);
            }
        }

        return uniqueProducts;
    };

    const handleClickProductoRelacionado = async (productoRelacionado) => {
        try {
            const response = await axios.get(`https://horizonsolutions.com.co:3000/obtenerProductoId/obtenerProductoId/${productoRelacionado.product_id}`);

            if (response.status === 200) {
                const productoRelacionadoInfo = response.data;

                setProducto(productoRelacionadoInfo);
                navigateTo(`/producto`, { state: { producto: productoRelacionadoInfo } });
                console.log('es este', productoRelacionadoInfo)
            } else {
                console.error('Error al obtener el producto relacionado:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener el producto relacionado:', error.message);
        }
    };

    useEffect(() => {
        if (producto) {
            window.scrollTo(0, 0);
        }
    }, [producto]);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100;
        const y = (e.pageY - top) / height * 100;
        imageRef.current.style.transformOrigin = `${x}% ${y}%`;
    };

    const generarMensaje = () => {
        let mensaje = `¡Hola! Estoy interesado en el producto "${producto.name}". Aquí están los detalles:\n\n`;

        mensaje += `Descripción: ${producto.descripcion ?? 'No disponible'}\n`;
        mensaje += `Precio: $${producto.price ?? 'No disponible'}\n`;
        mensaje += `Categoría: ${producto.nombre_categoria ?? 'No disponible'}\n`;
        mensaje += `Código: ${producto.codigo ?? 'No disponible'}\n`;
        mensaje += `Stock: ${producto.stock ?? 'No disponible'}\n`;
        mensaje += `Atributos:\n`;
      
        if (producto.atributos.length > 0) {
          producto.atributos.forEach((atributo, index) => {
            mensaje += `  - ${atributo.nombre}: ${atributo.valor}\n`;
          });
        } else {
          mensaje += "  No hay atributos disponibles.\n";
        }
      
        if (producto.detalles && producto.detalles.length > 0) {
            mensaje += `\nDetalles adicionales:\n`;
            producto.detalles.forEach((detalle) => {
              mensaje += `  - ${detalle}\n`;
            });
          } else {
            mensaje += "\nNo hay detalles adicionales disponibles.\n";
          }

        const url = `https://wa.me/573006236655?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
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
                        {relatedProducts.length > 0 ? (
                            <Carousel showThumbs={false} infiniteLoop={true} showStatus={false} showIndicators={false}>
                                {relatedProducts.map((relate) => (
                                    <div className="related-product" key={relate.product_id} onClick={() => handleClickProductoRelacionado(relate)}>
                                        <img src={relate.imageURL || "../../public/images/A01.png"} alt={relate.name} />
                                        <h3 className="related-product-title">{relate.name}</h3>
                                        <p className="related-product-description">{relate.descripcion}</p>
                                        <span className="related-product-price">{relate.price}</span>
                                    </div>
                                ))}
                            </Carousel>
                        ) : (
                            <p>No hay productos relacionados.</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="producto-info">
    {productoInicial ? (
        <>
            <h1 className="producto-nombre">{productoInicial.name}</h1>
            <hr className="separador" />
            <p className="producto-descripcion">{productoInicial.descripcion}</p>
            <div className="producto-detalles">
                <div className="detalles__infor">
                    <h4 className="detalles-titulo">Detalles</h4>
                    <ul className="detalles-lista">
                        <li className="detalles-item">
                            <span className="detalles-tipo">Precio:</span>
                            <span className="detalles-valor">${productoInicial.price}</span>
                        </li>
                        <li className="detalles-item">
                            <span className="detalles-tipo">Categoría:</span>
                            <span className="detalles-valor">{productoInicial.nombre_categoria}</span>
                        </li>
                        <li className="detalles-item">
                            <span className="detalles-tipo">Codigo:</span>
                            <span className="detalles-valor">{productoInicial.codigo}</span>
                        </li>
                    </ul>
                </div>
                <div className="detalles__prod">
                    <h4 className="detalles-titulo">Especificaciones</h4>
                    <ul className="detalles-lista">
                        {productoInicial.atributos && productoInicial.atributos.map((atributo, index) => (
                            <li key={index} className="detalles-item">
                                <span className="detalles-tipo">{atributo.nombre}:</span>
                                <span className="detalles-valor">{atributo.valor}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <hr className="separador" />
            <div className="info__envio">
                <h4>Sobre este artículo</h4>
                {productoInicial.detalles && productoInicial.detalles.length > 0 ? (
                    <ul className="sobre-articulo-lista">
                        {productoInicial.detalles.map((detalle, index) => (
                            <li key={index} className="sobre-articulo-item">
                                <span className="sobre-articulo-icon">&#10003;</span>
                                <span className="sobre-articulo-texto">{detalle}</span>
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
