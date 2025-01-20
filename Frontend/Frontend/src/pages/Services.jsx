import React, { useEffect, useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';
import '../EstilosComponentes/servicios.css';

const ServicesSection = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showParallaxModal, setShowParallaxModal] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState('Blue.png');
  const [image, setImage] = useState(localStorage.getItem('ServicesImage') || 'Blue.png');
  const [parallaxImage, setParallaxImage] = useState(localStorage.getItem('ParallaxImage') || 'GreenModern.png');
  const [isOpen, setIsOpen] = useState(false); // Estado para manejar la apertura y cierre del dropdown

  const toggleDropdown = () => setIsOpen(!isOpen);


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoggedIn(false);
          return;
        }

        const response = await fetch('https://horizonsolutions.com.co:3000/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });

        if (response.ok) {
          setLoggedIn(true);
          console.log('Usuario autenticado');
        } else {
          setLoggedIn(false);
          console.log('Usuario no autenticado');
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        setLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const handleEditImage = (imageType) => {
    if (imageType === 'service') {
      setShowModal(true);
    } else if (imageType === 'parallax') {
      setShowParallaxModal(true);
    }
  };

  const handleFileChange = (event) => {
    setNewImage(event.target.files[0]);
  };

  const handleUpload = async (imageType) => {
    if (!newImage) return;

    const formData = new FormData();
    formData.append('image', newImage);
    formData.append('oldImage', imageType === 'service' ? selectedImage : parallaxImage);

    try {
      const response = await axios.post('https://horizonsolutions.com.co:3000/upload/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('Imagen subida correctamente');
        const newImageName = response.data.fileName;

        // Actualizamos el estado de la imagen y el localStorage
        if (imageType === 'service') {
          setImage(newImageName);
          localStorage.setItem('ServicesImage', newImageName);
          console.log(`Valor actualizado en localStorage[ServicesImage]:`, localStorage.getItem('ServicesImage'));
          setShowModal(false);
        } else if (imageType === 'parallax') {
          setParallaxImage(newImageName);
          localStorage.setItem('ParallaxImage', newImageName);
          console.log(`Valor actualizado en localStorage[ParallaxImage]:`, localStorage.getItem('ParallaxImage'));
          setShowParallaxModal(false);
        }
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

  useEffect(() => {
    const loadScripts = async () => {
        const scriptUrls = ["public/js/script.js", "public/js/core.min.js"];

        try {
            // Verificar si los scripts ya están cargados para evitar duplicados
            const loadedScripts = Array.from(document.querySelectorAll("script[src^='public/js']")).map(script => script.src);
            const scriptsToLoad = scriptUrls.filter(url => !loadedScripts.includes(url));

            // Cargar scripts de forma asíncrona
            await Promise.all(scriptsToLoad.map(async (url) => {
                try {
                    const existingScript = document.querySelector(`script[src="${url}"]`);
                    if (!existingScript) {
                        const script = document.createElement("script");
                        script.src = url;
                        script.async = true;
                        document.body.appendChild(script);
                    }
                } catch (error) {
                    console.error('Error al cargar el script:', error);
                    // Notificar al usuario sobre el error de carga del script, si es necesario
                }
            }));
        } catch (error) {
            console.error('Error al cargar los scripts:', error);
            // Notificar al usuario sobre el error de carga de scripts, si es necesario
        }
    };

    loadScripts();

    // Limpiar los scripts al desmontar el componente
    return () => {
        try {
            const scripts = document.querySelectorAll("script[src^='public/js']");
            scripts.forEach(script => document.body.removeChild(script));
        } catch (error) {
            console.error('Error al limpiar los scripts:', error);
            // Manejar cualquier error al limpiar los scripts
        }
    };
}, []);

  return (
    <section className="section section-sm section-first bg-default text-center" id="services">
      <div className="container">
        <div className="row row-30 justify-content-center">
          <div className="col-md-7 col-lg-5 col-xl-6 text-lg-left wow fadeInUp">
            <div className="image-container" style={{ position: 'relative' }}>
              <img src={`images/SwiperSlider/${image}`} alt="Services" width="415" height="592" />
              {loggedIn && (
                <FontAwesomeIcon
                  icon={faEdit}
                  className="editIcono"
                  onClick={() => handleEditImage('service')}
                  style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                />
              )}
            </div>
          </div>
          <div className="col-lg-7 col-xl-6">
            <div className="row row-30">
              <div className="col-sm-6 wow fadeInRight">
                <article className="box-icon-modern box-icon-modern-custom">
                  <div>
                    <h3 className="box-icon-modern-big-title">QUÉ OFRECEMOS</h3>
                    <div className="box-icon-modern-decor"></div>
                    <a className="button button-primary button-ujarak" href="Allproducto">VER PRODUCTOS</a>
                  </div>
                </article>
              </div>
              <div className="col-sm-6 wow fadeInRight" data-wow-delay=".1s">
                <article className="box-icon-modern box-icon-modern-2">
                  <div className="box-icon-modern-icon linearicons-phone-in-out"></div>
                  <h5 className="box-icon-modern-title"><a href="#contactanos">¿CÓMO PODEMOS AYUDARTE?</a></h5>
                  <div className="box-icon-modern-decor"></div>
                  <p className="box-icon-modern-text">Queremos darte una excelente asesoría!</p>
                </article>
              </div>
              <div className="col-sm-6 wow fadeInRight" data-wow-delay=".2s">
                <article className="box-icon-modern box-icon-modern-2">
                  <div className="box-icon-modern-icon linearicons-headset"></div>
                  <h5 className="box-icon-modern-title"><a href="#">TENEMOS EXCELENTES PRODUCTOS</a></h5>
                  <div className="box-icon-modern-decor"></div>
                </article>
              </div>
              <div className="col-sm-6 wow fadeInRight" data-wow-delay=".3s">
                <article className="box-icon-modern box-icon-modern-2">
                  <div className="box-icon-modern-icon linearicons-outbox"></div>
                  <h5 className="box-icon-modern-title"><a href="#">VER CARRITO</a></h5>
                  <div className="box-icon-modern-decor"></div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <div className="parallax-container" data-parallax-img="images/GreenModern.png" style={{ backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
        <div className="parallax-content section-xl context-dark p-3 bg-mobile-overlay">
          <div className="container">
            <div className="row row-30 justify-content-end text-right">
              <div className="col-sm-7">
                <h3 className="wow fadeInLeft"></h3>
                <div className="group-sm group-middle group justify-content-end">
                  {loggedIn && (
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="editIcono"
                      onClick={() => handleEditImage('parallax')}
                      style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Subir nueva imagen | la RESOLUCIÓN DE LA IMAGEN ES DE 415 x 592</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Selecciona una nueva imagen</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => handleUpload('service')}>
            Subir
          </Button>
        </Modal.Footer>
      </Modal>
  
      <Modal show={showParallaxModal} onHide={() => setShowParallaxModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Subir nueva imagen | RESOLUCIÓN 1770 x 550</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Selecciona una nueva imagen</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowParallaxModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => handleUpload('parallax')}>
            Subir
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
  
};

export default ServicesSection;
