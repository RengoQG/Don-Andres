import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../EstilosComponentes/sesionIniciada.css';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt, faUsers, faSignOutAlt, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import TablaCategoriasL from './Categorias/tableCategori';
import RegisterCategories from './Categorias/registerCategori.jsx';

const Dashboard = ({ isUpdateMode }) => {
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [errorMessageShown, setErrorMessageShown] = useState(false);
  const [contenidoSeleccionado, setContenidoSeleccionado] = useState('categorias');
  const [mostrarFormularioRegistro, setMostrarFormularioRegistro] = useState(false);
  const [mostrarTablaCategorias, setMostrarTablaCategorias] = useState(true);
  const [textoBoton, setTextoBoton] = useState('Agregar Categoría');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [showForm, setShowForm] = useState(false);



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



  const mostrarFormularioRegistroCategorias = () => {
    if (mostrarFormularioRegistro) {
      // Si el formulario está siendo mostrado, cambia para mostrar la tabla de categorías
      setMostrarFormularioRegistro(false);
      setMostrarTablaCategorias(true);
      setTextoBoton('Agregar Categoría');
    } else {
      // Si el formulario no está siendo mostrado, cambia para mostrar el formulario de registro
      setMostrarFormularioRegistro(true);
      setMostrarTablaCategorias(false);
      setTextoBoton('Listar Categorías');
    }
  };


  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-profile">
            <img
              src="ruta/a/tu/imagen.jpg"
              alt="Foto de perfil"
              className="profile-img"
            />
            <div className="search-box">
              <input type="text" placeholder="Buscar" />
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
          <h3>Dashboard</h3>
        </div>
        <ul className="list-unstyled components">
          <li>
            <a href="#categorias" onClick={() => mostrarContenido('categorias')}>
              <FontAwesomeIcon icon={faListAlt} /> Categorías de Productos
            </a>
          </li>
          <li>
            <a href="#usuarios" onClick={() => mostrarContenido('usuarios')}>
              <FontAwesomeIcon icon={faUsers} /> Usuarios
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
              <button onClick={mostrarFormularioRegistroCategorias} className="add-category-btn">
                <FontAwesomeIcon icon={faPlus} /> {textoBoton}
              </button>
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
        {contenidoSeleccionado === 'usuarios' && <TablaUsuarios />}
        {!['categorias', 'usuarios'].includes(contenidoSeleccionado) && <Bienvenida />}
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

const TablaUsuarios = () => {
  return (
    <div className='container__usuarios'>
      <h2>Usuarios</h2>
      {/* Aquí va la tabla de usuarios */}
    </div>
  );
};

export default Dashboard;
