import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductosFetcher = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriasResponse, productosResponse] = await Promise.all([
          axios.get('https://horizonsolutions.com.co:3000/categoria/categorias'),
          axios.get('https://horizonsolutions.com.co:3000/obtenerProducto/listarProductos')
          // axios.get('http://localhost:3000/producto/products')
        ]);

        setCategorias(categoriasResponse.data);
        setProductos(productosResponse.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();

    // Limpieza al desmontar el componente (si es necesario)
    return () => {
      // Cualquier limpieza que necesites realizar al desmontar el componente
    };
  }, []);
  return (
    <div>
       {React.Children.map(children, child =>
        React.cloneElement(child, { categorias, productos })
      )}
    </div>
  );
};

export default ProductosFetcher;
