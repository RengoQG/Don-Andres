import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectsSection = ({ categorias, productos }) => {
  const [filtroActivo, setFiltroActivo] = useState(false);


  const toggleFiltro = () => {
    const ulElement = document.getElementById('isotope-3');
    const tieneClaseActive = ulElement.classList.contains('active');

    // Si el ul tiene la clase 'active', la quitamos; de lo contrario, la agregamos
    if (tieneClaseActive) {
      ulElement.classList.remove('active');
    } else {
      ulElement.classList.add('active');
    }

    // Actualizamos el estado para reflejar el cambio
    setFiltroActivo(!tieneClaseActive);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.isotope-filters')) {
      setFiltroActivo(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const listaFiltrosClases = filtroActivo ? 'isotope-filters-list active' : 'isotope-filters-list';
  const botonFiltroClases = filtroActivo ? 'isotope-filters-toggle button button-md button-icon button-icon-right button-default-outline button-wapasha active' : 'isotope-filters-toggle button button-md button-icon button-icon-right button-default-outline button-wapasha';


  return (
    <section className="section section-sm section-fluid bg-default text-center" id="projects">
      <div className="container-fluid">
        <h2 className="wow fadeInLeft">Nuestras categorias</h2>
        <div className="isotope-filters isotope-filters-horizontal">
          <button className={botonFiltroClases} onClick={toggleFiltro} data-custom-toggle="#isotope-3" data-custom-toggle-hide-on-blur="true" data-custom-toggle-disable-on-blur="true"><span className="icon fa fa-caret-down"></span>Filter</button>
          <ul className={listaFiltrosClases} id="isotope-3">

            <li><a className="active" href="#" data-isotope-filter="*" data-isotope-group="gallery">Todas</a></li>
            {categorias.map((categoria) => (
              <li key={categoria.category_id}><a href="#" data-isotope-filter={`Type ${categoria.category_id}`} data-isotope-group="gallery">{categoria.name}</a></li>
            ))}

          </ul>
        </div>
        <div className="row row-30 isotope" data-isotope-layout="fitRows" data-isotope-group="gallery" data-lightgallery="group">
          {/* Mapeo de productos */}
          <div key="1" className="col-sm-6 col-lg-4 col-xxl-3 isotope-item wow fadeInRight" data-filter={`Type 1`}>
            <article className="thumbnail thumbnail-classic thumbnail-md">
              <div className="thumbnail-classic-figure">
                <img src="images/A01.png" alt="" width="420" height="350" />
              </div>
              <h4 className='text-center'>Computadores</h4>
              <div className="thumbnail-classic-caption">
                <div className="thumbnail-classic-title-wrap">
                  <a className="icon fl-bigmug-line-zoom60" href="" data-lightgallery="item" data-src="">
                    <img src="" alt="" width="420" height="350" />
                  </a>
                  <h5 className="thumbnail-classic-title"><a href="#">Prueba</a></h5>
                </div>
              </div>
            </article>
          </div>
          <div key="2" className="col-sm-6 col-lg-4 col-xxl-3 isotope-item wow fadeInRight" data-filter={`Type 2`}>
            <article className="thumbnail thumbnail-classic thumbnail-md">
              <div className="thumbnail-classic-figure">
                <img src="images/A01.png" alt="" width="420" height="350" />
              </div>
              <h4 className='text-center'>Teclados</h4>
              <div className="thumbnail-classic-caption">
                <div className="thumbnail-classic-title-wrap">
                  <a className="icon fl-bigmug-line-zoom60" href="" data-lightgallery="item" data-src="">
                    <img src="" alt="" width="420" height="350" />
                  </a>
                  <h5 className="thumbnail-classic-title"><a href="#">Prueba</a></h5>
                </div>
              </div>
            </article>
          </div>
          <div key="3" className="col-sm-6 col-lg-4 col-xxl-3 isotope-item wow fadeInRight" data-filter={`Type 3`}>
            <article className="thumbnail thumbnail-classic thumbnail-md">
              <div className="thumbnail-classic-figure">
                <img src="images/A01.png" alt="" width="420" height="350" />
              </div>
              <h4 className='text-center'>Tarjetas madre</h4>
              <div className="thumbnail-classic-caption">
                <div className="thumbnail-classic-title-wrap">
                  <a className="icon fl-bigmug-line-zoom60" href="" data-lightgallery="item" data-src="">
                    <img src="" alt="" width="420" height="350" />
                  </a>
                  <h5 className="thumbnail-classic-title"><a href="#">Prueba</a></h5>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
