import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import RegisterCategories from './registerCategori.jsx';
import SesionIniciada from '../sesionIniciada.jsx';

const TablaCategorias = ({ onAgregarCategoria, onUpdateButtonClick }) => {
    const [categorias, setCategorias] = useState([]);
    const [showTabla, setShowTabla] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [mensajeEliminacion, setMensajeEliminacion] = useState('');

    const tableRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://192.168.20.238:6001/categoria/categorias");
                setCategorias(response.data);
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
            }
        };

        fetchData();
    }, []);

    const handleEditarCategoria = (categoria) => {
        setShowForm(true);
        setShowTabla(false);
        setCategoriaSeleccionada(categoria);
        setIsUpdateMode(true);
        onUpdateButtonClick('Listar Categorías', false);
    };

    const handleEliminarCategoria = async (categoriaId) => {
        try {
            const response = await axios.delete(`http://192.168.20.238:6001/eliminarCategoria/eliminarCategoria/${categoriaId}`);
            if (response.data.error) {
               return toast.error(response.data.error);
            } else {
                // Si la eliminación fue exitosa, mostrar mensaje de éxito en la consola
                // toast.info(response.data.message);
                toast.success('prueba')
            }
            // Actualizar la lista de categorías después de eliminar
            const updatedCategorias = categorias.filter(categoria => categoria.category_id !== categoriaId);
            setCategorias(updatedCategorias);
        } catch (error) {
            console.error("Error al eliminar la categoría:", error);
        }
    };


    return (
        <div>
            <ToastContainer
                onClose={() => setErrorMessageShown(false)}
                onExited={() => setErrorMessageShown(false)}
            />
            {mensajeEliminacion && <div className="mensaje-eliminacion">{mensajeEliminacion}</div>}
            {showTabla && (
                <div className="my-custom-datatable">
                    <Table className='pruebaTabla' innerRef={tableRef}>
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
                                            style={{ maxWidth: '100px', maxHeight: '100px' }}
                                        />
                                    </td>
                                    <td className='icon__container'>
                                        <button className='iconEdit' onClick={() => handleEditarCategoria(categoria)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className='iconTrash' onClick={() => handleEliminarCategoria(categoria.category_id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                        </tfoot>
                    </Table>
                </div>
            )}

            {showForm && isUpdateMode && (
                <RegisterCategories
                    categoria={categoriaSeleccionada}
                    isUpdateMode={isUpdateMode}
                />
            )}

        </div>
    );
};

export default TablaCategorias;
