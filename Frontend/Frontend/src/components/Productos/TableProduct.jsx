import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../EstilosComponentes/listProduct.css'

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:6001/obtenerProducto/listarProductos');
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }

        };
        fetchProducts();
    }, []);

    // Función auxiliar para mostrar el valor o el guion
    const renderCellValue = (value) => {
        return value || '-';
    };

    return (
        <div className='container__table' style={{ overflowY: 'scroll', maxHeight: '600px', maxWidth:'1085px', overflowX: 'scroll' }}>
            <h1 className='title__product'>Lista de Productos</h1>
            <table className='table__main_pro table-bordered text-center'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>ID de Categoría</th>
                        <th>URL de Imagen</th>
                        <th>Código</th>
                        <th>Unidad</th>
                        <th>Cantidad</th>
                        <th>Infinito</th>
                        <th>Precio de Compra</th>
                        <th>Compra por Cantidad</th>
                        <th>Precio de Venta</th>
                        <th>Venta por Cantidad</th>
                        <th>Descuento</th>
                        <th>Impuesto1</th>
                        <th>Impuesto2</th>
                        <th>Impuesto3</th>
                        <th>Proveedor</th>
                        <th>Estante</th>
                        <th>Referencia</th>
                        <th>Personalizado1</th>
                        <th>Personalizado2</th>
                        <th>Usuario</th>
                        <th>Creado</th>
                        <th>Mínimo de Stock</th>
                        <th>Fecha de Vencimiento</th>
                        <th>Color</th>
                        <th>Usos Recomendados</th>
                        <th>Número de Teclas</th>
                        <th>Tamaño</th>
                        <th>Marca</th>
                        <th>Compatibilidad</th>
                        <th>Tecnología</th>
                        <th>Características</th>
                        <th>Nombre de Categoría</th>
                    </tr>
                </thead>
                <tbody className="responsive-table">
                    {products.map((product) => (
                        <tr key={product.product_id}>
                            <td>{product.product_id}</td>
                            <td>{product.name}</td>
                            <td>{renderCellValue(product.description)}</td>
                            <td>{product.price}</td>
                            <td>{product.category_id}</td>
                            <td>{product.image_url}</td>
                            <td>{product.codigo}</td>
                            <td>{product.unidad}</td>
                            <td>{renderCellValue(product.cantidad)}</td>
                            <td>{renderCellValue(product.infinito)}</td>
                            <td>{renderCellValue(product.precio_compra)}</td>
                            <td>{renderCellValue(product.compra_x_cantidad)}</td>
                            <td>{renderCellValue(product.precio_venta)}</td>
                            <td>{renderCellValue(product.venta_x_cantidad)}</td>
                            <td>{renderCellValue(product.descuento)}</td>
                            <td>{renderCellValue(product.impuesto1)}</td>
                            <td>{renderCellValue(product.impuesto2)}</td>
                            <td>{renderCellValue(product.impuesto3)}</td>
                            <td>{renderCellValue(product.proveedor)}</td>
                            <td>{renderCellValue(product.estante)}</td>
                            <td>{renderCellValue(product.referencia)}</td>
                            <td>{renderCellValue(product.personalizado1)}</td>
                            <td>{renderCellValue(product.personalizado2)}</td>
                            <td>{renderCellValue(product.usuario)}</td>
                            <td>{product.creado}</td>
                            <td>{product.minimo_stock}</td>
                            <td>{renderCellValue(product.fecha_vencimiento)}</td>
                            <td>{renderCellValue(product.color)}</td>
                            <td>{renderCellValue(product.usos_recomendados)}</td>
                            <td>{renderCellValue(product.numero_teclas)}</td>
                            <td>{renderCellValue(product.tamano)}</td>
                            <td>{renderCellValue(product.marca)}</td>
                            <td>{renderCellValue(product.compatibilidad)}</td>
                            <td>{renderCellValue(product.tecnologia)}</td>
                            <td>{renderCellValue(product.caracteristicas)}</td>
                            <td>{renderCellValue(product.nombre_categoria)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    
};

export default ProductList;
