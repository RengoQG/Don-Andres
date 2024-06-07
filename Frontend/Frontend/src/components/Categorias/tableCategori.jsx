import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import UpdateCategori from './updateCategori.jsx';
import RegisterCategori from './registerCategori.jsx';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const TablaCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [showTabla, setShowTabla] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [mensajeEliminacion, setMensajeEliminacion] = useState('');
    const [botonTexto, setBotonTexto] = useState('Agregar categoría');

    const tableRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/categoria/categorias");
                setCategorias(response.data);
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
            }
        };

        fetchData();
    }, []);

    const actualizarCategorias = async () => {
        try {
            const response = await axios.get("http://localhost:3000/categoria/categorias");
            setCategorias(response.data);
        } catch (error) {
            console.error("Error al obtener las categorías:", error);
        }
    };

    const handleEditarCategoria = (categoria) => {
        setCategoriaSeleccionada(categoria);
        setIsUpdateMode(true);
        setShowTabla(false);
        setShowForm(true);
        setBotonTexto('Listar categorías');
    };

    const cambiarTextoBoton = () => {
        setBotonTexto('Agregar categoría');
      };      

    const handleBotonClick = () => {
        if (botonTexto === 'Listar categorías') {
            setShowTabla(true);
            setShowForm(false);
            setBotonTexto('Agregar categoría');
        } else {
            setBotonTexto('Listar categorías');
            setShowTabla(false);
            setShowForm(true);
        }
    };

    const handleEliminarCategoria = async (categoriaId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/eliminarCategoria/eliminarCategoria/${categoriaId}`);
            if (response.status === 200) {
                toast.success('Categoría eliminada exitosamente');
                const updatedCategorias = categorias.filter(categoria => categoria.category_id !== categoriaId);
                setCategorias(updatedCategorias);
            } 
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    return (
        <div>
            <button className={`btn btn-agregarCategoria ${botonTexto === 'Listar categorías' ? 'listarCategorias' : ''}`} onClick={handleBotonClick}>{botonTexto}</button>
            {mensajeEliminacion && <div className="mensaje-eliminacion">{mensajeEliminacion}</div>}
            {showTabla && (
                <>
                <ToastContainer />
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
                    </Table>
                </div>
                </>
            )}

                {showForm && isUpdateMode && (
    <>
        <ToastContainer /> {/* Aquí está el ToastContainer */}
        <UpdateCategori
            categoria={categoriaSeleccionada}
            isUpdateMode={isUpdateMode}
            onClose={() => {
                setShowForm(false);
                setShowTabla(true);
                cambiarTextoBoton(); 
            }}
            onCategoriaActualizada={actualizarCategorias}
        />
    </>
)}

            {showForm && !isUpdateMode && (
                <RegisterCategori
                    onClose={() => {
                        setShowForm(false);
                        setShowTabla(true);
                        cambiarTextoBoton(); 
                    }}
                    onCategoriaAgregada={actualizarCategorias} // Pasar la función actualizarCategorias como prop
                />
            )}
        </div>
    );
};

export default TablaCategorias;