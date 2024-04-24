import React from 'react';

const NewProductsSection = () => {
    return (
        <section className="section section-sm bg-default" id="news">
            <div className="m-3">
                <h2>Productos nuevos</h2>
                <div className="row row-45">
                    {/* Producto 1 */}
                    <div className="col-sm-6 col-lg-4 wow fadeInLeft">
                        <article className="post post-modern">
                            <a className="post-modern-figure" href="#">
                                <img src="images/post-10-370x307.jpg" alt="" width="370" height="307" />
                                <div className="post-modern-time">
                                    <time dateTime="2019-07-04"><span className="post-modern-time-month">07</span><span className="post-modern-time-number">04</span></time>
                                </div>
                            </a>
                            <h4 className="post-modern-title"><a href="#">Lorem ipsum dolor sit amet consectetur adipisicing elit.</a></h4>
                            <p className="post-modern-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nostrum est aspernatur molestiae.</p>
                        </article>
                    </div>
                    {/* Producto 2 */}
                    <div className="col-sm-6 col-lg-4 wow fadeInLeft" data-wow-delay=".1s">
                        <article className="post post-modern">
                            <a className="post-modern-figure" href="#">
                                <img src="images/post-11-370x307.jpg" alt="" width="370" height="307" />
                                <div className="post-modern-time">
                                    <time dateTime="2019-07-17"><span className="post-modern-time-month">07</span><span className="post-modern-time-number">17</span></time>
                                </div>
                            </a>
                            <h4 className="post-modern-title"><a href="#">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit, mollitia.</a></h4>
                            <p className="post-modern-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam deserunt sequi laboriosam nemo sunt architecto?</p>
                        </article>
                    </div>
                    {/* Producto 3 */}
                    <div className="col-sm-6 col-lg-4 wow fadeInLeft" data-wow-delay=".2s">
                        <article className="post post-modern">
                            <a className="post-modern-figure" href="#">
                                <img src="images/post-12-370x307.jpg" alt="" width="370" height="307" />
                                <div className="post-modern-time">
                                    <time dateTime="2019-07-22"><span className="post-modern-time-month">07</span><span className="post-modern-time-number">22</span></time>
                                </div>
                            </a>
                            <h4 className="post-modern-title"><a href="#">Lorem ipsum dolor sit.</a></h4>
                            <p className="post-modern-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod debitis commodi vel?</p>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewProductsSection;
