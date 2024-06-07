import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../EstilosComponentes/agregarProducto.css';

const AgregarProducto = ({ setShowTable, setShowAgregarProducto, actualizarProductos, setBotonTexto }) => {
    const [name, setName] = useState('');
    const [codigo, setCodigo] = useState('');
    const [atributos, setAtributos] = useState([]);
    const [category_id, setCategoryId] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState(null);
    const [error, setError] = useState('');
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        async function fetchCategorias() {
            try {
                const response = await axios.get('http://localhost:3000/categoria/categorias');
                setCategorias(response.data);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        }

        fetchCategorias();
    }, []);

    const handleAtributosChange = (e, index) => {
        const { name, value } = e.target;
        const newAtributos = [...atributos];
        newAtributos[index] = { ...newAtributos[index], [name]: value };
        setAtributos(newAtributos);
    };

    const handleAddAtributo = () => {
        setAtributos([...atributos, { atributo_nombre: '', atributo_valor: '' }]);
    };

    const handleRemoveAtributo = (index) => {
        const newAtributos = [...atributos];
        newAtributos.splice(index, 1);
        setAtributos(newAtributos);
    };

    const handleImageChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('codigo', codigo);
        formData.append('category_id', category_id);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('descripcion', descripcion);
        formData.append('imagen', imagen);

        atributos.forEach((atributo, index) => {
            formData.append(`atributos[${index}][atributo_nombre]`, atributo.atributo_nombre);
            formData.append(`atributos[${index}][atributo_valor]`, atributo.atributo_valor);
        });

        try {
            const response = await axios.post('http://localhost:3000/agregarProducto/agregarProducto', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setShowTable(true);
            setShowAgregarProducto(false);
            actualizarProductos();
            setBotonTexto('Agregar producto');
            // Limpiar el formulario después de agregar el producto
            setName('');
            setCodigo('');
            setAtributos([]);
            setCategoryId('');
            setPrice('');
            setStock('');
            setDescripcion('');
            setImagen(null);
            setError('');
        } catch (error) {
            toast.error('Error al agregar el producto:', error);
            setError('Error al agregar el producto. Por favor, revisa los campos y vuelve a intentarlo.');
        }
    };

    return (
        <div className="add-product-container">
            <h2>Agregar Producto</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div>
                        <label className="required-label">
                            Nombre:
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="required-input" required />
                        </label>
                    </div>
                    <div>
                        <label className="required-label">
                            Código:
                            <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} className="required-input" required />
                        </label>
                    </div>
                    <div>
                        <label className="required-label">
                            Atributos:
                            {atributos.map((atributo, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        name="atributo_nombre"
                                        placeholder="Nombre del atributo"
                                        value={atributo.atributo_nombre}
                                        onChange={(e) => handleAtributosChange(e, index)}
                                        className="required-input"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="atributo_valor"
                                        placeholder="Valor del atributo"
                                        value={atributo.atributo_valor}
                                        onChange={(e) => handleAtributosChange(e, index)}
                                        className="required-input"
                                        required
                                    />
                                    <button type="button" onClick={() => handleRemoveAtributo(index)}>Eliminar</button>
                                </div>
                            ))}
                            <button type="button" onClick={handleAddAtributo}>Agregar Atributo</button>
                        </label>
                    </div>
                    <div>
                        <label className="required-label">
                            Categoría:
                            <select value={category_id} onChange={(e) => setCategoryId(e.target.value)} className="required-input" required>
                                <option value="">Selecciona una categoría</option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.category_id} value={categoria.category_id}>{categoria.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label className="required-label">
                            Precio:
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="required-input" required />
                        </label>
                    </div>
                    <div>
                        <label className="required-label">
                            Stock:
                            <input type="text" value={stock} onChange={(e) => setStock(e.target.value)} className="required-input" required />
                        </label>
                    </div>
                    <div>
                        <label className="required-label">
                            Descripción:
                            <textarea
                                name="descripcion"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                className="required-input"
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label className="required-label">
                            Imagen:
                            <input type="file" accept="image/*" onChange={handleImageChange} className="required-input" required />
                        </label>
                    </div>
                    <div>
                        <button type="submit">Agregar Producto</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AgregarProducto;
