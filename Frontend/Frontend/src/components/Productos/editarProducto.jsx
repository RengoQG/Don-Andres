import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditarProducto = ({ setShowTable, productId, actualizarProductos }) => {
    // const { id } = useParams(); 
    const [formData, setFormData] = useState({
        name: '',
        category_id: '',
        description: '',
        price: '',
        codigo: '',
        unidad: '',
        cantidad: '',
        // Agrega los campos adicionales aquí
        infinito: 0,
        precio_compra: '',
        compra_x_cantidad: '',
        precio_venta: '',
        venta_x_cantidad: '',
        descuento: '',
        impuesto1: '',
        impuesto2: '',
        impuesto3: '',
        proveedor: '',
        estante: '',
        referencia: '',
        personalizado1: '',
        personalizado2: '',
        usuario: '',
        minimo_stock: '',
        fecha_vencimiento: '',
        color: '',
        usos_recomendados: '',
        numero_teclas: '',
        tamano: '',
        marca: '',
        compatibilidad: '',
        tecnologia: '',
        caracteristicas: ''
    });

    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState('');

    if (actualizarProductos) {
        actualizarProductos();
      }

    useEffect(() => {
        async function fetchProducto() {
            try {
                const response = await axios.get(`http://localhost:6001/obtenerProductoId/obtenerProductoId/${productId}`);
                const producto = response.data;
        
                // Formatear la fecha de vencimiento si existe
                if (producto.fecha_vencimiento) {
                    // Obtener solo la parte de la fecha (sin la hora)
                    const fechaVencimientoFormateada = new Date(producto.fecha_vencimiento).toISOString().split('T')[0];
                    producto.fecha_vencimiento = fechaVencimientoFormateada;
                }
        
                setFormData(producto);
                console.log(producto);
            } catch (error) {
                console.error('Error al obtener el producto:', error);
                setError('Error al obtener el producto');
            }
        }
        

        async function fetchCategorias() {
            try {
                const response = await axios.get('http://localhost:6001/categoria/categorias');
                setCategorias(response.data);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
                setError('Error al obtener las categorías');
            }
        }

        fetchProducto();
        fetchCategorias();
    }, [productId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validar que la fecha de vencimiento no esté vacía
        if (!formData.fecha_vencimiento) {
            toast.error('Por favor ingresa la fecha de vencimiento.');
            return;
        }
    
        // Formatear la fecha de vencimiento antes de enviarla al backend
        const formattedFormData = {
            ...formData,
            fecha_vencimiento: formData.fecha_vencimiento ? formData.fecha_vencimiento.slice(0, 10) : ''
        };
    
        try {
            const response = await axios.put(`http://localhost:6001/actualizarProducto/actualizarProducto/${productId}`, formattedFormData);
                 console.log(response.data);
                 if(response.data.status === 200){
                    toast.success('Actualizado correctamente.');
                    setTimeout(() => {
                       setShowTable(true);
                    }, 2000);
                 }
                
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            toast.error('Error al actualizar el producto');
        }
    };
        
    return (
        <div className="container">
            <ToastContainer />
            <h2>Agregar Producto</h2>
            <form onSubmit={handleSubmit} className='form-control'>
                {/* Campos existentes */}
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            Nombre:
                            <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Categoría:
                            <select name="category_id" value={formData.category_id} onChange={handleChange}>
                                {categorias.map((categoria) => (
                                    <option key={categoria.category_id} value={categoria.category_id}>
                                        {categoria.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Descripción:
                            <input type="text" name="description" value={formData.description} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Precio:
                            <input type="text" name="price" value={formData.price} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Unidad:
                            <input type="text" name="unidad" value={formData.unidad} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Cantidad:
                            <input type="text" name="cantidad" value={formData.cantidad} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Infinito:
                            <select name="infinito" value={formData.infinito} onChange={handleChange}>
                                <option value="1">Sí</option>
                                <option value="0">No</option>
                            </select>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Precio de compra:
                            <input type="text" name="precio_compra" value={formData.precio_compra} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Compra por cantidad:
                            <input type="text" name="compra_x_cantidad" value={formData.compra_x_cantidad} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Precio de venta:
                            <input type="text" name="precio_venta" value={formData.precio_venta} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Codigo:
                            <input type="text" name="codigo" value={formData.codigo} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Venta por cantidad:
                            <input type="text" name="venta_x_cantidad" value={formData.venta_x_cantidad} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Descuento:
                            <input type="text" name="descuento" value={formData.descuento} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Impuesto 1:
                            <input type="text" name="impuesto1" value={formData.impuesto1} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Impuesto 2:
                            <input type="text" name="impuesto2" value={formData.impuesto2} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Impuesto 3:
                            <input type="text" name="impuesto3" value={formData.impuesto3} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Proveedor:
                            <input type="text" name="proveedor" value={formData.proveedor} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Estante:
                            <input type="text" name="estante" value={formData.estante} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Referencia:
                            <input type="text" name="referencia" value={formData.referencia} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Personalizado 1:
                            <input type="text" name="personalizado1" value={formData.personalizado1} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Personalizado 2:
                            <input type="text" name="personalizado2" value={formData.personalizado2} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Usuario :
                            <input type="text" name="usuario" value={formData.usuario} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Mínimo de stock:
                            <input type="text" name="minimo_stock" value={formData.minimo_stock} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Fecha de vencimiento:
                            <input type="date" name="fecha_vencimiento" value={formData.fecha_vencimiento} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Color:
                            <input type="text" name="color" value={formData.color} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Usos recomendados:
                            <input type="text" name="usos_recomendados" value={formData.usos_recomendados} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Numero de teclas:
                            <input type="text" name="numero_teclas" value={formData.numero_teclas} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Tamaño:
                            <input type="text" name="tamano" value={formData.tamano} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Marca:
                            <input type="text" name="marca" value={formData.marca} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Compatibilidad:
                            <input type="text" name="compatibilidad" value={formData.compatibilidad} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Tecnología:
                            <input type="text" name="tecnologia" value={formData.tecnologia} onChange={handleChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Caracteristicas:
                            <input type="text" name="caracteristicas" value={formData.caracteristicas} onChange={handleChange} />
                        </label>
                    </div>
                </div>
                <div className="form-row">
                    {/* Agrega aquí los campos adicionales estáticos que desees */}
                </div>
                {/* Fin de campos adicionales */}
                <div className="form-group">
                    <label>
                        Imagen:
                        <input type="file" />
                    </label>
                </div>
                <button type="submit">Actualizar Producto</button>
            </form>
            <br />
           
        </div>
    );

};

export default EditarProducto;
