import React from 'react';

const CtaSection = () => {
    // useEffect(() => {
    //     // Cargar los archivos JavaScript necesarios
    //     const loadScripts = async () => {
    //         const script1 = document.createElement('script');
    //         script1.src = `${import.meta.env.BASE_URL}js/script.js`; // Cargar script.js desde la carpeta public/js
    //         script1.async = true;
    //         document.body.appendChild(script1);
        
    //         const script2 = document.createElement('script');
    //         script2.src = `${import.meta.env.BASE_URL}js/core.min.js`; // Cargar core.min.js desde la carpeta public/js
    //         script2.async = true;
    //         document.body.appendChild(script2);
    //     };
        
          
    //       loadScripts();
          
    //       // Limpiar los scripts cuando el componente se desmonta
    //       return () => {
    //         const scripts = document.querySelectorAll("script[src^='/js/']");
    //         scripts.forEach((script) => document.body.removeChild(script));
    //       };
          
    //   }, []);

      return (
        <section className="section section-sm section-fluid bg-default text-center" id="projects">
            <div className="container-fluid">
                <h2 className="wow fadeInLeft">Nuestros productos</h2>
                <p className="quote-jean wow fadeInRight" data-wow-delay=".1s">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas omnis fuga aliquam ullam saepe sint aliquid! Maiores asperiores alias suscipit aliquid porro doloribus nulla magni. Saepe laudantium placeat atque accusantium dolorem reiciendis provident animi quas..</p>
                <div className="isotope-filters isotope-filters-horizontal">
                    <button className="isotope-filters-toggle button button-md button-icon button-icon-right button-default-outline button-wapasha" data-custom-toggle="#isotope-3" data-custom-toggle-hide-on-blur="true" data-custom-toggle-disable-on-blur="true"><span className="icon fa fa-caret-down"></span>Filter</button>
                    <ul className="isotope-filters-list" id="isotope-3">
                        <li><a className="active" href="#" data-isotope-filter="*" data-isotope-group="gallery">Todos</a></li>
                        <li><a href="#" data-isotope-filter="Type 1" data-isotope-group="gallery">Celulares</a></li>
                        <li><a href="#" data-isotope-filter="Type 2" data-isotope-group="gallery">Computadores</a></li>
                        <li><a href="#" data-isotope-filter="Type 3" data-isotope-group="gallery">CPU</a></li>
                        <li><a href="#" data-isotope-filter="Type 4" data-isotope-group="gallery">Tarjetas graficas</a></li>
                    </ul>
                </div>
                <div className="row row-30 isotope" data-isotope-layout="fitRows" data-isotope-group="gallery" data-lightgallery="group">
                    <div className="col-sm-6 col-lg-4 col-xxl-3 isotope-item wow fadeInRight" data-filter="Type 4">
                        <article className="thumbnail thumbnail-classic thumbnail-md">
                            <div className="thumbnail-classic-figure"><img src="images/fullwidth-gallery-1-420x350.jpg" alt="" width="420" height="350"/></div>
                            <div className="thumbnail-classic-caption">
                                <div className="thumbnail-classic-title-wrap"><a className="icon fl-bigmug-line-zoom60" href="images/grid-gallery-1-1200x800-original.jpg" data-lightgallery="item"><img src="images/fullwidth-gallery-1-420x350.jpg" alt="" width="420" height="350"/></a>
                                    <h5 className="thumbnail-classic-title"><a href="#">FinStep</a></h5>
                                </div>
                                <p className="thumbnail-classic-text">Conoce más acerca de este producto...</p>
                            </div>
                        </article>
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xxl-3 isotope-item wow fadeInRight" data-filter="Type 1" data-wow-delay=".1s">
                        <article className="thumbnail thumbnail-classic thumbnail-md">
                            <div className="thumbnail-classic-figure"><img src="images/fullwidth-gallery-2-420x350.jpg" alt="" width="420" height="350"/></div>
                            <div className="thumbnail-classic-caption">
                                <div className="thumbnail-classic-title-wrap"><a className="icon fl-bigmug-line-zoom60" href="images/grid-gallery-2-1200x800-original.jpg" data-lightgallery="item"><img src="images/fullwidth-gallery-2-420x350.jpg" alt="" width="420" height="350"/></a>
                                    <h5 className="thumbnail-classic-title"><a href="#">Mobile Finance</a></h5>
                                </div>
                                <p className="thumbnail-classic-text">Conoce más acerca de este producto...</p>
                            </div>
                        </article>
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xxl-3 isotope-item wow fadeInRight" data-filter="Type 2" data-wow-delay=".2s">
                        <article className="thumbnail thumbnail-classic thumbnail-md">
                            <div className="thumbnail-classic-figure"><img src="images/fullwidth-gallery-3-420x350.jpg" alt="" width="420" height="350"/></div>
                            <div className="thumbnail-classic-caption">
                                <div className="thumbnail-classic-title-wrap"><a className="icon fl-bigmug-line-zoom60" href="images/grid-gallery-3-1200x800-original.jpg" data-lightgallery="item"><img src="images/fullwidth-gallery-3-420x350.jpg" alt="" width="420" height="350"/></a>
                                    <h5 className="thumbnail-classic-title"><a href="#">Q-Manage</a></h5>
                                </div>
                                <p className="thumbnail-classic-text">Conoce más acerca de este producto...</p>
                            </div>
                        </article>
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xxl-3 isotope-item wow fadeInRight" data-filter="Type 3" data-wow-delay=".3s">
                        <article className="thumbnail thumbnail-classic thumbnail-md">
                            <div className="thumbnail-classic-figure"><img src="images/fullwidth-gallery-4-420x350.jpg" alt="" width="420" height="350"/></div>
                            <div className="thumbnail-classic-caption">
                                <div className="thumbnail-classic-title-wrap"><a className="icon fl-bigmug-line-zoom60" href="images/grid-gallery-4-1200x800-original.jpg" data-lightgallery="item"><img src="images/fullwidth-gallery-4-420x350.jpg" alt="" width="420" height="350"/></a>
                                    <h5 className="thumbnail-classic-title"><a href="#">WeatherCast</a></h5>
                                </div>
                                <p className="thumbnail-classic-text">Conoce más acerca de este producto...</p>
                            </div>
                        </article>
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xxl-3 isotope-item wow fadeInLeft" data-filter="Type 3">
                        <article className="thumbnail thumbnail-classic thumbnail-md">
                            <div className="thumbnail-classic-figure"><img src="images/fullwidth-gallery-5-420x350.jpg" alt="" width="420" height="350"/></div>
                            <div className="thumbnail-classic-caption">
                                <div className="thumbnail-classic-title-wrap"><a className="icon fl-bigmug-line-zoom60" href="images/grid-gallery-5-1200x800-original.jpg" data-lightgallery="item"><img src="images/fullwidth-gallery-5-420x350.jpg" alt="" width="420" height="350"/></a>
                                    <h5 className="thumbnail-classic-title"><a href="#">Home Calendar</a></h5>
                                </div>
                                <p className="thumbnail-classic-text">Conoce más acerca de este producto...</p>
                            </div>
                        </article>
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xxl-3 isotope-item wow fadeInLeft" data-filter="Type 1" data-wow-delay=".1s">
                        <article className="thumbnail thumbnail-classic thumbnail-md">
                            <div className="thumbnail-classic-figure"><img src="images/fullwidth-gallery-6-420x350.jpg" alt="" width="420" height="350"/></div>
                            <div className="thumbnail-classic-caption">
                                <div className="thumbnail-classic-title-wrap"><a className="icon fl-bigmug-line-zoom60" href="images/grid-gallery-6-1200x800-original.jpg" data-lightgallery="item"><img src="images/fullwidth-gallery-6-420x350.jpg" alt="" width="420" height="350"/></a>
                                    <h5 className="thumbnail-classic-title"><a href="#">MPlanner</a></h5>
                                </div>
                                <p className="thumbnail-classic-text">Conoce más acerca de este producto...</p>
                            </div>
                        </article>
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xxl-3 isotope-item wow fadeInLeft" data-filter="Type 2" data-wow-delay=".2s">
                        <article className="thumbnail thumbnail-classic thumbnail-md">
                            <div className="thumbnail-classic-figure"><img src="images/fullwidth-gallery-7-420x350.jpg" alt="" width="420" height="350"/></div>
                            <div className="thumbnail-classic-caption">
                                <div className="thumbnail-classic-title-wrap"><a className="icon fl-bigmug-line-zoom60" href="images/grid-gallery-7-1200x800-original.jpg" data-lightgallery="item"><img src="images/fullwidth-gallery-7-420x350.jpg" alt="" width="420" height="350"/></a>
                                    <h5 className="thumbnail-classic-title"><a href="#">Alice Messenger</a></h5>
                                </div>
                                <p className="thumbnail-classic-text">Conoce más acerca de este producto...</p>
                            </div>
                        </article>
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xxl-3 isotope-item wow fadeInLeft" data-filter="Type 3" data-wow-delay=".3s">
                        <article className="thumbnail thumbnail-classic thumbnail-md">
                            <div className="thumbnail-classic-figure"><img src="images/fullwidth-gallery-8-420x350.jpg" alt="" width="420" height="350"/></div>
                            <div className="thumbnail-classic-caption">
                                <div className="thumbnail-classic-title-wrap"><a className="icon fl-bigmug-line-zoom60" href="images/grid-gallery-8-1200x800-original.jpg" data-lightgallery="item"><img src="images/fullwidth-gallery-8-420x350.jpg" alt="" width="420" height="350"/></a>
                                    <h5 className="thumbnail-classic-title"><a href="#">WiseMoney</a></h5>
                                </div>
                                <p className="thumbnail-classic-text">Conoce más acerca de este producto...</p>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
