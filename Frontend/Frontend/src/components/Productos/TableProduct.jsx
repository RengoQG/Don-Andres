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


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:6001/obtenerProducto/listarProductos');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:6001/obtenerProducto/listarProductos');
            setProducts(response.data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    const handleEliminarProductoClick = async (productId) => {
        try {
            const response = await axios.delete(`http://localhost:6001/eliminarProducto/eliminarProducto/${productId}`);
            if (response.data.error) {
                return toast.error(response.data.error);
            } else {
                toast.success('producto eliminada exitosamente');
                // Actualizar la lista de productos después de eliminar el producto
                await fetchProducts();
                // Establecer la página actual en 0 para mostrar desde el primer registro
                setPage(0);
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
        // Mostrar el cuadro de diálogo de SweetAlert
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

        // Si se ingresó un detalle, enviarlo al servidor para agregarlo al producto
        if (detalle_texto) {
            try {
                // Realizar la solicitud al servidor para agregar el detalle
                const response = await axios.post('http://localhost:6001/agregarDestalleProducto/agregarDetalleProducto', {
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
                // (puedes implementarlo según sea necesario)
            } catch (error) {
                // Mostrar un mensaje de error si ocurrió un problema al agregar el detalle
                Swal.fire({
                    icon: 'error',
                    title: 'Error al agregar el detalle',
                    text: error.message
                });
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
            {/* <Button variant="contained" className='btn-agregar-p' onClick={handleAgregarProductoClick}>
                {botonTexto}
            </Button> */}
            <button className={`btn-agrgar-p ${botonTexto === 'Listar categorías' ? 'listarCategorias' : ''}`} onClick={handleBotonClick}>{botonTexto}</button>
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
                    <TableContainer component={Paper} >
                        <h4 className='title__product'>Lista de Productos</h4>
                        <Table className='container__table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Descripción</TableCell>
                                    <TableCell>Precio</TableCell>
                                    <TableCell>ID de Categoría</TableCell>
                                    <TableCell>URL de Imagen</TableCell>
                                    <TableCell>Código</TableCell>
                                    <TableCell>Unidad</TableCell>
                                    <TableCell>Cantidad</TableCell>
                                    <TableCell>Infinito</TableCell>
                                    <TableCell>Precio de Compra</TableCell>
                                    <TableCell>Compra por Cantidad</TableCell>
                                    <TableCell>Precio de Venta</TableCell>
                                    <TableCell>Venta por Cantidad</TableCell>
                                    <TableCell>Descuento</TableCell>
                                    <TableCell>Impuesto1</TableCell>
                                    <TableCell>Impuesto2</TableCell>
                                    <TableCell>Impuesto3</TableCell>
                                    <TableCell>Proveedor</TableCell>
                                    <TableCell>Estante</TableCell>
                                    <TableCell>Referencia</TableCell>
                                    <TableCell>Personalizado1</TableCell>
                                    <TableCell>Personalizado2</TableCell>
                                    <TableCell>Usuario</TableCell>
                                    <TableCell>Creado</TableCell>
                                    <TableCell>Mínimo de Stock</TableCell>
                                    <TableCell>Fecha de Vencimiento</TableCell>
                                    <TableCell>Color</TableCell>
                                    <TableCell>Usos Recomendados</TableCell>
                                    <TableCell>Número de Teclas</TableCell>
                                    <TableCell>Tamaño</TableCell>
                                    <TableCell>Marca</TableCell>
                                    <TableCell>Compatibilidad</TableCell>
                                    <TableCell>Tecnología</TableCell>
                                    <TableCell>Características</TableCell>
                                    <TableCell>Nombre de Categoría</TableCell>
                                    {/* Agrega más encabezados aquí según tus necesidades */}
                                    <TableCell className='container__btn'>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                                    <TableRow key={product.product_id}>
                                        <TableCell>{product.product_id}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{renderCellValue(product.description)}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>{product.category_id}</TableCell>
                                        <TableCell>{product.image_url}</TableCell>
                                        <TableCell>{product.codigo}</TableCell>
                                        <TableCell>{product.unidad}</TableCell>
                                        <TableCell>{renderCellValue(product.cantidad)}</TableCell>
                                        <TableCell>{renderCellValue(product.infinito)}</TableCell>
                                        <TableCell>{renderCellValue(product.precio_compra)}</TableCell>
                                        <TableCell>{renderCellValue(product.compra_x_cantidad)}</TableCell>
                                        <TableCell>{renderCellValue(product.precio_venta)}</TableCell>
                                        <TableCell>{renderCellValue(product.venta_x_cantidad)}</TableCell>
                                        <TableCell>{renderCellValue(product.descuento)}</TableCell>
                                        <TableCell>{renderCellValue(product.impuesto1)}</TableCell>
                                        <TableCell>{renderCellValue(product.impuesto2)}</TableCell>
                                        <TableCell>{renderCellValue(product.impuesto3)}</TableCell>
                                        <TableCell>{renderCellValue(product.proveedor)}</TableCell>
                                        <TableCell>{renderCellValue(product.estante)}</TableCell>
                                        <TableCell>{renderCellValue(product.referencia)}</TableCell>
                                        <TableCell>{renderCellValue(product.personalizado1)}</TableCell>
                                        <TableCell>{renderCellValue(product.personalizado2)}</TableCell>
                                        <TableCell>{renderCellValue(product.usuario)}</TableCell>
                                        <TableCell>{product.creado}</TableCell>
                                        <TableCell>{product.minimo_stock}</TableCell>
                                        <TableCell>{renderCellValue(product.fecha_vencimiento)}</TableCell>
                                        <TableCell>{renderCellValue(product.color)}</TableCell>
                                        <TableCell>{renderCellValue(product.usos_recomendados)}</TableCell>
                                        <TableCell>{renderCellValue(product.numero_teclas)}</TableCell>
                                        <TableCell>{renderCellValue(product.tamano)}</TableCell>
                                        <TableCell>{renderCellValue(product.marca)}</TableCell>
                                        <TableCell>{renderCellValue(product.compatibilidad)}</TableCell>
                                        <TableCell>{renderCellValue(product.tecnologia)}</TableCell>
                                        <TableCell>{renderCellValue(product.caracteristicas)}</TableCell>
                                        <TableCell>{renderCellValue(product.nombre_categoria)}</TableCell>
                                        {/* Agrega más celdas aquí según tus necesidades */}
                                        {/* Agrega más celdas aquí según tus necesidades */}
                                        <TableCell className='icon__containerP'>
                                            <button className='iconEditP' onClick={() => handleEditarProductoClick(product.product_id)}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            <button className='iconTrashP' onClick={() => handleEliminarProductoClick(product.product_id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                            <button className='iconPlus' onClick={() => handleAgregarDetalleProductoClick(product.product_id)}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            className='paginatorProduct'
                            rowsPerPageOptions={[5, 10, 25]} // Opciones para seleccionar cantidad de filas por página
                            component="div"
                            count={filteredProducts.length} // Cantidad total de productos
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </div>
            )}

            {showEditarProducto && <Editar setShowTable={setShowTable} productId={productoId} actualizarProductos={fetchProducts} />}
            {showAgregarProducto && <AgregarProducto setShowTable={setShowTable} actualizarProductos={fetchProducts}/>}
        </div>
    );
};

export default ProductList;