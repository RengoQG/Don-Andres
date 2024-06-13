import React from 'react';

const Footer = () => {
  return (
    <footer className="section section-fluid footer-minimal context-dark">
      <div className="bg-gray-15">
        <div className="container-fluid">
          <div className="footer-minimal-inset oh">
            <ul className="footer-list-category-2">
              <li className='footerMainMovil'>
                <a href="/">Horizon solutions.</a>
                <p>Llamanos: 3006236655</p>
                <p>Horizonsolutions.soporte@gmail.com</p>
                <p>Calle 77ab # 90a 17</p>
              </li>
            </ul>
          </div>
          <div className="footer-minimal-bottom-panel text-sm-left">
            <div className="row row-10 align-items-md-center">
              <div className="col-sm-6 col-md-4 text-sm-right text-md-center">
                <div>
                  <ul className="list-inline list-inline-sm footer-social-list-2">
                    <li><a className="icon fa fa-facebook" href="https://www.facebook.com/horizonsolutions0109?mibextid=ZbWKwL"></a></li>
                    {/* <li><a className="icon fa fa-twitter" href="#"></a></li> */}
                     <li><a className="icon fa fa-google-plus" href="https://g.co/kgs/Z14u8nz"></a></li> 
                    <li><a className="icon fa fa-instagram" href="https://www.instagram.com/horizonsolutions0109?igsh=YXV0OGkyZjh6aXY="></a></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6 col-md-4 order-sm-first">
                {/* Rights*/}
                <p className="rights"><span>&copy;&nbsp;</span><span className="copyright-year"></span> <span>Horizon solutions</span>
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
