import React from 'react';

const Footer = () => {
  return (
    <footer className="section section-fluid footer-minimal context-dark">
      <div className="bg-gray-15">
        <div className="container-fluid">
          <div className="footer-minimal-inset oh">
            <ul className="footer-list-category-2">
              <li>
                <a href="#">Horizon solutions.</a>
                <p>Llamanos: 9999999</p>
                <p>prueba@gmail.com</p>
                <p>Calle de tu corazon</p>
                </li>
              <li>
                <a href="#">Productos.</a>
                <p>Teclados</p>
                <p>Computadores</p>
                <p>Plays</p>
                </li>
              <li>
                <a href="#">Nuestra empresa.</a>
                <p>Quienes somos</p>
                <p>Devoluciones y garantias</p>
                <p>Terminos y condiciones</p>
                </li>
              <li>
                <a href="#">Su cuenta.</a>
                <p>Mi cuenta</p>
                <p>Mis favoritos</p>
                </li>
            </ul>
          </div>
          <div className="footer-minimal-bottom-panel text-sm-left">
            <div className="row row-10 align-items-md-center">
              <div className="col-sm-6 col-md-4 text-sm-right text-md-center">
                <div>
                  <ul className="list-inline list-inline-sm footer-social-list-2">
                    <li><a className="icon fa fa-facebook" href="#"></a></li>
                    <li><a className="icon fa fa-twitter" href="#"></a></li>
                    <li><a className="icon fa fa-google-plus" href="#"></a></li>
                    <li><a className="icon fa fa-instagram" href="#"></a></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6 col-md-4 order-sm-first">
                {/* Rights*/}
                <p className="rights"><span>&copy;&nbsp;</span><span className="copyright-year"></span> <span>RatherApp</span>
                </p>
              </div>
              {/* <div className="col-sm-6 col-md-4 text-md-right"><span>All rights reserved.</span> <span>Design&nbsp;by&nbsp;<a href="https://www.templatemonster.com">TemplateMonster</a></span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
