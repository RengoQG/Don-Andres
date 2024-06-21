import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductoCta = () => {
    const navigateTo = useNavigate();
    const [newProducts, setNewProducts] = useState([]);

    useEffect(() => {
        const fetchNewProducts = async () => {
            try {
                const response = await axios.get('https://horizonsolutions.com.co:3000/categoria/categorias');
                setNewProducts(response.data);
            } catch (error) {
                console.error('Error al obtener los productos nuevos:', error);
            }
        };

        fetchNewProducts();
    }, []);

    const handleProductClick = (categoriaId) => {
        navigateTo(`/allproducto?categoria=${categoriaId}`);
    };

    return (
        <section className="section section-sm bg-default" id="news">
            <div className="container">
                <div className="text-center mb-5">
                    <a href='allproducto' className='tituloCatalogo'>Nuestro catálogo</a>
                </div>
                <div className="row">
                    {newProducts.map(categoria => (
                        <div
                            key={categoria.category_id}
                            className="col-md-6 col-lg-4 mb-4 productosContenedorList"
                            onClick={() => handleProductClick(categoria.category_id)}
                        >
                            <div className="card h-100 border-0 shadow">
                                <img
                                    src={`../../public/images/CategoriaImagenes/${categoria.url_imagen}`}
                                    className="card-img-top"
                                    alt={categoria.name}
                                />
                                <div className="card-body d-flex flex-column justify-content-between"
                                    onClick={() => handleProductClick(categoria.category_id)}
                                >
                                    <h4 className="card-title"></h4>
                                    <a href="#" className="card-title tituloProductosList text-center"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleProductClick(categoria.category_id);
                                        }}
                                    >
                                        {categoria.name}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductoCta;
