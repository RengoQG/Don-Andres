import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import Slider from './pages/Slider.jsx';
import Services from './pages/Services.jsx';
import Dream from './pages/Dream.jsx';
import People from './pages/People.jsx';
import Footer from './pages/Footer.jsx';
import Login from './components/Login.jsx';
import Cta from './pages/Cta.jsx';
import Inicio from './components/sesionIniciada.jsx';
import RegisterCategori from './components/Categorias/registerCategori.jsx';
import AuthGuard from './components/PrivateRoute.jsx';
import Register from './components/register.jsx';
import Reset from './components/resetPassword.jsx';
import UpdatePassword from './components/updatePassword.jsx';
import Wsp from './components/wspComponent.jsx';
import Producto from './components/Producto.jsx';
import Categories from './components/Categories.jsx';
import ProductosCta from './pages/Productos.jsx';
import ProductosFetch from './components/Products.jsx';
import Prueba2 from './components/prueba.jsx';
import Prueba3 from './components/Productos/agregarProducto.jsx';
import Buscar from './components/search.jsx';
import NewProduct from './components/ProductosNuevos.jsx';
import Contact from './components/Contactanos.jsx';
import Allproduct from './components/Allproducts.jsx';
import TotalResultadoo from './components/todosResultado.jsx';
import './index.css';

// Componente que contiene los tres componentes juntos
const MainContent = () => (
  <div>
    {/* <Prueba2 /> */}
    <App />
    <Slider />
    <ProductosCta />
    <Wsp />
    <Services />
    {/* <Dream /> */}
    {/* <People /> */}
    <NewProduct />
    {/* <Contact /> */}
    <Footer />
  </div>
);

const LoginMain = () => (
  <div>
    <App />
    <Login />
  </div>
);
const Prueba = () => (
  <div>
    <ProductosFetch>
      <Buscar />
    </ProductosFetch>
 
  </div>
);

const RegisterMain = () => (
  <div>
    <App />
    <Register />
    {/* <Footer /> */}
  </div>
);
const ProductMain = () => (
  
  <div>
    <App />
    <Producto />
    <Footer /> 
  </div>
);

const SesionMain = () => (
  <div>
    <Inicio />
    <App />
    <Producto />
    <Footer />
  </div>
);

const AllproductMain = () => (
  <div>
    {/* <Prueba2 /> */}
    <App />
    <Allproduct />
    <Footer />
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
          <Route path="/registerCategori" element={<AuthGuard><RegisterCategori /></AuthGuard>} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/reset-password" element={<UpdatePassword />} />
          <Route path="/categories" element={<Categories />} />
          {/* <Route path="/prueba" element={<Prueba />} /> */}
          <Route path="/prueba" element={<Prueba2 />} />
          <Route path="/prueba2" element={<Prueba3 />} />
          <Route path="/producto/" element={<ProductMain />} />
          <Route path="/Allproducto" element={<AllproductMain />} />
          <Route path="/total-resultados" element={<TotalResultadoo />} />
        </Routes>
      </Router>
  </React.StrictMode>
);
