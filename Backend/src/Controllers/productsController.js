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
//Controlador para agregar un producto
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
//Controlador para actualizar un producto 
exports.actualizarProducto = async (req, res) => {
  try {
    // Extraer el ID del producto de los parámetros de la solicitud
    const { id } = req.params;

    // Extraer los datos actualizados del cuerpo de la solicitud
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

    // Verificar si el producto existe en la base de datos
    const [existingProduct] = await connection.execute('SELECT * FROM productos WHERE product_id = ?', [id]);
    if (existingProduct.length === 0) {
      return res.status(404).json({ error: 'El producto no existe' });
    }

    // Verificar si la categoría existe
    let categoryId = existingProduct[0].category_id;
    if (category_id !== undefined && category_id !== existingProduct[0].category_id) {
      const [categoryResults] = await connection.execute('SELECT category_id FROM categorias WHERE category_id = ?', [category_id]);
      if (categoryResults.length === 0) {
        return res.status(400).json({ error: 'La categoría especificada no existe' });
      }
      categoryId = categoryResults[0].category_id;
    }

    // Verificar si se proporcionó una nueva imagen
    let imageUrl = existingProduct[0].image_url;
    if (req.file) {
      imageUrl = req.file.filename;
    }

    // Construir el objeto de valores actualizados
    const updatedValues = {
      name: name !== undefined ? name : existingProduct[0].name,
      category_id: categoryId,
      description: description !== undefined ? description : existingProduct[0].description,
      price: price !== undefined ? price : existingProduct[0].price,
      codigo: codigo !== undefined ? codigo : existingProduct[0].codigo,
      unidad: unidad !== undefined ? unidad : existingProduct[0].unidad,
      cantidad: cantidad !== undefined ? cantidad : existingProduct[0].cantidad,
      infinito: infinito !== undefined ? infinito : existingProduct[0].infinito,
      precio_compra: precio_compra !== undefined ? precio_compra : existingProduct[0].precio_compra,
      compra_x_cantidad: compra_x_cantidad !== undefined ? compra_x_cantidad : existingProduct[0].compra_x_cantidad,
      precio_venta: precio_venta !== undefined ? precio_venta : existingProduct[0].precio_venta,
      venta_x_cantidad: venta_x_cantidad !== undefined ? venta_x_cantidad : existingProduct[0].venta_x_cantidad,
      descuento: descuento !== undefined ? descuento : existingProduct[0].descuento,
      impuesto1: impuesto1 !== undefined ? impuesto1 : existingProduct[0].impuesto1,
      impuesto2: impuesto2 !== undefined ? impuesto2 : existingProduct[0].impuesto2,
      impuesto3: impuesto3 !== undefined ? impuesto3 : existingProduct[0].impuesto3,
      proveedor: proveedor !== undefined ? proveedor : existingProduct[0].proveedor,
      estante: estante !== undefined ? estante : existingProduct[0].estante,
      referencia: referencia !== undefined ? referencia : existingProduct[0].referencia,
      personalizado1: personalizado1 !== undefined ? personalizado1 : existingProduct[0].personalizado1,
      personalizado2: personalizado2 !== undefined ? personalizado2 : existingProduct[0].personalizado2,
      usuario: usuario !== undefined ? usuario : existingProduct[0].usuario,
      minimo_stock: minimo_stock !== undefined ? minimo_stock : existingProduct[0].minimo_stock,
      fecha_vencimiento: fecha_vencimiento !== undefined ? fecha_vencimiento : existingProduct[0].fecha_vencimiento,
      color: color !== undefined ? color : existingProduct[0].color,
      usos_recomendados: usos_recomendados !== undefined ? usos_recomendados : existingProduct[0].usos_recomendados,
      numero_teclas: numero_teclas !== undefined ? numero_teclas : existingProduct[0].numero_teclas,
      tamano: tamano !== undefined ? tamano : existingProduct[0].tamano,
      marca: marca !== undefined ? marca : existingProduct[0].marca,
      compatibilidad: compatibilidad !== undefined ? compatibilidad : existingProduct[0].compatibilidad,
      tecnologia: tecnologia !== undefined ? tecnologia : existingProduct[0].tecnologia,
      caracteristicas: caracteristicas !== undefined ? caracteristicas : existingProduct[0].caracteristicas
    };

    // Actualizar el producto en la base de datos
    const updateQuery = `
      UPDATE productos 
      SET 
        name = ?, 
        description = ?, 
        price = ?, 
        category_id = ?, 
        codigo = ?, 
        unidad = ?, 
        cantidad = ?, 
        infinito = ?, 
        image_url = ?, 
        precio_compra = ?, 
        compra_x_cantidad = ?, 
        precio_venta = ?, 
        venta_x_cantidad = ?, 
        descuento = ?, 
        impuesto1 = ?, 
        impuesto2 = ?, 
        impuesto3 = ?, 
        proveedor = ?, 
        estante = ?, 
        referencia = ?, 
        personalizado1 = ?, 
        personalizado2 = ?, 
        usuario = ?, 
        minimo_stock = ?, 
        fecha_vencimiento = ?, 
        color = ?, 
        usos_recomendados = ?, 
        numero_teclas = ?, 
        tamano = ?, 
        marca = ?, 
        compatibilidad = ?, 
        tecnologia = ?, 
        caracteristicas = ?
      WHERE product_id = ?
    `;
    const [updateResults] = await connection.execute(updateQuery, [
      updatedValues.name,
      updatedValues.description,
      updatedValues.price,
      updatedValues.category_id,
      updatedValues.codigo,
      updatedValues.unidad,
      updatedValues.cantidad,
      updatedValues.infinito,
      imageUrl,
      updatedValues.precio_compra,
      updatedValues.compra_x_cantidad,
      updatedValues.precio_venta,
      updatedValues.venta_x_cantidad,
      updatedValues.descuento,
      updatedValues.impuesto1,
      updatedValues.impuesto2,
      updatedValues.impuesto3,
      updatedValues.proveedor,
      updatedValues.estante,
      updatedValues.referencia,
      updatedValues.personalizado1,
      updatedValues.personalizado2,
      updatedValues.usuario,
      updatedValues.minimo_stock,
      updatedValues.fecha_vencimiento,
      updatedValues.color,
      updatedValues.usos_recomendados,
      updatedValues.numero_teclas,
      updatedValues.tamano,
      updatedValues.marca,
      updatedValues.compatibilidad,
      updatedValues.tecnologia,
      updatedValues.caracteristicas,
      id
    ]);

    // Verificar si se actualizó el producto correctamente
    if (updateResults.affectedRows > 0) {
      return res.status(200).json({ message: 'Producto actualizado exitosamente' });
    } else {
      return res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
//Obtener producto por id
exports.obtenerProductopp = async (req, res) => {
  try {
    // Extraer el ID del producto de los parámetros de la solicitud
    const { id } = req.params;

    // Consulta SQL para obtener el producto por su ID
    const query = 'SELECT * FROM productos WHERE product_id = ?';

    // Ejecutar la consulta SQL
    const [result] = await connection.execute(query, [id]);

    // Verificar si se encontró el producto
    if (result.length > 0) {
      return res.status(200).json(result[0]); // Devolver el primer resultado encontrado
    } else {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
//Eliminar producto
exports.eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta SQL para verificar si existe el producto
    const checkProductQuery = 'SELECT image_url FROM productos WHERE product_id = ?';
    const deleteQuery = 'DELETE FROM productos WHERE product_id = ?';
    const deleteDetailsQuery = 'DELETE FROM producto_detalle WHERE product_id = ?';

    // Verificar si el producto existe y obtener la URL de la imagen
    const [productResult] = await connection.execute(checkProductQuery, [id]);

    if (productResult.length === 0) {
      return res.status(404).json({ error: 'El producto no existe' });
    }

    const imageUrl = productResult[0].image_url;

    // Si la URL de la imagen está vacía, eliminar la información de la base de datos y devolver un mensaje
    if (!imageUrl) {
      await connection.execute(deleteDetailsQuery, [id]);
      await connection.execute(deleteQuery, [id]);
      return res.json({ message: 'Producto y sus detalles eliminados correctamente (sin imagen)' });
    }

    // Construir la ruta completa del archivo de imagen
    const imagePath = path.join(__dirname, '../../../Frontend/Frontend/public/images/Productos', imageUrl);

    // Verificar si el archivo de imagen existe en la ruta especificada
    fs.access(imagePath, fs.constants.F_OK, async (err) => {
      if (err) {
        console.error('La imagen no existe en la ruta especificada');
        // Eliminar la información de la base de datos y devolver un mensaje
        await connection.execute(deleteDetailsQuery, [id]);
        await connection.execute(deleteQuery, [id]);
        return res.json({ message: 'Producto y sus detalles eliminados correctamente (imagen no encontrada)' });
      } else {
        // Si la imagen existe, eliminarla primero
        fs.unlink(imagePath, async (err) => {
          if (err) {
            console.error('Error al eliminar la imagen:', err);
            return res.status(500).json({ error: 'Error interno al eliminar la imagen' });
          } else {
            console.log('Imagen eliminada correctamente');
            // Luego eliminar la información de la base de datos y devolver un mensaje
            await connection.execute(deleteDetailsQuery, [id]);
            await connection.execute(deleteQuery, [id]);
            return res.json({ message: 'Producto y sus detalles eliminados correctamente' });
          }
        });
      }
    });

  } catch (error) {
    console.error('Error al eliminar el producto y sus detalles:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
















