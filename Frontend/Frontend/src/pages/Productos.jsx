import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectsSection = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    // Verificar si los scripts ya están cargados
    const isScriptsLoaded = () => {
      return !!document.querySelector("script[src^='js']");
    };

    // Función para inicializar la funcionalidad una vez que los scripts están cargados
    const initializeFunctionality = () => {
      const wow = new window.WOW();
      wow.init();
      setScriptsLoaded(true); // Marcar los scripts como cargados
    };

    // Si los scripts ya están cargados, inicializar la funcionalidad
    if (isScriptsLoaded()) {
      initializeFunctionality();
    } else {
      // Si los scripts no están cargados, cargarlos y luego inicializar la funcionalidad
      const script1 = document.createElement("script");
      script1.src = "/public/js/script.js";
      script1.async = true;
      script1.onload = () => {
        const script2 = document.createElement("script");
        script2.src = "/public/js/core.min.js";
        script2.async = true;
        script2.onload = initializeFunctionality;
        document.body.appendChild(script2);
      };
      document.body.appendChild(script1);
    }

    // Limpiar los scripts cuando el componente se desmonta
    return () => {
      if (scriptsLoaded) {
        const scripts = document.querySelectorAll("script[src^='js']");
        scripts.forEach(script => document.body.removeChild(script));
      }
    };
  }, [scriptsLoaded]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:6001/categoria/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:6001/producto/products');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos();
  }, []);



  return (
    <section className="section section-sm section-fluid bg-default text-center" id="projects">
      <div className="container-fluid">
        <h2 className="wow fadeInLeft">Nuestros productos</h2>
        <h4 className="quote-jean wow fadeInRight" data-wow-delay=".1s">Categorias</h4>
        <div className="isotope-filters isotope-filters-horizontal">
          <button className="isotope-filters-toggle button button-md button-icon button-icon-right button-default-outline button-wapasha" data-custom-toggle="#isotope-3" data-custom-toggle-hide-on-blur="true" data-custom-toggle-disable-on-blur="true"><span className="icon fa fa-caret-down"></span>Filter</button>
          <ul className="isotope-filters-list" id="isotope-3">
            {/* Renderización dinámica de las categorías */}
            <li key="all"><a className="active" href="#" data-isotope-filter="*" data-isotope-group="gallery">Todos</a></li>
            {categorias.map((categoria) => (
              <li key={categoria.category_id}><a href="#" data-isotope-filter={`Type ${categoria.category_id}`} data-isotope-group="gallery">{categoria.name}</a></li>
            ))}
          </ul>
        </div>
        <div className="row row-30 isotope" data-isotope-layout="fitRows" data-isotope-group="gallery" data-lightgallery="group">
          {productos.map((producto) => (
            <div className="col-sm-6 col-lg-4 col-xxl-3 isotope-item wow fadeInRight" data-filter={`Type ${producto.category_id}`}>
              <article className="thumbnail thumbnail-classic thumbnail-md">
                <div className="thumbnail-classic-figure"><img src="images/fullwidth-gallery-1-420x350.jpg" alt="" width="420" height="350" /></div>
                <div className="thumbnail-classic-caption">
                  <div className="thumbnail-classic-title-wrap"><a className="icon fl-bigmug-line-zoom60" href="images/grid-gallery-1-1200x800-original.jpg" data-lightgallery="item"><img src="images/fullwidth-gallery-1-420x350.jpg" alt="" width="420" height="350" /></a>
                  </div>
                  <h2 className="thumbnail-classic-text">{producto.name}</h2>
                  <p className="thumbnail-classic-text">$ {producto.price}</p>
                  <button className="btn align-self-center mb-3 button__meInteresa" id='botonnnn'>
                    <i className="fa fa-eye mr-2 iconInteresa"></i>Me interesa
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
