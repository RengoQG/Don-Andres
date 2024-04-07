import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CryptoJS from 'crypto-js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessageShown, setErrorMessageShown] = useState(false);
  const [fieldsAreNotEmpty, setFieldsAreNotEmpty] = useState(false); // Nuevo estado para controlar si los campos no están vacíos
  const navigateTo = useNavigate();

  useEffect(() => {
    // Cuando el componente se monta, comprueba si hay un correo electrónico y contraseña guardados y los prellena
    const storedEmail = localStorage.getItem('rememberedEmail');
    const storedPassword = localStorage.getItem('rememberedPassword');
    if (storedEmail && storedPassword) {
      const decryptedEmail = CryptoJS.AES.decrypt(storedEmail, 'secret_key').toString(CryptoJS.enc.Utf8);
      const decryptedPassword = CryptoJS.AES.decrypt(storedPassword, 'secret_key').toString(CryptoJS.enc.Utf8);
      setEmail(decryptedEmail);
      setPassword(decryptedPassword);
      setRememberMe(true);
      setFieldsAreNotEmpty(true); // Actualizar estado de campos no vacíos
    }
  }, []);

  useEffect(() => {
    // Actualizar estado de campos no vacíos cada vez que cambien los valores de correo electrónico y contraseña
    setFieldsAreNotEmpty(email.trim() !== '' && password.trim() !== '');
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isSubmitting || errorMessageShown) {
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post('http://localhost:6001/users/login', {
        email,
        password
      });

      localStorage.setItem('token', response.data.token);

      console.log('Usuario autenticado:', response.data.user);
      navigateTo('/inicio', { state: { user: response.data.user } });

      // Si la casilla de verificación "Recordarme" está marcada, guarda el correo electrónico y la contraseña en el almacenamiento local
      if (rememberMe) {
        const encryptedEmail = CryptoJS.AES.encrypt(email, 'secret_key').toString();
        const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret_key').toString();
        localStorage.setItem('rememberedEmail', encryptedEmail);
        localStorage.setItem('rememberedPassword', encryptedPassword);
      } else {
        // Si la casilla de verificación "Recordarme" no está marcada, elimina el correo electrónico y la contraseña guardados
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }
    } catch (error) {
      toast.error('Credenciales inválidas');
      setErrorMessageShown(true);
    }
  };

  const handleRememberMeChange = () => {
    // Verificar si los campos de correo electrónico y contraseña están vacíos
    if (!fieldsAreNotEmpty) {
      alert("No puedes recordar credenciales si los campos de correo electrónico y contraseña están vacíos.");
      return;
    }

    // Si los campos no están vacíos, permitir cambiar el estado de "Recordarme"
    const newRememberMe = !rememberMe;
    setRememberMe(newRememberMe);

    if (!newRememberMe) {
      const confirmation = window.confirm("¿Seguro que deseas desactivar la opción 'Recordarme'? Esto eliminará tus credenciales guardadas.");
      if (!confirmation) {
        // Si el usuario cancela, vuelve a activar la opción 'Recordarme'
        setRememberMe(true);
        return;
      }
      toast.info('Tus credenciales ya no serán recordadas');
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
    } else {
      toast.info('Tus credenciales serán recordadas');
      const encryptedEmail = CryptoJS.AES.encrypt(email, 'secret_key').toString();
      const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret_key').toString();
      localStorage.setItem('rememberedEmail', encryptedEmail);
      localStorage.setItem('rememberedPassword', encryptedPassword);
    }
  };

  return (
    <div className='container login__container'>
      <ToastContainer
        onClose={() => setErrorMessageShown(false)}
        onExited={() => setErrorMessageShown(false)}
      />
      <form onSubmit={handleLogin} className='login__main'>
        <div className='mb-3'>
          <label htmlFor="email">
            <FontAwesomeIcon icon={faEnvelope} className='icon' /> 
            Correo electrónico:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus={true}
            autoComplete="email"
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor="password">
            <FontAwesomeIcon icon={faLock} className='icon' /> 
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        <div>
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={handleRememberMeChange}
            disabled={!fieldsAreNotEmpty} // Deshabilitar la casilla si los campos están vacíos
          />
          <label htmlFor="rememberMe">Recordarme</label>
          
        </div>
        <div className='mb-3'>
          <a href="/reset">¿Olvidaste tu contraseña?</a>
        </div>
        <div className="button__group">
          <button type="submit" className="button__login" disabled={isSubmitting}>
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
          <button type="button" className="button__register" onClick={() => navigateTo('/register')}>Registrarse</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
