import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../EstilosComponentes/sesionIniciada.css';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt, faUsers, faSignOutAlt, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import TablaCategoriasL from './Categorias/tableCategori';
import TablaProductos from './Productos/TableProduct.jsx';
import RegisterCategories from './Categorias/registerCategori.jsx';

const Dashboard = ({ isUpdateMode }) => {
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [errorMessageShown, setErrorMessageShown] = useState(false);
  const [contenidoSeleccionado, setContenidoSeleccionado] = useState('categorias');
  const [mostrarFormularioRegistro, setMostrarFormularioRegistro] = useState(false);
  const [mostrarTablaCategorias, setMostrarTablaCategorias] = useState(true);
  const [mostrarTablaProductos, setMostrarTablaProductos] = useState(true);
  const [textoBoton, setTextoBoton] = useState('Agregar Categoría');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const UserProfileIcon = () => {
    return (
      <FontAwesomeIcon icon={faUser} className="profile-icon" />
    );
  };

  useEffect(() => {
    const verificar = localStorage.getItem('Bienvenida');

    if (!verificar) {
      setMostrarMensaje(true);
      localStorage.setItem('Bienvenida', 'Bienvenida');
    }
  }, []);

  const handleLogout = () => {
    if (errorMessageShown) {
      return;
    }
    localStorage.removeItem("token");
    localStorage.removeItem("Bienvenida");
    toast.info('Sesión cerrada correctamente');
    setErrorMessageShown(true);
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  };

  useEffect(() => {
    if (mostrarMensaje) {
      toast.success('¡Bienvenido!');
    }
  }, [mostrarMensaje]);

  const mostrarContenido = (contenido) => {
    setContenidoSeleccionado(contenido);
  };

  const handleUpdateButtonClick = (newText, showFormularioRegistro) => {
    setTextoBoton(newText);
    // Si estamos mostrando el formulario de edición, ocultarlo y mostrar la tabla
    if (!showFormularioRegistro) {
      setMostrarFormularioRegistro(false);
      setMostrarTablaCategorias(true);
    } else {
      // Si estamos mostrando el formulario de registro, mostrarlo y ocultar la tabla
      setMostrarFormularioRegistro(true);
      setMostrarTablaCategorias(false);
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-profile">
          </div>
          <h2 className='tilte__admin'>Administrador</h2>
        </div>
        <ul className="list-unstyled components">
          <li>
            <a href="#categorias" onClick={() => mostrarContenido('categorias')}>
              <FontAwesomeIcon icon={faListAlt} /> Categorías de Productos
            </a>
          </li>
          <li>
            <a href="#productos" onClick={() => mostrarContenido('productos')}>
              <FontAwesomeIcon icon={faUsers} /> Productos
            </a>
          </li>
          <li>
            <a href="/">
              <FontAwesomeIcon icon={faSignOutAlt} /> Página principal
            </a>
          </li>
          <li>
            <a href="#" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión
            </a>
          </li>
        </ul>
      </nav>
      <div className="content">
        <ToastContainer />
        {contenidoSeleccionado === 'categorias' && (
          <>
            <div className="category-header">
              <h2>Categorías de Productos</h2>

            </div>
            {/* Mostrar el formulario de edición si se cumple la condición */}
            {showForm && isUpdateMode && (
              <RegisterCategories
                categoria={categoriaSeleccionada}
                isUpdateMode={isUpdateMode}
                onClose={() => {
                  setShowForm(false); // Oculta el formulario de edición
                }}
              />
            )}
            {mostrarTablaCategorias && <TablaCategoriasL onUpdateButtonClick={handleUpdateButtonClick} />}
            {mostrarFormularioRegistro && !mostrarForm && <RegisterCategories />}
          </>
        )}
        {contenidoSeleccionado === 'productos' && (
          <>
            {/* Mostrar el formulario de edición si se cumple la condición */}
            {mostrarTablaProductos && <TablaProductos onUpdateButtonClick={handleUpdateButtonClick} />}
            {/* {mostrarFormularioRegistro && !mostrarForm && <RegisterCategories />} */}
          </>
        )}
        {contenidoSeleccionado === 'productos' && <Productos />}
        {!['categorias', 'productos'].includes(contenidoSeleccionado) && <Bienvenida />}
      </div>
    </div>
  );
};

const Bienvenida = () => {
  return (
    <div className='info__usuario'>
      <h1>Bienvenido a nuestra aplicación</h1>
      <p>Esperamos que disfrutes tu estancia.</p>
    </div>
  );
};

const Productos = () => {
  return (
    <div>
     
    </div>
  );
};

export default Dashboard;
