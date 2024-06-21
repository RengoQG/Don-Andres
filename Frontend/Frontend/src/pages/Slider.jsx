import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';
import '../EstilosComponentes/servicios.css';

const SwiperSlider = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [images, setImages] = useState({
    Foto1: localStorage.getItem('Foto1') || 'Foto1.png',
    Foto2: localStorage.getItem('Foto2') || 'Foto2.png',
    Foto3: localStorage.getItem('Foto3') || 'Foto3.png',
  });
  const navigate = useNavigate();

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
  }, [navigate]);

  const handleEditImage = (imageName) => {
    setSelectedImage(imageName);
    setShowModal(true);
  };

  const handleFileChange = (event) => {
    setNewImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!newImage) return;
  
    const formData = new FormData();
    formData.append('image', newImage);
    formData.append('oldImage', selectedImage);
  
    try {
      const response = await axios.post('https://horizonsolutions.com.co/upload/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        console.log('Imagen subida correctamente');
        const newImageName = response.data.fileName;
  
        // Mostramos el nombre de la nueva imagen en consola antes de guardarlo
        console.log('Nuevo nombre de imagen:', newImageName);
  
        // Actualizamos el estado de las imágenes y el localStorage
        setImages((prevImages) => ({
          ...prevImages,
          [selectedImage]: newImageName,
        }));
        localStorage.setItem(selectedImage, newImageName);
        console.log(`Valor actualizado en localStorage[${selectedImage}]:`, localStorage.getItem(selectedImage));
  
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };
  

  return (
    <>
    <section className="section swiper-container swiper-slider swiper-slider-classic" style={{ maxHeight:'450px', maxWidth:'1300px', margin: '0 auto'}} data-loop="true" data-autoplay="4859" data-simulate-touch="true" data-direction="vertical" data-nav="false">
        <div className="swiper-wrapper text-center">
          <div className="swiper-slide sliderImagen" style={{ backgroundImage: `url(images/SwiperSlider/${images.Foto1})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
            <div className="swiper-slide-caption section-md">
              <div className="container">
                <h1 className="editH2" data-caption-animate="fadeInLeft" data-caption-delay="0"></h1>
                <p className="text-width-large editH1" data-caption-animate="fadeInRight" data-caption-delay="100"></p>
                {loggedIn && (
                  <FontAwesomeIcon icon={faEdit} className='editIcono' onClick={() => handleEditImage('Foto1')} />
                )}
              </div>
            </div>
          </div>
          <div className="swiper-slide" style={{ backgroundImage: `url(images/SwiperSlider/${images.Foto2})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} >
            <div className="swiper-slide-caption section-md">
              <div className="container">
                <h1 className="editH1" data-caption-animate="fadeInLeft" data-caption-delay="0"></h1>
                <p className="text-width-large editH1" data-caption-animate="fadeInRight" data-caption-delay="100"></p>
                {loggedIn && (
                  <FontAwesomeIcon icon={faEdit} className='editIcono' onClick={() => handleEditImage('Foto2')} />
                )}
              </div>
            </div>
          </div>
          <div className="swiper-slide" style={{ backgroundImage: `url(images/SwiperSlider/${images.Foto3})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} >
            <div className="swiper-slide-caption section-md">
              <div className="container">
                <h1 className="editH1" data-caption-animate="fadeInLeft" data-caption-delay="0"></h1>
                <p className="text-width-large editH1" data-caption-animate="fadeInRight" data-caption-delay="100"></p>
                {loggedIn && (
                  <FontAwesomeIcon icon={faEdit} className='editIcono' onClick={() => handleEditImage('Foto3')} />
                )}
              </div>
            </div>
          </div>
        </div>
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Subir nueva imagen | lA RESOLUCIÓN DE LA IMAGEN ES DE 1770 x 742</Modal.Title>
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
          <Button variant="primary" onClick={handleUpload}>
            Subir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SwiperSlider;
