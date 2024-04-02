import React from 'react';

const CtaSection = () => {
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
    
        loadScripts();
    
        // Limpiar los scripts cuando el componente se desmonta
        return () => {
          const scripts = document.querySelectorAll("script[src^='public/js']");
          scripts.forEach(script => document.body.removeChild(script));
        };
      }, []);

  return (
    <section className="section section-fluid bg-default">
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

export default CtaSection;
