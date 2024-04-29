import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../EstilosComponentes/sesionIniciada.css'
import { Card, CardHeader, CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt, faUsers, faSignOutAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import TablaCategoriasL from './Categorias/tableCategori';
import RegisterCategories from './Categorias/registerCategori.jsx';

const Dashboard = () => {
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [errorMessageShown, setErrorMessageShown] = useState(false);
  const [contenidoSeleccionado, setContenidoSeleccionado] = useState('usuario');
  const [mostrarFormularioRegistro, setMostrarFormularioRegistro] = useState(false); // Nuevo estado para controlar la visibilidad del formulario de registro

  useEffect(() => {
    const verificar = localStorage.getItem('Bienvenida');

    if (!verificar) {
      // Establecer el estado para mostrar el mensaje
      setMostrarMensaje(true);

      // Guardar en localStorage
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

  const mostrarFormularioRegistroCategorias = () => {
    console.log('hola')
  };

  // Función para mostrar el contenido del usuario al cargar el dashboard
  useEffect(() => {
    // Lógica para mostrar el contenido del usuario al cargar el dashboard
  }, []);

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
        {contenidoSeleccionado === 'categorias' && <TablaCategorias onAgregarCategoria={mostrarFormularioRegistroCategorias} />}
        {contenidoSeleccionado === 'usuarios' && <TablaUsuarios />}
        {!['categorias', 'usuarios'].includes(contenidoSeleccionado) && <Bienvenida />}
        {mostrarFormularioRegistro && <RegisterCategories />}
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

const TablaCategorias = () => {
  return (
    <div>
      <h2>Categorías de Productos</h2>
      <TablaCategoriasL />
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

const formularioRegistrarCategorias = () => {
  return (
    <div>
      <h2>Registrar usuarios</h2>
      <RegisterCategories />
    </div>
  );
};

export default Dashboard;
