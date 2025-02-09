import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, TablePagination } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import AgregarProducto from './agregarProducto.jsx';
import Editar from './editarProducto.jsx';
import Swal from 'sweetalert2';
import '../../EstilosComponentes/listProduct.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [showTable, setShowTable] = useState(true); // Estado para controlar la visualización de la tabla
    const [showAgregarProducto, setShowAgregarProducto] = useState(false); // Estado para controlar la visualización del componente AgregarProducto
    const [showEditarProducto, setShowEditarProducto] = useState(false); // Estado para controlar la visualización del componente EditarProducto
    const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
    const [page, setPage] = useState(0); // Estado para manejar la página actual del paginador
    const [rowsPerPage, setRowsPerPage] = useState(3); // Cantidad de filas por página
    const [productoId, setProductoId] = useState(null);
    const [botonTexto, setBotonTexto] = useState("Agregar producto");
    const [expandedRows, setExpandedRows] = useState([]);

    // Función para manejar la expansión de filas
    const toggleRowExpansion = (productId) => {
        if (expandedRows.includes(productId)) {
            setExpandedRows(expandedRows.filter((id) => id !== productId));
        } else {
            setExpandedRows([...expandedRows, productId]);
        }
    };

     // Función para renderizar el contenido del detalle con expansión
    const renderDetalle = (product) => {
        const detalles = product.detalles || [];

        if (expandedRows.includes(product.product_id)) {
            return (
                <div>
                    {detalles.map((detalle, index) => (
                        <div key={index}>
                            {detalle}
                        </div>
                    ))}
                    <button className="btn btn-link" onClick={() => toggleRowExpansion(product.product_id)}>
                        Ver menos
                    </button>
                </div>
            );
        } else {
            // Mostrar solo la primera línea y el botón 'Ver más'
            return (
                <div>
                    <div className="text-truncate" style={{ maxWidth: '100px' }}>
                        {detalles.length > 0 ? detalles[0] : 'No hay detalles disponibles'}
                    </div>
                    {detalles.length > 1 && (
                        <button className="btn btn-link" onClick={() => toggleRowExpansion(product.product_id)}>
                            Ver más
                        </button>
                    )}
                </div>
            );
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://horizonsolutions.com.co:3000/obtenerProducto/listarProductos');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://horizonsolutions.com.co:3000/obtenerProducto/listarProductos');
            setProducts(response.data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    const handleEliminarProductoClick = async (productId) => {
        try {
            console.log(productId);
            const response = await axios.delete(`https://horizonsolutions.com.co:3000/eliminarProducto/eliminarProducto/${productId}`);
            if (response.data.error) {
                return toast.error(response.data.error);
            } else {
                toast.success('Producto eliminado exitosamente');
                // Actualizar la lista de productos después de eliminar el producto
                await fetchProducts();
                // Establecer la página actual en 0 para mostrar desde el primer registro
                setPage(0);
                fetchProducts();
            }
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    };


    const handleEditarProductoClick = (productId) => {
        setShowEditarProducto(!showEditarProducto);
        setShowTable(!showTable);
        setProductoId(productId);
        setBotonTexto('Listar productos');
    };

    const handleAgregarDetalleProductoClick = async (productId) => {
        const { value: option } = await Swal.fire({
            title: 'Agregar detalle de producto',
            input: 'select',
            inputLabel: 'Selecciona una opción',
            inputOptions: {
                detalle: 'Detalle',
                info: 'Información del producto',
            },
            showCancelButton: true,
            confirmButtonText: 'Seleccionar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value) {
                    return 'Debes seleccionar una opción';
                }
            }
        });

        if (option === 'detalle') {
            const { value: detalle_texto } = await Swal.fire({
                title: 'Agregar detalle de producto',
                input: 'text',
                inputLabel: 'Escribe el detalle:',
                inputPlaceholder: 'Ingresa el detalle aquí',
                showCancelButton: true,
                confirmButtonText: 'Agregar',
                cancelButtonText: 'Cancelar',
                inputValidator: (value) => {
                    if (!value) {
                        return 'Debes ingresar un detalle';
                    }
                }
            });

            if (detalle_texto) {
                try {
                    // Realizar la solicitud al servidor para agregar el detalle
                    const response = await axios.post('https://horizonsolutions.com.co:3000/agregarDestalleProducto/agregarDetalleProducto', {
                        product_id: productId,
                        detalle_texto
                    });

                    // Mostrar un mensaje de éxito si se agregó correctamente
                    Swal.fire({
                        icon: 'success',
                        title: 'Detalle agregado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    // Actualizar la lista de productos después de agregar el detalle
                    fetchProducts();

                } catch (error) {
                    // Mostrar un mensaje de error si ocurrió un problema al agregar el detalle
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al agregar el detalle',
                        text: error.message
                    });
                }
            }
        } else if (option === 'info') {
            const { value: { atributo_nombre, atributo_valor } } = await Swal.fire({
                title: 'Agregar información del producto',
                html:
                    '<input id="swal-input1" class="swal2-input" placeholder="Nombre del atributo">' +
                    '<input id="swal-input2" class="swal2-input" placeholder="Valor del atributo">',
                focusConfirm: false,
                preConfirm: () => {
                    return {
                        atributo_nombre: document.getElementById('swal-input1').value,
                        atributo_valor: document.getElementById('swal-input2').value
                    };
                }
            });

            if (atributo_nombre && atributo_valor) {
                try {
                    // Realizar la solicitud al servidor para agregar la información del producto
                    const response = await axios.post('https://horizonsolutions.com.co:3000/agregarInfoProducto/agregarInfoProducto', {
                        product_id: productId,
                        atributo_nombre,
                        atributo_valor
                    });

                    // Mostrar un mensaje de éxito si se agregó correctamente
                    Swal.fire({
                        icon: 'success',
                        title: 'Información del producto agregada correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    // Actualizar la lista de productos después de agregar la información del producto
                    fetchProducts();

                } catch (error) {
                    // Mostrar un mensaje de error si ocurrió un problema al agregar la información del producto
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al agregar la información del producto',
                        text: error.message
                    });
                }
            }
        }
    };

    // Función auxiliar para mostrar el valor o el guion
    const renderCellValue = (value) => {
        return value || '-';
    };

    // const handleAgregarProductoClick = () => {
    //     setShowAgregarProducto(!showAgregarProducto);
    //     setShowTable(!showTable);
    //     setBotonTexto(showAgregarProducto ? 'Agregar productjjo' : 'Listar producto');
    // };
    // Filtrar productos basados en el término de búsqueda
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Manejadores de cambio de página y cantidad de filas por página
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Iterar sobre los productos y mostrar los detalles de cada uno en la consola
    products.forEach(product => {
        console.log('Detalles del producto:', product.detalles);
    });

    const handleBotonClick = () => {
        if (botonTexto === 'Listar productos') {
            setShowAgregarProducto(false);
            setShowEditarProducto(false);
            setShowTable(true);
            setBotonTexto('Agregar producto');
        } else if (botonTexto === 'Agregar producto') {
            setShowAgregarProducto(true); // Ocultar el formulario de agregado si está abierto
            setShowTable(false); // Mostrar la tabla de productos
            setBotonTexto('Listar productos');
        }
    };


    return (
        <div>
            <ToastContainer />
            <button className={`btn btn-info ${botonTexto === 'Listar categorías' ? 'listarCategorias' : ''}`} onClick={handleBotonClick}>{botonTexto}</button>
            {showTable && (
                <div>
                    <TextField
                        id="search"
                        className='inputBuscador'
                        label="Buscar producto"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <TableContainer component={Paper}>
                        <h4 className='title__product'>Lista de Productos</h4>
                        <Table className='table table-striped table-bordered small'>
                            <thead>
                                <tr>
                                    {/* <th>ID</th> */}
                                    <th className="align-middle">Nombre</th>
                                    {/* <th style={{ width: '5px' }} className="align-middle">Descripción</th> */}
                                    <th className="align-middle">Precio</th>
                                    <th className="align-middle">Stock</th>
                                    {/* <th>ID de Categoría</th> */}
                                    <th className="align-middle">Imagen</th>
                                    <th className="align-middle">Código</th>
                                    <th className="align-middle">Categoría</th>
                                    <th className="align-middle">Atributos</th>
                                    {/* <th style={{ maxWidth: '150px' }} className="align-middle">Detalles</th> */}
                                    <th className="align-middle">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                                    <tr key={product.product_id}>
                                        {/* <td>{product.product_id}</td> */}
                                        <td>{product.name}</td>
                                        {/* <td className="text-truncate" style={{ maxWidth: '100px' }}>{product.descripcion}</td> */}
                                        <td>{product.price}</td>
                                        <td>{product.stock}</td>
                                        {/* <td>{product.category_id}</td> */}
                                        <td>
                                            <img
                                                src={`../../../public/images/Productos/${product.image_url}`}
                                                alt="Imagen del producto"
                                                style={{ maxWidth: '100px', maxHeight: '100px' }}
                                            />
                                        </td>
                                        <td>{product.codigo}</td>
                                        <td>{product.nombre_categoria}</td>
                                        <td>
                                            {product.atributos && product.atributos.length > 0 ? (
                                                product.atributos.map((atributo, index) => (
                                                    <div key={index}>
                                                        <strong>{atributo.nombre}: </strong>
                                                        {atributo.valor}
                                                    </div>
                                                ))
                                            ) : (
                                                <div>No hay atributos disponibles</div>
                                            )}
                                        </td>
                                        {/* <td>
                                            {renderDetalle(product)}
                                        </td> */}
                                        <td className='icon__containerP'>
                                            <button className='iconEditP' onClick={() => handleEditarProductoClick(product.product_id)}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            <button className='iconTrashP' onClick={() => handleEliminarProductoClick(product.product_id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                            <button className='iconPlus' onClick={() => handleAgregarDetalleProductoClick(product.product_id)}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <TablePagination
                            className='paginatorProduct'
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filteredProducts.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </div>
            )}
    
            {showEditarProducto && <Editar setShowTable={setShowTable} setShowEditarProducto={setShowEditarProducto} setBotonTexto={setBotonTexto} productId={productoId} actualizarProductos={fetchProducts} />}
            {showAgregarProducto && <AgregarProducto setShowTable={setShowTable} setBotonTexto={setBotonTexto} setShowAgregarProducto={setShowAgregarProducto} actualizarProductos={fetchProducts} />}
        </div>
    );
    
    
    
    
    
};

export default ProductList;