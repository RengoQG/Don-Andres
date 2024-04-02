import React, { useEffect } from "react";

const SwiperSlider = () => {
    useEffect(() => {
        // Cargar los archivos JavaScript necesarios
        const loadScripts = () => {
          const script1 = document.createElement("script");
          script1.src = "../public/js/script.js";
          script1.async = true;
          document.body.appendChild(script1);
    
          const script2 = document.createElement("script");
          script2.src = "../public/js/core.min.js";
          script2.async = true;
          document.body.appendChild(script2);
        };
        // <!-- <div id="root"></div> -->
        loadScripts();
    
        // Limpiar los scripts cuando el componente se desmonta
        return () => {
          const scripts = document.querySelectorAll("script[src^='public/js']");
          scripts.forEach(script => document.body.removeChild(script));
        };
      }, []);


  return (
    <section className="section swiper-container swiper-slider swiper-slider-classic" data-loop="true" data-autoplay="4859" data-simulate-touch="true" data-direction="vertical" data-nav="false">
      <div className="swiper-wrapper text-center">
        <div className="swiper-slide" data-slide-bg="images/pagina/Seccion1.jpg">
          <div className="swiper-slide-caption section-md">
            <div className="container">
              <h1 className="editH2" data-caption-animate="fadeInLeft" data-caption-delay="0">Encuentra lo que necesitas</h1>
              <p className="text-width-large editH1" data-caption-animate="fadeInRight" data-caption-delay="100">Somos una empresa dedicada y comprometida.</p>
            </div>
          </div>
        </div>
        <div className="swiper-slide" data-slide-bg="images/pagina/seccion4.jpg">
          <div className="swiper-slide-caption section-md">
            <div className="container">
              <h1 className="editH1" data-caption-animate="fadeInLeft" data-caption-delay="0">Empresa tecnológica</h1>
              <p className="text-width-large editH1" data-caption-animate="fadeInRight" data-caption-delay="100">Tenemos una gran variedad de productos increíbles.</p>
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
