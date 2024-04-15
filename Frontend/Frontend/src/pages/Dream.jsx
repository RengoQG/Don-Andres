import React, { useEffect } from "react";

const Dream = () => {

  return (
    <section className="section section-sm bg-default text-md-left">
    <div className="container">
      <div className="row row-50 align-items-center justify-content-center justify-content-xl-between">
        <div className="col-lg-6 col-xl-5 wow fadeInLeft">
          <h2>Productos destacados</h2>
          {/* Bootstrap tabs*/}
          <div className="tabs-custom tabs-horizontal tabs-line tabs-line-big text-center text-md-left" id="tabs-6">
            {/* Nav tabs*/}
            {/* <ul className="nav nav-tabs">
              <li className="nav-item" role="presentation"><a className="nav-link nav-link-big active" href="#tabs-6-1" data-toggle="tab">01</a></li>
              <li className="nav-item" role="presentation"><a className="nav-link nav-link-big" href="#tabs-6-2" data-toggle="tab">02</a></li>
              <li className="nav-item" role="presentation"><a className="nav-link nav-link-big" href="#tabs-6-3" data-toggle="tab">03</a></li>
              <li className="nav-item" role="presentation"><a className="nav-link nav-link-big" href="#tabs-6-4" data-toggle="tab">04</a></li>
            </ul> */}
            {/* Tab panes*/}
            <div className="tab-content">
              <div className="tab-pane fade show active" id="tabs-6-1">
                <h5 className="font-weight-normal">lorem</h5>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum iusto eaque modi debitis sed earum voluptas in assumenda minima incidunt..</p>
                <div className="group-sm group-middle"><a className="button button-secondary button-pipaluk" href="#modalCta" data-toggle="modal">Get in touch</a><a className="button button-default-outline button-wapasha" href="#">Learn More</a></div>
              </div>
              <div className="tab-pane fade" id="tabs-6-2">
                <h5 className="font-weight-normal">GET SOCIAL</h5>
                <p>Every app we develop has built-in social support that allows you to stay connected to your accounts on Facebook, Instagram, Twitter and other networks.</p>
                <div className="group-sm group-middle"><a className="button button-secondary button-pipaluk" href="#modalCta" data-toggle="modal">Get in touch</a><a className="button button-default-outline button-wapasha" href="#">Learn More</a></div>
              </div>
              <div className="tab-pane fade" id="tabs-6-3">
                <h5 className="font-weight-normal">CUSTOMER SERVICE</h5>
                <p>Every customer of RatherApp can get access to our friendly and qualified 24/7 support via chat or phone. Fell free to ask us any question!</p>
                <div className="group-sm group-middle"><a className="button button-secondary button-pipaluk" href="#modalCta" data-toggle="modal">Get in touch</a><a className="button button-default-outline button-wapasha" href="#">Learn More</a></div>
              </div>
              <div className="tab-pane fade" id="tabs-6-4">
                <h5 className="font-weight-normal">GREAT USABILITY</h5>
                <p>All our apps are designed to have great usability in order to easily operate our applications. That is why our software has high ratings and lots of awards.</p>
                <div className="group-sm group-middle"><a className="button button-secondary button-pipaluk" href="#modalCta" data-toggle="modal">Get in touch</a><a className="button button-default-outline button-wapasha" href="#">Learn More</a></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 text-center wow fadeInUp" data-wow-delay=".1s">
          <div className="owl-carousel owl-style-1" data-items="2" data-stage-padding="0" data-loop="true" data-margin="0" data-mouse-drag="true" data-autoplay="true"><a className="box-device" href="#"><img src="images/teclado.jpg" alt="" width="313" height="580"/></a><a className="box-device" href="#"><img src="images/teclado2.jpg" alt="" width="313" height="580"/></a><a className="box-device" href="#"><img src="images/Teclado3.jpg" alt="" width="313" height="580"/></a></div>
        </div>
      </div>
    </div>
  </section>

  );
};

export default Dream;
