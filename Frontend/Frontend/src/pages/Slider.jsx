import React, { useEffect } from "react";

const SwiperSlider = () => {

  return (
    <section className="section swiper-container swiper-slider swiper-slider-classic" data-loop="true" data-autoplay="4859" data-simulate-touch="true" data-direction="vertical" data-nav="false">
      <div className="swiper-wrapper text-center">
        <div className="swiper-slide" style={{ backgroundImage: 'url(images/pagina/Foto1.png)', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} >
          <div className="swiper-slide-caption section-md">
            <div className="container">
              <h1 className="editH2" data-caption-animate="fadeInLeft" data-caption-delay="0"></h1>
              <p className="text-width-large editH1" data-caption-animate="fadeInRight" data-caption-delay="100"></p>
            </div>
          </div>
        </div>
        <div className="swiper-slide" data-slide-bg="images/Foto2.png">
          <div className="swiper-slide-caption section-md">
            <div className="container">
              <h1 className="editH1" data-caption-animate="fadeInLeft" data-caption-delay="0"></h1>
              <p className="text-width-large editH1" data-caption-animate="fadeInRight" data-caption-delay="100"></p>
            </div>
          </div>
        </div>
        <div className="swiper-slide" data-slide-bg="images/pagina/seccion5.jpg">
          <div className="swiper-slide-caption section-md">
            <div className="container">
              <h1 className="editH1" data-caption-animate="fadeInLeft" data-caption-delay="0">La mejor calidad al mejor precio</h1>
              <p className="text-width-large editH1" data-caption-animate="fadeInRight" data-caption-delay="100">Repuestos de todo tipo.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Swiper Pagination */}
      <div className="swiper-pagination__module">
        <div className="swiper-pagination__fraction">
          <span className="swiper-pagination__fraction-index">00</span>
          <span className="swiper-pagination__fraction-divider">/</span>
          <span className="swiper-pagination__fraction-count">00</span>
        </div>
        <div className="swiper-pagination__divider"></div>
        <div className="swiper-pagination"></div>
      </div>
    </section>
  );
};

export default SwiperSlider;
