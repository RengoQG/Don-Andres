import React, { useState, useEffect } from "react";
import CategoriasComponent from "./components/Categories.jsx";
// import Search from "./components/search.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';


const Header = () => {
  const [categorias, setCategorias] = useState([]);
  const [mostrarCategorias, setMostrarCategorias] = useState(false);


  const toggleCategorias = () => {
    setMostrarCategorias(!mostrarCategorias);
  };

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
            <div className="rd-navbar-main">
              <div className="rd-navbar-panel">
                <button className="rd-navbar-toggle" data-rd-navbar-toggle=".rd-navbar-nav-wrap"><span></span></button>
                <div className="rd-navbar-brand"><a className="brand" href="index.html"><img src="../public/images/logoHorizon.ico" className="logoHorizon" alt="" width="223" height="10px" /></a></div>
              </div>
              <div className="rd-navbar-main-element">
                <div className="rd-navbar-nav-wrap">
                  {/*  */}
                  <ul className="rd-navbar-nav">
                    {/* <li className="serachMobil"><Search /></li> */}
                    <li className="rd-nav-item active"><a className="rd-nav-link" href="/">Inicio</a></li>
                    <li className="rd-nav-item"><a className="rd-nav-link" href="/">Nosotros</a></li>
                    <li className="rd-nav-item">
                      <a className="rd-nav-link" href="/inicio">
                        <FontAwesomeIcon icon={faSignInAlt} />Iniciar
                      </a>
                    </li>
                    <li className="rd-nav-item"><a className="rd-nav-link" href="#contactanos">Contactanos</a></li>
                    <li className="rd-nav-item"><a className="rd-nav-link" href="#projects">Tienda</a></li>
                    {/* <li className="rd-nav-item">
                      <CategoriasComponent onChange={toggleCategorias} />
                      {mostrarCategorias && (
                        <ul className="rd-navbar-nav">
                          {categorias.map((categoria) => (
                            <li className="rd-nav-item" key={categoria.category_id}><a className="rd-nav-link" href="#">{categoria.name}</a></li>
                          ))}
                        </ul>
                      )}
                    </li> */}
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
