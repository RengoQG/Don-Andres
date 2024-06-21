// TotalResultadosPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const TotalResultadosPage = () => {
  const location = useLocation();
  const productos = location.state ? location.state.productos : [];

  return (
    <div>
      <h1>Todos los Productos</h1>
      <ul>
        {productos.map((producto, index) => (
          <li key={index}>
            <div>
              <img src={`../../public/images/Productos/${producto.image_url}`} alt="Producto" />
              <span>{producto.name}</span>
              <span>${producto.price}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TotalResultadosPage;
