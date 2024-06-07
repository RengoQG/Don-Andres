import React, { useEffect, useState } from 'react';

const ProjectsSection = ({ categorias, productos }) => {
  const [filtroActivo, setFiltroActivo] = useState(false);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState('*');

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

  const handleFilter = (filter) => {
    setFiltroSeleccionado(filter);
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
        {/* <button className={botonFiltroClases} onClick={toggleFiltro} data-custom-toggle="#isotope-3" data-custom-toggle-hide-on-blur="true" data-custom-toggle-disable-on-blur="true"><span className="icon fa fa-caret-down"></span>Filtrar</button> */}
        {/* <button
            className="isotope-filters-toggle button button-md button-icon button-icon-right button-default-outline button-wapasha"
            data-custom-toggle="#isotope-3"
            data-custom-toggle-hide-on-blur="true"
            data-custom-toggle-disable-on-blur="true"
          > */}
            {/* <span className="icon fa fa-caret-down"></span>Filter
          </button> */}

          <ul className={listaFiltrosClases} id="isotope-3">
            {categorias.map((categoria) => (
              <li key={categoria.category_id}>
                <a data-isotope-filter={`Type 3`} data-isotope-group="gallery">
                  {categoria.name}
                </a>
              </li>
            ))}           
          </ul>

        </div>
        <div className="row row-30 isotope m-3" data-isotope-layout="fitRows" data-isotope-group="gallery" data-lightgallery="group">
          {categorias.map((categoria) => (
          <div key={categoria.category_id} className="col-sm-6 col-lg-4 col-xxl-3 isotope-item wow fadeInLeft" data-filter="Type 3" data-wow-delay=".3s">
            <article className="thumbnail thumbnail-classic thumbnail-md">
              <div className="thumbnail-classic-figure">
                <img src={`../../public/images/CategoriaImagenes/${categoria.url_imagen}`} alt="" width="420" height="350" />
              </div>
              <div className="thumbnail-classic-caption">
                <div className="thumbnail-classic-title-wrap">
                  <h5 className="thumbnail-classic-title"><a href="Allproducto">{categoria.name}</a></h5>
                  {/* <p className="thumbnail-classic-title"><a href="Allproducto">Conoce más sobre nuestras categorías y productos.</a></p> */}
                </div>
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
