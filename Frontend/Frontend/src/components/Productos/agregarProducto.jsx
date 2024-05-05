import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../EstilosComponentes/agregarProducto.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AgregarProducto = ({ setShowTable }) => {
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

    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        async function fetchCategorias() {
            try {
                const response = await axios.get('http://localhost:6001/categoria/categorias');
                setCategorias(response.data);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        }

        fetchCategorias();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataWithFile = new FormData();
            formDataWithFile.append('imagen', file);
            for (const key in formData) {
                formDataWithFile.append(key, formData[key]);
            }

            const response = await axios.post('http://localhost:6001/agregarProducto/agregarProducto', formDataWithFile, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data); // Maneja la respuesta del servidor según lo necesites
            toast.success('Agregado correctamente.');
            setTimeout(() => {
                setShowTable(true); // Mostrar la tabla después de agregar el producto

            }, 3000);
        } catch (error) {
            console.error('Error al agregar el producto:', error);
            toast.error('Error al agregar el producto')
            setError('Error al agregar el producto');
        }
    };

    return (
        <div class="container">
            <ToastContainer />
            <h2>Agregar Producto</h2>
            <form onSubmit={handleSubmit} className='form-control'>
                {/* Campos existentes */}
                <div class="form-row">
                    <div class="form-group">
                        <label for="name">Nombre:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div class="form-group">
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
                    <div class="form-group">
                        <label>
                            Descripción:
                            <input type="text" name="description" value={formData.description} onChange={handleChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Precio:
                            <input type="text" name="price" value={formData.price} onChange={handleChange} />
                        </label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>
                            Unidad:
                            <input type="text" name="unidad" value={formData.unidad} onChange={handleChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Cantidad:
                            <input type="text" name="cantidad" value={formData.cantidad} onChange={handleChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Infinito:
                            <select name="infinito" value={formData.infinito} onChange={handleChange}>
                                <option value="1">Sí</option>
                                <option value="0">No</option>
                            </select>
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Precio de compra:
                            <input type="text" name="precio_compra" value={formData.precio_compra} onChange={handleChange} />
                        </label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>
                            Compra por cantidad:
                            <input type="text" name="compra_x_cantidad" value={formData.compra_x_cantidad} onChange={handleChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Precio de venta:
                            <input type="text" name="precio_venta" value={formData.precio_venta} onChange={handleChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            <label>
                                Codigo:
                                <input type="text" name="codigo" value={formData.codigo} onChange={handleChange} />
                            </label>
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Venta por cantidad:
                            <input type="text" name="venta_x_cantidad" value={formData.venta_x_cantidad} onChange={handleChange} />
                        </label>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>
                            Descuento:
                            <input type="text" name="descuento" value={formData.descuento} onChange={handleChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Impuesto 1:
                            <input type="text" name="impuesto1" value={formData.impuesto1} onChange={handleChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Impuesto 2:
                            <input type="text" name="impuesto2" value={formData.impuesto2} onChange={handleChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Impuesto 3:
                            <input type="text" name="impuesto3" value={formData.impuesto3} onChange={handleChange} />
                        </label>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>
                            Proveedor:
                            <input type="text" name="proveedor" value={formData.proveedor} onChange={handleChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Estante:
                            <input type="text" name="estante" value={formData.estante} onChange={handleChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Referencia:
                            <input type="text" name="referencia" value={formData.referencia} onChange={handleChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Personalizado 1:
                            <input type="text" name="personalizado1" value={formData.personalizado1} onChange={handleChange} />
                        </label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>
                            Personalizado 2:
                            <input type="text" name="personalizado2" value={formData.personalizado2} onChange={handleChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Usuario:
                            <input type="text" name="usuario" value={formData.usuario} onChange={handleChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Mínimo de stock:
                            <input type="text" name="minimo_stock" value={formData.minimo_stock} onChange={handleChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Fecha de vencimiento:
                            <input type="date" name="fecha_vencimiento" value={formData.fecha_vencimiento} onChange={handleChange} />
                        </label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>
                            Color:
                            <input type="text" name="color" value={formData.color} onChange={handleChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Usos recomendados:
                            <input type="text" name="usos_recomendados" value={formData.usos_recomendados} onChange={handleChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Número de teclas:
                            <input type="text" name="numero_teclas" value={formData.numero_teclas} onChange={handleChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Tamaño:
                            <input type="text" name="tamano" value={formData.tamano} onChange={handleChange} />
                        </label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>
                            Marca:
                            <input type="text" name="marca" value={formData.marca} onChange={handleChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Compatibilidad:
                            <input type="text" name="compatibilidad" value={formData.compatibilidad} onChange={handleChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Tecnología:
                            <input type="text" name="tecnologia" value={formData.tecnologia} onChange={handleChange} />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            Características:
                            <input type="text" name="caracteristicas" value={formData.caracteristicas} onChange={handleChange} />
                        </label>
                    </div>
                </div>
                {/* Fin de campos adicionales */}
                <div class="form-group">
                    <label>
                        Imagen:
                        <input type="file" onChange={handleFileChange} />
                    </label>
                </div>
                <button type="submit">Agregar Producto</button>
            </form>
            <br />
            <h4>Puedes agregar detalles extra</h4>
            <div>
                <form action="">
                    <label htmlFor="">HOLA</label>
                </form>
            </div>
        </div>

    );



};

export default AgregarProducto;
