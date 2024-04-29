import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewProductsSection = () => {
    const [newProducts, setNewProducts] = useState([]);

    useEffect(() => {
        const fetchNewProducts = async () => {
            try {
                const response = await axios.get('http://192.168.20.238:6001/nuevosProductos/nuevosProductos');
                setNewProducts(response.data);
            } catch (error) {
                console.error('Error al obtener los productos nuevos:', error);
            }
        };

        fetchNewProducts();
    }, []);

    return (
        <section className="section section-sm bg-default" id="news">
            <div className="m-3">
                <h2>Productos nuevos</h2>
                <div className="row row-45">
                    {newProducts.map(product => (
                        <div key={product.product_id} className="col-sm-6 col-lg-4 wow fadeInLeft">
                            <article className="post post-modern">
                                <a className="post-modern-figure" href="#">
                                    <img src="../../public/images/A01.png" alt={product.name} width="370" height="307" />
                                    <div className="post-modern-time">
                                        <time dateTime={product.fecha_creacion}><span className="post-modern-time-month">{product.nombre_categoria}</span></time>
                                    </div>
                                </a>
                                <h4 className="post-modern-title"><a href="#">{product.name}</a></h4>
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
