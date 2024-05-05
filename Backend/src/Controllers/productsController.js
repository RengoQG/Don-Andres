const connection = require('../db.js');
const Joi = require('joi');
const fs = require('fs');
const path = require('path');


// Controlador para obtener todas los productos
exports.obtenerProductos = async (req, res) => {
  try {
    // Consulta SQL para obtener todas los productos con el nombre de la categoría
    const query = `
      SELECT p.*, c.name AS nombre_categoria
      FROM productos p
      JOIN categorias c ON p.category_id = c.category_id
    `;

    // Ejecutar la consulta SQL
    const [results] = await connection.execute(query);

    // Verificar si se encontraron productos
    if (results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ error: 'No se encontraron los productos' });
    }
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.obtenerProductosID = async (req, res) => {
  const productId = req.params.id;
  try {
    // Validar que productId sea un entero
    if (isNaN(productId) || !Number.isInteger(parseInt(productId))) {
      return res.status(400).json({ error: 'ID de producto no válido' });
    }

    // Consulta SQL para obtener todas los productos con el nombre de la categoría
    const query = `
      SELECT * FROM productos WHERE product_id = ?
    `;

    // Ejecutar la consulta SQL
    const [results] = await connection.execute(query, [productId]);

    // Verificar si se encontraron productos
    if (results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ error: 'No se encontraron el producto' });
    }
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.obtenerNuevosProductos = async (req, res) => {
  try {
    // Consulta SQL preparada para obtener los últimos productos con el nombre de la categoría
    const query = `
    SELECT p.*, pc.name AS nombre_categoria 
    FROM productos p
    JOIN categorias pc ON p.category_id = pc.category_id
    ORDER BY p.creado DESC
    LIMIT 6;
    `;

    // Parámetros para la consulta preparada
    const limiteProductos = 6;

    // Ejecutar la consulta SQL preparada
    const [results] = await connection.execute(query, [limiteProductos]);

    // Verificar si se encontraron productos
    if (results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ error: 'No se encontraron los productos' });
    }
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
//CRUD
// Controlador para obtener todas los productos
exports.obtenerProducto = async (req, res) => {
  try {
    // Consulta SQL para obtener todas los productos con el nombre de la categoría
    const query = `
    SELECT p.*, c.name AS nombre_categoria
    FROM productos p
    JOIN categorias c ON p.category_id = c.category_id
    ORDER BY p.product_id ASC;
    `;

    // Ejecutar la consulta SQL
    const [results] = await connection.execute(query);

    // Verificar si se encontraron productos
    if (results.length > 0) {
      // Si se encontraron productos, devolver la respuesta con el estado 200
      return res.status(200).json(results);
    } else {
      // Si no se encontraron productos, devolver un error 404
      return res.status(404).json({ error: 'No se encontraron los productos' });
    }
  } catch (error) {
    // Si ocurre un error, devolver un error 500
    console.error('Error al obtener los productos:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.agregarProducto = async (req, res) => {
  // Extraer los datos del cuerpo de la solicitud
  if (req.fileValidationError) {
    // Si hay un error de validación del archivo, envía un mensaje de error al cliente
    return res.status(400).json({ error: req.fileValidationError });
  }
  const {
    name,
    category_id,
    description,
    price,
    codigo,
    unidad,
    cantidad,
    infinito,
    precio_compra,
    compra_x_cantidad,
    precio_venta,
    venta_x_cantidad,
    descuento,
    impuesto1,
    impuesto2,
    impuesto3,
    proveedor,
    estante,
    referencia,
    personalizado1,
    personalizado2,
    usuario,
    minimo_stock,
    fecha_vencimiento,
    color,
    usos_recomendados,
    numero_teclas,
    tamano,
    marca,
    compatibilidad,
    tecnologia,
    caracteristicas
  } = req.body;

  try {

    // Verificar si la categoría existe
    const [categoryResults] = await connection.execute('SELECT category_id FROM categorias WHERE category_id = ?', [category_id]);

    if (categoryResults.length === 0) {
       res.status(400).json({ error: 'La categoría especificada no existe' });
       // Eliminar la imagen si ocurrió un error al agregar el producto
      if (req.file && req.file.path) {
        fs.unlinkSync(req.file.path);
    }
    return;
    }

    // Validación de campos requeridos
    if (!name || !category_id || !description || !price || !codigo || !cantidad) {
       res.status(400).json({ error: 'Todos los campos son obligatorios' });
       // Eliminar la imagen si ocurrió un error al agregar el producto
      if (req.file && req.file.path) {
        fs.unlinkSync(req.file.path);
    }
    return;
    }

    // Validar si el código del producto ya existe
    const [existingProduct] = await connection.execute('SELECT product_id FROM productos WHERE codigo = ?', [codigo]);
    if (existingProduct.length > 0) {
      res.status(400).json({ error: 'El código del producto ya existe' });
      // Eliminar la imagen si ocurrió un error al agregar el producto
      if (req.file && req.file.path) {
        fs.unlinkSync(req.file.path);
      }
      return;
    }

    // Insertar el nuevo producto en la base de datos
    const insertQuery = `
          INSERT INTO productos (name, description, price, category_id, codigo, unidad, cantidad, infinito, image_url, precio_compra, compra_x_cantidad, precio_venta, venta_x_cantidad, descuento, impuesto1, impuesto2, impuesto3, proveedor, estante, referencia, personalizado1, personalizado2, usuario, creado, minimo_stock, fecha_vencimiento, color, usos_recomendados, numero_teclas, tamano, marca, compatibilidad, tecnologia, caracteristicas)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
    const [insertResults] = await connection.execute(insertQuery, [
      name,
      description,
      price,
      categoryResults[0].category_id,
      codigo,
      unidad,
      cantidad,
      infinito,
      req.file.filename, // Utiliza el nombre del archivo directamente aquí
      precio_compra,
      compra_x_cantidad,
      precio_venta,
      venta_x_cantidad,
      descuento,
      impuesto1,
      impuesto2,
      impuesto3,
      proveedor,
      estante,
      referencia,
      personalizado1,
      personalizado2,
      usuario,
      new Date(), // Utiliza la fecha actual del servidor
      minimo_stock,
      fecha_vencimiento,
      color,
      usos_recomendados,
      numero_teclas,
      tamano,
      marca,
      compatibilidad,
      tecnologia,
      caracteristicas
    ]);

    // Verificar si se insertó el producto correctamente
    if (insertResults.affectedRows > 0) {
      return res.status(201).json({ message: 'Producto agregado exitosamente' });
  } else {
      return res.status(500).json({ error: 'Error al agregar el producto' });
  }
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    // Eliminar la imagen si ocurrió un error al agregar el producto
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para agregar un detalle de producto
exports.agregarDetalleProducto = async (req, res) => {
  try {
    const { product_id, detalle_texto } = req.body; // Suponiendo que estos valores provienen del cuerpo de la solicitud

    // Verificar si los campos requeridos están presentes
    if (!product_id || !detalle_texto) {
      return res.status(400).json({ error: 'Se requieren el product_id y el detalle_texto' });
    }

    // Consulta SQL para agregar el detalle del producto
    const query = `
      INSERT INTO producto_detalle (product_id, detalle_texto)
      VALUES (?, ?)
    `;

    // Ejecutar la consulta SQL
    const [result] = await connection.execute(query, [product_id, detalle_texto]);

    // Verificar si se agregó el detalle del producto
    if (result.affectedRows > 0) {
      return res.status(201).json({ message: 'Detalle de producto agregado exitosamente' });
    } else {
      return res.status(500).json({ error: 'No se pudo agregar el detalle del producto' });
    }
  } catch (error) {
    console.error('Error al agregar el detalle del producto:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};











