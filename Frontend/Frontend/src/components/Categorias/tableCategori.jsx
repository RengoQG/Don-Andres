import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../EstilosComponentes/registerCategori.css'
import InsertarCategoriaForm from './registerCategori.jsx'; // Importa el componente del formulario

const TablaCategorias = ({ onAgregarCategoria }) => {
    const [categorias, setCategorias] = useState([]);
    const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad de la modal
    const tableRef = useRef(null);
    const navigateTo = useNavigate();

    useEffect(() => {
        const fetchAndLoadDataTables = async () => {
            // Cargar jQuery de forma dinámica si no está cargado
            if (!window.jQuery) {
                const jQueryScript = document.createElement('script');
                jQueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
                document.body.appendChild(jQueryScript);
                await new Promise(resolve => jQueryScript.onload = resolve);
            }

            // Cargar DataTables de forma dinámica si no está cargado
            if (!$.fn.DataTable) {
                const dataTablesScript = document.createElement('script');
                dataTablesScript.src = 'https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js';
                document.body.appendChild(dataTablesScript);
                await new Promise(resolve => dataTablesScript.onload = resolve);
            }
        };

        fetchAndLoadDataTables();

        return () => {
            // Limpiar los scripts cuando el componente se desmonte
            document.querySelectorAll('script[src^="https://code.jquery.com"]').forEach(script => {
                script.remove();
            });
            document.querySelectorAll('script[src^="https://cdn.datatables.net"]').forEach(script => {
                script.remove();
            });
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://192.168.20.238:6001/categoria/categorias");
                setCategorias(response.data);
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
            }
        };

        fetchData(); // Llama a la función fetchData para obtener las categorías al montar el componente
    }, []);

    useEffect(() => {
        // Inicializar el DataTable solo si hay categorías y el ref de la tabla está definido
        if (categorias.length > 0 && tableRef.current && window.jQuery && $.fn.DataTable) {
            // Si el DataTable ya está inicializado, destruirlo primero
            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().destroy();
            }

            // Inicializar el DataTable
            $(tableRef.current).DataTable({
                language: {
                    search: 'Buscar:',
                    lengthMenu: 'Mostrar _MENU_ registros por página',
                    zeroRecords: 'No se encontraron resultados',
                    info: 'Mostrando _START_ a _END_ de _TOTAL_ entradas',
                    infoEmpty: 'Mostrando 0 a 0 de 0 entradas',
                    infoFiltered: '(filtrado de un total de _MAX_ entradas)',
                    paginate: {
                        first: 'Primero',
                        previous: 'Anterior',
                        next: 'Siguiente',
                        last: 'Último'
                    }
                },
                pageLength: 6 // Mostrar solo 5 registros por página
            });
        }
    }, [categorias]);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <div className="my-custom-datatable">
                <Table innerRef={tableRef}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((categoria) => (
                            <tr key={categoria.category_id}>
                                <td>{categoria.category_id}</td>
                                <td>{categoria.name}</td>
                                <td>
                                    <img
                                        src={'public/images/CategoriaImagenes/' + categoria.url_imagen}
                                        alt="Imagen de la categoría"
                                        style={{ maxWidth: '100px', maxHeight: '100px' }} // Estilos en línea para controlar el ancho y alto máximo
                                    />
                                </td>
                                <td>
                                    {/* Aquí podrías añadir botones para editar, eliminar, etc. */}
                                    <button className='btn btn-info'>Editar</button>
                                    <button className='btn btn-danger'>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4">
                                {/* Cambia el botón por uno que abra la modal */}
                                <button className='btn btn-success' onClick={handleOpenModal}>Agregar categoría</button>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </div>

            {/* Modal para agregar categoría */}
            <Modal show={showModal} onHide={handleCloseModal} centered >
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Categoría</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    {/* Inserta el formulario dentro del cuerpo de la modal */}
                    <InsertarCategoriaForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default TablaCategorias;
