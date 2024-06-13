import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessageShown, setErrorMessageShown] = useState(false);
  const [fieldsAreNotEmpty, setFieldsAreNotEmpty] = useState(false); 

  const navigateTo = useNavigate();

  useEffect(() => {
    // check for saved email and password
    const storedEmail = localStorage.getItem('rememberedEmail');
    const storedPassword = localStorage.getItem('rememberedPassword');
    if (storedEmail && storedPassword) {
      const decryptedEmail = CryptoJS.AES.decrypt(storedEmail, 'secret_key').toString(CryptoJS.enc.Utf8);
      const decryptedPassword = CryptoJS.AES.decrypt(storedPassword, 'secret_key').toString(CryptoJS.enc.Utf8);
      setEmail(decryptedEmail);
      setPassword(decryptedPassword);
      setRememberMe(true);
      setFieldsAreNotEmpty(true);
    }
  }, []);

  useEffect(() => {
    // Update state of fieldsAreNotEmpty whenever email and password change
    setFieldsAreNotEmpty(email.trim() !== '' && password.trim() !== '');
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isSubmitting || errorMessageShown) {
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post('https://horizonsolutions.com.co:3000/users/login', {
        email,
        password
      });

      localStorage.setItem('token', response.data.token);

      console.log('Usuario autenticado:', response.data);
      navigateTo('/inicio', { state: { user: response.data.user } });

      // If "Remember Me" checkbox is checked, save email and password to localStorage
      if (rememberMe) {
        const encryptedEmail = CryptoJS.AES.encrypt(email, 'secret_key').toString();
        const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret_key').toString();
        localStorage.setItem('rememberedEmail', encryptedEmail);
        localStorage.setItem('rememberedPassword', encryptedPassword);
      } else {
        // If "Remember Me" checkbox is unchecked, remove saved email and password
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }
    } catch (error) {
      toast.error('Credenciales inválidas');
      setErrorMessageShown(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRememberMeChange = () => {
    // Check if email and password fields are empty
    if (!fieldsAreNotEmpty) {
      alert("No puedes recordar credenciales si los campos de correo electrónico y contraseña están vacíos.");
      return;
    }

    // Toggle "Remember Me" state
    const newRememberMe = !rememberMe;
    setRememberMe(newRememberMe);

    // Show confirmation dialog if unchecking "Remember Me"
    if (!newRememberMe) {
      const confirmation = window.confirm("¿Seguro que deseas desactivar la opción 'Recordarme'? Esto eliminará tus credenciales guardadas.");
      if (!confirmation) {
        // If user cancels, re-enable "Remember Me"
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
            disabled={!fieldsAreNotEmpty}
          />
          <label htmlFor="rememberMe">Recordarme</label>
        </div>
        <div className='mb-3'>
          {/* <a href="/reset">¿Olvidaste tu contraseña?</a> */}
        </div>
        <div className="button__group">
          <button type="submit" className="button__login" disabled={isSubmitting}>
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
          {/* <button type="button" className="button__register" onClick={() => navigateTo('/register')}>Registrarse</button> */}
        </div>
      </form>
    </div>
  );
};

export default Login;
