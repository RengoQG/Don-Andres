import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditarProducto = ({ setShowTable, setBotonTexto, setShowEditarProducto, productId, actualizarProductos }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    category_id: '',
    codigo: '',
    price: '',
    imagen: null,
    stock: '',
    descripcion: '',
    atributos: []
  });
  const [detalles, setDetalles] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState('');
  const [productDetails, setProductDetails] = useState([]);

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
          atributos: response.data.atributos ?? []
        });
      } catch (error) {
        setError(error.response?.data?.error || 'Error al obtener el producto');
      }
    };
    obtenerProducto();

    const obtenerDetalles = async () => {
      try {
        const response = await axios.get(`https://horizonsolutions.com.co:3000/listDetals/listDetals/${productId}`);
        setDetalles(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
      }
    };
    obtenerDetalles();

    const obtenerProductDetails = async () => {
      try {
        const response = await axios.get(`https://horizonsolutions.com.co:3000/listProductDetails/listProductDetails/${productId}`);
        setProductDetails(response.data);
      } catch (error) {
        console.error('Error al obtener la información adicional del producto:', error);
      }
    };
    obtenerProductDetails();
  }, [id, productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct({
      ...product,
      imagen: file
    });
  };

  const handleDetailChange = (index, e) => {
    const { name, value } = e.target;
    const newDetalles = [...detalles];
    newDetalles[index][name] = value;
    setDetalles(newDetalles);
  };

  const handleProductDetailChange = (index, e) => {
    const { name, value } = e.target;
    const newProductDetails = [...productDetails];
    newProductDetails[index][name] = value;
    setProductDetails(newProductDetails);
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

      await axios.put(`https://horizonsolutions.com.co:3000/actualizarProducto/actualizarProducto/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Actualizar los detalles del producto
      await Promise.all(
        detalles.map(async (detalle) => {
          await axios.put(`https://horizonsolutions.com.co:3000/actualizarInfoProducto/actualizarProductoInfo/${productId}/${detalle.id}`, {
            atributo_nombre: detalle.atributo_nombre,
            atributo_valor: detalle.atributo_valor
          });
        })
      );

      // Actualizar la información adicional del producto
      await Promise.all(
        productDetails.map(async (detail) => {
          await axios.put(`https://horizonsolutions.com.co:3000/actualizarDestalleProducto/actualizarProductoDetalle/${productId}/${detail.detalle_id}`, {
            detalle_texto: detail.detalle_texto
          });
        })
      );






      setBotonTexto('Agregar producto');
      // toast.success('Producto y detalles actualizados exitosamente');
      setShowTable(true);
      setShowEditarProducto(false);
      actualizarProductos();



    } catch (error) {
      setError(error.response?.data?.error || 'Error al actualizar el producto');
      toast.error('Error al actualizar el producto');
    }
  };

  return (
    <div>
      <h2>Actualizar Producto</h2>
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
            <p>Esta imagen tiene la resolución de 420x350</p>
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
            style={{ width: '100%', height: '150px' }}
          />
        </div>
        <div>
          <h3>Detalles del Producto:</h3>
          {detalles.map((detalle, index) => (
            <div key={index}>
              <label>Atributo Nombre:</label>
              <input
                type="text"
                name="atributo_nombre"
                value={detalle.atributo_nombre}
                onChange={(e) => handleDetailChange(index, e)}
              />
              <label>Atributo Valor:</label>
              <input
                type="text"
                name="atributo_valor"
                value={detalle.atributo_valor}
                onChange={(e) => handleDetailChange(index, e)}
              />
            </div>
          ))}
        </div>
        <div>
          <h3>Información Adicional del Producto:</h3>
          {productDetails.map((detail, index) => (
            detail.detalle_texto.trim() !== '' && ( // Verifica que detalle_texto no esté vacío
              <div key={detail.detalle_id}>
                {/* <label>Detalle ID:</label>
                <input
                    type="text"
                    name="detalle_id"
                    value={detail.detalle_id}
                    readOnly
                /> */}
                <label>Texto del Detalle:</label>
                <textarea
                  name="detalle_texto"
                  value={detail.detalle_texto}
                  onChange={(e) => handleProductDetailChange(index, e)}
                  rows={4} // Ajusta el número de filas según sea necesario
                  style={{ width: '100%' }} // Establece el ancho al 100%
                />
              </div>
            )
          ))}
        </div>
        <button type="submit">Actualizar Producto</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditarProducto;
