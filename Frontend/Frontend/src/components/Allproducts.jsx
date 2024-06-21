import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { FaWhatsapp } from 'react-icons/fa';

import '../EstilosComponentes/allProducts.css'; // Importar estilos CSS

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(''); // Estado para la categoría seleccionada
    const [currentPage, setCurrentPage] = useState(0); // Página actual
    const [perPage] = useState(5); // Productos por página
    const navigate = useNavigate();
    const location = useLocation();

    // Función para generar el mensaje de WhatsApp
    const generarMensajeWhatsapp = (product) => {
        let mensaje = `¡Hola! Estoy interesado en el producto "${product.name}". Aquí están los detalles:\n\n`;
        mensaje += `Descripción: ${product.descripcion ?? 'No disponible'}\n`;
        mensaje += `Precio: $${product.price ?? 'No disponible'}\n`;
        mensaje += `Categoría: ${product.nombre_categoria ?? 'No disponible'}\n`;
        mensaje += `Código: ${product.product_id ?? 'No disponible'}\n`;

        const url = `https://wa.me/573006236655?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        const searchParams = new URLSearchParams(location.search);
        const categoria = searchParams.get('categoria');
        if (categoria) {
            setSelectedCategory(categoria);
        }
    }, [location.search]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://horizonsolutions.com.co:3000/obtenerProducto/listarProductos');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://horizonsolutions.com.co:3000/categoria/categorias');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(0); // Reiniciar a la primera página al cambiar la categoría
        navigate(`/allproducto?categoria=${e.target.value}`);
    };

    const handleViewProduct = (product) => {
        navigate(`/producto`, { state: { producto: product } });
    };

    // Filtrar productos por categoría
    const filteredProducts = selectedCategory
        ? products.filter((product) => product.category_id === parseInt(selectedCategory))
        : products;

    // Paginación
    const offset = currentPage * perPage;
    const pageCount = Math.ceil(filteredProducts.length / perPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Obtener los productos de la página actual
    const currentProducts = filteredProducts.slice(offset, offset + perPage);

    return (
        <div className="product-list">
            <h2>Lista de Productos</h2>
            <div className="product-list-container">
                {/* Panel de filtro de categorías */}
                <div className="category-panel w-100">
                    <h3>Filtrar por categoría</h3>
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">Todas las categorías</option>
                        {categories.map((category) => (
                            <option key={category.category_id} value={category.category_id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Listado de productos */}
                <div className="products">
                    {currentProducts.map((product) => (
                        <div className='contenidoProducto' key={product.product_id}>
                            <div className='imagenProducto'>
                                <img src={`../../public/images/Productos/${product.image_url}`} alt={product.name} />
                            </div>
                            <div className='product-details'>
                                <h3>{product.name}</h3>
                                <p>Precio: ${product.price}</p>
                                <p>Categoría: {product.nombre_categoria}</p>
                                <p>Detalle: {product.descripcion}</p>
                                {/* Mostrar si el producto está agotado */}
                                {product.stock === 0 ? (
                                    <p style={{ color: 'red' }}>Agotado</p>
                                ) : (
                                    <p></p>
                                )}
                                <div className="d-flex flex-column flex-sm-row justify-content-between contenido-botones">
                                    <button className=" mb-2 mb-sm-0 mr-sm-1 w-100 w-sm-50" onClick={() => handleViewProduct(product)}>Ver producto</button>
                                    <button className=" w-100 w-sm-50" onClick={() => generarMensajeWhatsapp(product)}>
                                        <FaWhatsapp className="icono-whatsapp" /> WhatsApp
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Paginación */}
            <ReactPaginate
                previousLabel={'Página anterior'}
                nextLabel={'Página siguiente'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination justify-content-center'} // Clase de Bootstrap para centrar la paginación
                activeClassName={'active'}
                previousClassName={'page-item'}
                nextClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
            />
        </div>
    );
};

export default ProductList;
