import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoriasComponent from "./components/Categories.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faHome, faUsers, faSignInAlt, faEnvelope, faStore } from '@fortawesome/free-solid-svg-icons';
import Prueba2 from './components/prueba.jsx';

const Header = () => {
  const [categorias, setCategorias] = useState([]);
  const [mostrarCategorias, setMostrarCategorias] = useState(false);

  const toggleCategorias = () => {
    setMostrarCategorias(!mostrarCategorias);
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('https://horizonsolutions.com.co:3000/categoria/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    const loadScripts = async () => {
      const scriptUrls = ["public/js/script.js", "public/js/core.min.js"];

      try {
        // Verificar si los scripts ya están cargados para evitar duplicados
        const loadedScripts = Array.from(document.querySelectorAll("script[src^='public/js']")).map(script => script.src);
        const scriptsToLoad = scriptUrls.filter(url => !loadedScripts.includes(url));

        // Cargar scripts de forma asíncrona
        await Promise.all(scriptsToLoad.map(async (url) => {
          try {
            const existingScript = document.querySelector(`script[src="${url}"]`);
            if (!existingScript) {
              const script = document.createElement("script");
              script.src = url;
              script.async = true;
              document.body.appendChild(script);
            }
          } catch (error) {
            console.error('Error al cargar el script:', error);
            // Notificar al usuario sobre el error de carga del script, si es necesario
          }
        }));
      } catch (error) {
        console.error('Error al cargar los scripts:', error);
        // Notificar al usuario sobre el error de carga de scripts, si es necesario
      }
    };

    loadScripts();

    // Limpiar los scripts al desmontar el componente
    return () => {
      try {
        const scripts = document.querySelectorAll("script[src^='public/js']");
        scripts.forEach(script => document.body.removeChild(script));
      } catch (error) {
        console.error('Error al limpiar los scripts:', error);
        // Manejar cualquier error al limpiar los scripts
      }
    };
  }, []);

  return (
    <header className="section page-header">
      <div className="rd-navbar-wrap">
        <nav className="rd-navbar rd-navbar-classic navColor" data-layout="rd-navbar-fixed" data-sm-layout="rd-navbar-fixed" data-md-layout="rd-navbar-fixed" data-md-device-layout="rd-navbar-fixed" data-lg-layout="rd-navbar-static" data-lg-device-layout="rd-navbar-fixed" data-xl-layout="rd-navbar-static" data-xl-device-layout="rd-navbar-static" data-xxl-layout="rd-navbar-static" data-xxl-device-layout="rd-navbar-static" data-lg-stick-up-offset="46px" data-xl-stick-up-offset="46px" data-xxl-stick-up-offset="46px" data-lg-stick-up="true" data-xl-stick-up="true" data-xxl-stick-up="true">
          <div className="rd-navbar-main-outer">
            <div className="rd-navbar-main" style={{ height: '150px' }}>
              <div className="rd-navbar-panel">
                <button className="rd-navbar-toggle" data-rd-navbar-toggle=".rd-navbar-nav-wrap"><span></span></button>
                <div className="rd-navbar-brand">
                  <a className="brand" href="/">
                    <img
                      src="images/logoWEB-.png"
                      alt=""
                      style={{ maxWidth: '150px', height: 'auto' }}
                    />
                  </a>
                </div>
              </div>
              <ul className="inputLateral">
                <li><Prueba2 /></li>
              </ul>
              <div className="rd-navbar-main-element">
                <div className="rd-navbar-nav-wrap">
                  <ul className="rd-navbar-nav" style={{ marginTop: '-10px', width: '650px', marginLeft:'48px' }}>
                    <li className="rd-nav-item active">
                      <a className="rd-nav-link" href="/">
                        <FontAwesomeIcon icon={faHome} /> Inicio
                      </a>
                    </li>
                    <li className="rd-nav-item">
                      <a className="rd-nav-link" href="/">
                        <FontAwesomeIcon icon={faUsers} /> Nosotros
                      </a>
                    </li>
                    <li className="rd-nav-item">
                      <a className="rd-nav-link" href="/inicio">
                        <FontAwesomeIcon icon={faSignInAlt} /> Iniciar sesión
                      </a>
                    </li>
                    <li className="rd-nav-item">
                      <a className="rd-nav-link" href="#contactanos">
                        <FontAwesomeIcon icon={faEnvelope} /> Contáctanos
                      </a>
                    </li>
                    <li className="rd-nav-item">
                      <a className="rd-nav-link" href="#projects">
                        <FontAwesomeIcon icon={faStore} /> Tienda
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </nav>
      </div>
    </header>
  );

};

export default Header;
