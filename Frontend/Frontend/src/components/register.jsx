import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { isValidEmail, isValidName, isValidPhoneNumber, isValidPassword, isValidAddress } from '../services/validations.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import '../EstilosComponentes/register.css'

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessageShown, setErrorMessageShown] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: ''
  });

  const formularioRef = useRef(null);

  useEffect(() => {
    if (!errorMessageShown && isSubmitting) {
      setIsSubmitting(false);
    }
  }, [errorMessageShown, isSubmitting]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting || errorMessageShown) {
      return;
    }

    const { name, email, password, address, phone } = formData;

    if (!isValidEmail(email)) {
      toast.error("Correo electrónico no válido");
      setErrorMessageShown(true);
      return;
    }

    if (!isValidName(name)) {
      toast.error("Nombre no válido");
      setErrorMessageShown(true);
      return;
    }

    if (!isValidPhoneNumber(phone)) {
      toast.error("Número de teléfono no válido");
      setErrorMessageShown(true);
      return;
    }

    if (!isValidPassword(password)) {
      toast.error("Contraseña no valida");
      setErrorMessageShown(true);
      return;
    }
    if (!isValidAddress(address)) {
      toast.error("Dirección no válida.");
      setErrorMessageShown(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:6001/users/register', formData);
      toast.success(response.data.message);
      setFormData({
        name: '',
        email: '',
        password: '',
        address: '',
        phone: ''
      });
      setErrorMessageShown(true);
      formularioRef.current.reset();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Error interno del servidor");
      }
    }
  };

  return (
    <div className='main__form'>
      <form onSubmit={handleSubmit} className='register-form' ref={formularioRef}>
        <ToastContainer
          onClose={() => setErrorMessageShown(false)}
          onExited={() => setErrorMessageShown(false)}
        />
        <div className="mb-3">
          <label><FaUser /> Nombre</label>
          <input type="text" name="name" placeholder="Nombre" onChange={handleChange} value={formData.name} />
        </div>
        <div className="mb-3">
          <label><FaEnvelope /> Correo Electrónico</label>
          <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} value={formData.email} />
        </div>
        <div className="mb-3">
          <label><FaLock /> Contraseña</label>
          <input className='prueba' type="password" name="password" placeholder="Contraseña" onChange={handleChange} value={formData.password} />
        </div>
        <div className="mb-3">
          <label><FaMapMarkerAlt /> Dirección</label>
          <input type="text" name="address" placeholder="Dirección" onChange={handleChange} value={formData.address} />
        </div>
        <div className="mb-3">
          <label><FaPhone /> Teléfono</label>
          <input type="text" name="phone" placeholder="Teléfono" onChange={handleChange} value={formData.phone} />
        </div>
        <div className="mb-3">
          <p className="small-text">
            Tus datos personales se utilizarán para procesar tu pedido, mejorar tu experiencia en esta web, gestionar el acceso a tu cuenta y otros propósitos descritos en nuestra 
            <a href="/ruta/a/politica-de-privacidad" className="privacy-link">política de privacidad</a>.
          </p>
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterForm;
