import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewProductsSection = () => {
    const [newProducts, setNewProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNewProducts = async () => {
            try {
                const response = await axios.get('https://horizonsolutions.com.co:3000/nuevosProductos/nuevosProductos');
                setNewProducts(response.data);
            } catch (error) {
                console.error('Error al obtener los productos nuevos:', error);
            }
        };

        fetchNewProducts();
    }, []);

    const handleProductClick = async (product_id) => {
        try {
            const response = await axios.get(`https://horizonsolutions.com.co:3000/obtenerProductoId/obtenerProductoId/${product_id}`);
            if (response.status === 200) {
                const productInfo = response.data;
                navigate(`/producto`, { state: { producto: productInfo } });
            } else {
                console.error('Error al obtener el producto:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener el producto:', error.message);
        }
    };

    return (
        <section className="section section-sm bg-default" id="news">
            <div className="m-3">
                <h2><a href="#">Nuevos productos</a></h2>
                <div className="row row-45">
                    {newProducts.map(product => (
                        <div key={product.product_id} className="col-sm-6 col-lg-4 wow fadeInLeft">
                            <article className="post post-modern">
                                <a 
                                    className="post-modern-figure" 
                                    href="#"
                                    onClick={() => handleProductClick(product.product_id)}
                                >
                                    <img src={`../../public/images/Productos/${product.image_url}`} alt={product.name} width="370" height="307" />
                                    <div className="post-modern-time">
                                        <time dateTime={product.fecha_creacion}><span className="post-modern-time-month">{product.nombre_categoria}</span></time>
                                    </div>
                                </a>
                                <h4 className="post-modern-title">
                                    <a href="#" onClick={() => handleProductClick(product.product_id)}>{product.name}</a>
                                </h4>
                                <p className="post-modern-text">{product.description}</p>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewProductsSection;
