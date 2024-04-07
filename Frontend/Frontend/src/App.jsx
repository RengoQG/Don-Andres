import React, { useEffect } from "react";
 

const Header = () => {
  useEffect(() => {
    // Cargar los archivos JavaScript necesarios
    const loadScripts = () => {
      const script1 = document.createElement("script");
      script1.src = "../public/js/script.js";
      script1.async = true;
      document.body.appendChild(script1);

      const script2 = document.createElement("script");
      script2.src = "../public/js/core.min.js";
      script2.async = true;
      document.body.appendChild(script2);
    };
    // <!-- <div id="root"></div> -->
    loadScripts();

    // Limpiar los scripts cuando el componente se desmonta
    return () => {
      const scripts = document.querySelectorAll("script[src^='public/js']");
      scripts.forEach(script => document.body.removeChild(script));
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
                <div className="rd-navbar-brand"><a className="brand" href="index.html"><img src="images/logo-default-223x50.png" alt="" width="223" height="50"/></a></div>
              </div>
              <div className="rd-navbar-main-element">
                <div className="rd-navbar-nav-wrap">
                  <div className="rd-navbar-share fl-bigmug-line-share27" data-rd-navbar-toggle=".rd-navbar-share-list">
                    <ul className="list-inline rd-navbar-share-list">
                      <li className="rd-navbar-share-list-item"><a className="icon fa fa-facebook" href="#"></a></li>
                      <li className="rd-navbar-share-list-item"><a className="icon fa fa-twitter" href="#"></a></li>
                      <li className="rd-navbar-share-list-item"><a className="icon fa fa-google-plus" href="#"></a></li>
                      <li className="rd-navbar-share-list-item"><a className="icon fa fa-instagram" href="#"></a></li>
                    </ul>
                  </div>
                  <ul className="rd-navbar-nav">
                    <li className="rd-nav-item active"><a className="rd-nav-link" href="/">Inicio</a></li>
                    <li className="rd-nav-item"><a className="rd-nav-link" href="#services">Quienes somos</a></li>
                    <li className="rd-nav-item"><a className="rd-nav-link" href="#projects">Tienda</a></li>
                    <li className="rd-nav-item"><a className="rd-nav-link" href="#projects"><select class="form-select form-select-lg mb-3" aria-label="Large select example">
                      <option selected>Categorias</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select></a></li>
                    <li className="rd-nav-item"><a className="rd-nav-link" href="#team">Contactanos</a></li>
                    <li className="rd-nav-item"><a className="rd-nav-link" href="/login">Inicio de sesión</a></li>
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
