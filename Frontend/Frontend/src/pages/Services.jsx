import React, { useEffect } from "react";

const ServicesSection = () => {
  return (
    <section className="section section-sm section-first bg-default text-center" id="services">
      <div className="container">
        <div className="row row-30 justify-content-center">
          <div className="col-md-7 col-lg-5 col-xl-6 text-lg-left wow fadeInUp">
            <img src="images/index-1-415x592.png" alt="" width="415" height="592" />
          </div>
          <div className="col-lg-7 col-xl-6">
            <div className="row row-30">
              <div className="col-sm-6 wow fadeInRight">
                <article className="box-icon-modern box-icon-modern-custom">
                  <div>
                    <h3 className="box-icon-modern-big-title">QUE OFRECEMOS</h3>
                    <div className="box-icon-modern-decor"></div>
                    <a className="button button-primary button-ujarak" href="#projects">VER PRODUCTOS</a>
                  </div>
                </article>
              </div>
              <div className="col-sm-6 wow fadeInRight" data-wow-delay=".1s">
                <article className="box-icon-modern box-icon-modern-2">
                  <div className="box-icon-modern-icon linearicons-phone-in-out"></div>
                  <h5 className="box-icon-modern-title"><a href="#">NUESTROS SERVICIOS</a></h5>
                  <div className="box-icon-modern-decor"></div>
                  <p className="box-icon-modern-text">Queremos darte una excelente asesoría!</p>
                </article>
              </div>
              <div className="col-sm-6 wow fadeInRight" data-wow-delay=".2s">
                <article className="box-icon-modern box-icon-modern-2">
                  <div className="box-icon-modern-icon linearicons-headset"></div>
                  <h5 className="box-icon-modern-title"><a href="#">NUESTROS MEJORES PRODUCTOS</a></h5>
                  <div className="box-icon-modern-decor"></div>
                  <p className="box-icon-modern-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam neque laudantium inventore porro magnam sequi..</p>
                </article>
              </div>
              <div className="col-sm-6 wow fadeInRight" data-wow-delay=".3s">
                <article className="box-icon-modern box-icon-modern-2">
                  <div className="box-icon-modern-icon linearicons-outbox"></div>
                  <h5 className="box-icon-modern-title"><a href="#">VER CARRITO</a></h5>
                  <div className="box-icon-modern-decor"></div>
                  <p className="box-icon-modern-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur, eveniet!.</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div><br></br><br></br>
      <div className="parallax-container" data-parallax-img="images/parallax-1.jpg">
        <div className="parallax-content section-xl context-dark bg-overlay-68 bg-mobile-overlay">
          <div className="container">
            <div className="row row-30 justify-content-end text-right">
              <div className="col-sm-7">
                <h3 className="wow fadeInLeft">Let's Develop Your Next Great App!</h3>
                <p>Do you need a unique software solution for your company? We know how to help you!</p>
                <div className="group-sm group-middle group justify-content-end">
                  <a className="button button-primary button-ujarak" href="#modalCta" data-toggle="modal">Get in Touch</a>
                  <a className="button button-white-outline button-ujarak" href="#">Learn More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
