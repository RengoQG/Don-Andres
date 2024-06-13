import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditarProducto = ({ setShowTable, productId, showEditarProducto, actualizarProductos }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    category_id: '',
    codigo: '',
    price: '',
    imagen: null,
    stock: '',
    descripcion: '',
    atributos: [],
    detalles: []
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await axios.get('https://horizonsolutions.com.co:3000/categoria/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    }

    fetchCategorias();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct({
      ...product,
      imagen: file
    });
  };

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await axios.get(`https://horizonsolutions.com.co:3000/obtenerProductoId/obtenerProductoId/${productId}`);
        setProduct({
          name: response.data.name ?? '',
          category_id: response.data.category_id ?? '',
          codigo: response.data.codigo ?? '',
          price: response.data.price ?? '',
          imagen: response.data.image_url ?? '',
          stock: response.data.stock ?? '',
          descripcion: response.data.descripcion ?? '',
          atributos: response.data.atributos ?? [],
          detalles: response.data.detalles ?? []
        });
      } catch (error) {
        setError(error.response?.data?.error || 'Error al obtener el producto');
      }
    };
    obtenerProducto();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('category_id', product.category_id);
      formData.append('codigo', product.codigo);
      formData.append('price', product.price);
      formData.append('imagen', product.imagen);
      formData.append('stock', product.stock);
      formData.append('descripcion', product.descripcion);

      const response = await axios.put(`https://horizonsolutions.com.co:3000/actualizarProducto/actualizarProducto/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data.message);
      setError('');
      actualizarProductos();
    } catch (error) {
      setError(error.response?.data?.error || 'Error al actualizar el producto');
      setMessage('');
      toast.error('Error al actualizar el producto');
    }
  };

  return (
    <div>
      <h2>Actualizar Producto</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Categoría:</label>
          <select
            name="category_id"
            value={product.category_id}
            onChange={handleChange}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.category_id} value={categoria.category_id}>
                {categoria.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Código:</label>
          <input
            type="text"
            name="codigo"
            value={product.codigo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Seleccionar Imagen:</label>
          <input
            type="file"
            name="imagen"
            onChange={handleFileChange}
          />
        </div>
        {product.imagen && (
          <div>
            <label>Imagen del Producto:</label>
            <img
              src={`../../../public/images/Productos/${product.imagen}`}
              alt="Imagen del Producto"
              style={{ width: '200px', height: 'auto' }}
            />
          </div>
        )}
        <div>
          <label>Stock:</label>
          <input
            type="text"
            name="stock"
            value={product.stock}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={product.descripcion}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Actualizar Producto</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditarProducto;
