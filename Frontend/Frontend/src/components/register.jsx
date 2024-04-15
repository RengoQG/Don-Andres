import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { isValidEmail, isValidName, isValidPhoneNumber, isValidPassword, isValidAddress, isValidDocument, isValidDocumentType, isValidIssuanceDate } from '../services/validations.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import '../EstilosComponentes/register.css';

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessageShown, setErrorMessageShown] = useState(false);
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    document: '',
    fecha_nacimiento: '',
    document_type: '',
    issuance_date: ''
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

    const { name, email, password, address, phone, document, fecha_nacimiento, document_type, issuance_date } = formData;

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
      toast.error("Contraseña no válida");
      setErrorMessageShown(true);
      return;
    }
    if (!isValidAddress(address)) {
      toast.error("Dirección no válida.");
      setErrorMessageShown(true);
      return;
    }
    if (!isValidDocument(document)) {
      toast.error("Documento no válido.");
      setErrorMessageShown(true);
      return;
    }
    if (!isValidIssuanceDate(issuance_date, fecha_nacimiento)) {
      toast.error("Fechas incorrectas.");
      setErrorMessageShown(true);
      return;
    }
    if (!isValidDocumentType(document_type)) {
      toast.error("Tipo de documento no válido.");
      setErrorMessageShown(true);
      return;
    }

    try {
      const response = await axios.post('http://192.168.20.238:6001/users/register', formData);
      toast.success(response.data.message);
      setFormData({
        name: '',
        email: '',
        password: '',
        address: '',
        document: '',
        fecha_nacimiento: '',
        document_type: '',
        issuance_date: ''
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
          <label><FaUser /> Nombre completo</label>
          <input type="text" name="name" placeholder="Nombre" onChange={handleChange} value={formData.name} />
        </div>
        <div className="mb-3">
          <div className="input-group">
            <div className="input-wrapper select">
              <label><FaUser /> Tipo de documento</label>
              <select className="form-select selected" name="document_type" onChange={handleChange} value={formData.document_type}>
                <option defaultValue>Seleccione</option>
                <option value="CC">Cédula ciudadana</option>
                <option value="CE">Cédula de extranjero</option>
              </select>
            </div>
            <div className="input-wrapper">
              <label><FaUser /> Cédula</label>
              <input type="text" name="document" placeholder="Número de Cédula" onChange={handleChange} value={formData.document} />
            </div>
          </div>
        </div>
        <div className='fecha__main'>
          <div className="mb-3 select">
            <label><FaUser /> Fecha de expedición</label>
            <div className="input-group" id='fechaExp'>
              <input type="date" name="issuance_date" onChange={handleChange} value={formData.issuance_date} />
            </div>
          </div>
          <div className="mb-3 select">
            <label><FaUser /> Fecha de nacimiento</label>
            <div className="input-group">
              <input type="date" name="fecha_nacimiento" onChange={handleChange} value={formData.fecha_nacimiento} />
            </div>
          </div>
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

        <div className='button__main'>
          <button className='button_re' type="submit">Registrarse</button>
          <button className='button__log' onClick={() => navigateTo('/login')}>Inicio de sesión</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
