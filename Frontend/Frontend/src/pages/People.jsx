import React from 'react';

const TestimonialsSection = () => {
    return (
        <section className="section section-sm section-bottom-70 section-fluid bg-default">
            <div className="container-fluid">
                <h2>Que dice la gente</h2>
                <div className="row row-50 row-sm">
                    {/* Testimonio 1 */}
                    <div className="col-md-6 col-xl-4 wow fadeInRight">
                        <article className="quote-modern quote-modern-custom carta">
                            <div className="unit unit-spacing-md align-items-center">
                                <div className="unit-left"><a className="quote-modern-figure" href="#"><img className="img-circles" src="images/user-11-75x75.jpg" alt="" width="75" height="75" /></a></div>
                                <div className="unit-body">
                                    <h4 className="quote-modern-cite"><a href="#">Johan Quintero</a></h4>
                                    <p className="quote-modern-status">Cliente regular</p>
                                </div>
                            </div>
                            <div className="quote-modern-text">
                                <p className="q">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, quos dicta? Voluptate..</p>
                            </div>
                        </article>
                    </div>
                    {/* Testimonio 2 */}
                    <div className="col-md-6 col-xl-4 wow fadeInRight" data-wow-delay=".1s">
                        <article className="quote-modern quote-modern-custom carta">
                            <div className="unit unit-spacing-md align-items-center">
                                <div className="unit-left"><a className="quote-modern-figure" href="#"><img className="img-circles" src="images/user-12-75x75.jpg" alt="" width="75" height="75" /></a></div>
                                <div className="unit-body">
                                    <h4 className="quote-modern-cite"><a href="#">Joan Alvares</a></h4>
                                    <p className="quote-modern-status">Cliente regular</p>
                                </div>
                            </div>
                            <div className="quote-modern-text">
                                <p className="q">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos dignissimos sed odio!.</p>
                            </div>
                        </article>
                    </div>
                    {/* Testimonio 3 */}
                    <div className="col-md-6 col-xl-4 wow fadeInRight" data-wow-delay=".2s">
                        <article className="quote-modern quote-modern-custom carta">
                            <div className="unit unit-spacing-md align-items-center">
                                <div className="unit-left"><a className="quote-modern-figure" href="#"><img className="img-circles" src="images/user-20-75x75.jpg" alt="" width="75" height="75" /></a></div>
                                <div className="unit-body">
                                    <h4 className="quote-modern-cite"><a href="#">Sara Quintero</a></h4>
                                    <p className="quote-modern-status">Cliente regular</p>
                                </div>
                            </div>
                            <div className="quote-modern-text">
                                <p className="q">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta nulla vel consequuntur..</p>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
