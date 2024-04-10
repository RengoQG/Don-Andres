import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import Slider from './pages/Slider.jsx';
import Services from './pages/Services.jsx';
import Login from './components/Login.jsx';
import Cta from './pages/Cta.jsx';
import Productos from './pages/Productos.jsx';
import Inicio from './components/sesionIniciada.jsx';
import AuthGuard from './components/PrivateRoute.jsx';
import Register from './components/register.jsx';
import Reset from './components/resetPassword.jsx';
import UpdatePassword from './components/updatePassword.jsx';
import Wsp from './components/wspComponent.jsx';
import Search from './components/search.jsx';
import Categories from './components/Categories.jsx';
import './index.css';

// Componente que contiene los tres componentes juntos
const MainContent = () => (
  <div>
    <Search />
    <App />
    <Slider />
    <Services />
    <Wsp />
  </div>
);

const LoginMain = () => (
  <div>
    <App />
    <Login />
  </div>
);

const RegisterMain = () => (
  <div>
    <App />
    <Register />
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/login" element={<LoginMain />} />
          <Route path="/register" element={<RegisterMain />} />
          <Route path="/inicio" element={<AuthGuard><Inicio /></AuthGuard>} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/reset-password" element={<UpdatePassword />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Productos />} />
        </Routes>
      </Router>
  </React.StrictMode>
);
