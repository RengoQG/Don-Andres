import React from 'react';

const TestimonialsSection = () => {
    return (
        <section className="section section-sm section-bottom-70 section-fluid bg-default">
            <div className="container-fluid">
                <h2>Lo que opinan nuestros clientes</h2>
                <div className="row row-50 row-sm">
                    {/* Testimonio 1 */}
                    <div className="col-md-6 col-xl-4 wow fadeInRight">
                        <article className="quote-modern quote-modern-custom carta">
                            <div className="unit unit-spacing-md align-items-center">
                                {/* <div className="unit-left"><a className="quote-modern-figure" href="#"><img className="img-circles" src="images/user-11-75x75.jpg" alt="" width="75" height="75" /></a></div> */}
                                <div className="unit-body">
                                    <h4 className="quote-modern-cite"><a href="#">Johan Quintero</a></h4>
                                    <p className="quote-modern-status">Cliente</p>
                                </div>
                            </div>
                            <div className="quote-modern-text">
                                <p className="q">Esta página ofrece una gran variedad de productos y una experiencia de usuario muy amigable.</p>
                            </div>
                        </article>
                    </div>
                    {/* Testimonio 2 */}
                    <div className="col-md-6 col-xl-4 wow fadeInRight" data-wow-delay=".1s">
                        <article className="quote-modern quote-modern-custom carta">
                            <div className="unit unit-spacing-md align-items-center">
                                {/* <div className="unit-left"><a className="quote-modern-figure" href="#"><img className="img-circles" src="images/user-12-75x75.jpg" alt="" width="75" height="75" /></a></div> */}
                                <div className="unit-body">
                                    <h4 className="quote-modern-cite"><a href="#">Donovan hernandez</a></h4>
                                    <p className="quote-modern-status">Cliente</p>
                                </div>
                            </div>
                            <div className="quote-modern-text">
                                <p className="q">La página es intuitiva y rápida. El proceso de compra fue muy sencillo.
                                     Me encantó la sección de detalles del producto. Pude tomar una decisión informada antes de comprar.</p>
                            </div>
                        </article>
                    </div>
                    {/* Testimonio 3 */}
                    <div className="col-md-6 col-xl-4 wow fadeInRight" data-wow-delay=".2s">
                        <article className="quote-modern quote-modern-custom carta">
                            <div className="unit unit-spacing-md align-items-center">
                                {/* <div className="unit-left"><a className="quote-modern-figure" href="#"><img className="img-circles" src="images/user-20-75x75.jpg" alt="" width="75" height="75" /></a></div> */}
                                <div className="unit-body">
                                    <h4 className="quote-modern-cite"><a href="#">Nicolas valencias</a></h4>
                                    <p className="quote-modern-status">Cliente</p>
                                </div>
                            </div>
                            <div className="quote-modern-text">
                                <p className="q">Siempre tienen productos nuevos e interesantes.</p>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
