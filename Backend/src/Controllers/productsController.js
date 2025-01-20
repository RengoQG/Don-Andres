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
      SELECT * FROM producto WHERE product_id = ?
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
    FROM producto p
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
    SELECT 
    p.product_id,
    p.name,
    p.codigo,
    p.image_url,
    p.category_id,
    p.price,
    p.creado,
    p.stock,
    p.descripcion,
    c.name AS nombre_categoria,
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'nombre', pi.atributo_nombre,
                'valor', pi.atributo_valor
            )
        )
        FROM producto_info pi
        WHERE pi.product_id = p.product_id
    ) AS atributos,
    (
        SELECT JSON_ARRAYAGG(pd.detalle_texto)
        FROM producto_detalle pd
        WHERE pd.product_id = p.product_id
    ) AS detalles
FROM 
    producto p
    JOIN categorias c ON p.category_id = c.category_id
GROUP BY 
    p.product_id,
    p.name,
    p.codigo,
    p.image_url,
    p.category_id,
    p.price,
    p.creado,
    p.stock,
    c.name
ORDER BY 
    p.product_id ASC;
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
// Esquema de validación con Joi
const productSchema = Joi.object({
  name: Joi.string().required(),
  codigo: Joi.string().required(),
  atributos: Joi.alternatives().try(
    Joi.object({
      atributo_nombre: Joi.string().required(),
      atributo_valor: Joi.string().required()
    }),
    Joi.array().items(
      Joi.object({
        atributo_nombre: Joi.string().required(),
        atributo_valor: Joi.string().required()
      })
    )
  ).required(),
  category_id: Joi.number().integer().required(),
  price: Joi.number().required(),
  stock:Joi.number().integer().required(),
  descripcion:Joi.string().required()
});
exports.agregarProducto = async (req, res) => {
  if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError });
  }

  const { error, value } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  let { name, codigo, atributos, category_id, price, stock, descripcion } = value;

  // Eliminar espacios en blanco de los campos
  name = name.trim();
  codigo = codigo.trim();
  if (Array.isArray(atributos)) {
    atributos = atributos.map(atributo => ({
      atributo_nombre: atributo.atributo_nombre.trim(),
      atributo_valor: atributo.atributo_valor.trim()
    }));
  } else {
    atributos = [atributos.trim()]; // Convertir a un array si es un único valor y eliminar espacios
  }
  descripcion = descripcion.trim();

  let imageName;
  if (req.file) {
    imageName = req.file.filename; // Obtener solo el nombre del archivo
  } else {
    return res.status(400).json({ error: 'La imagen no se ha subido correctamente' });
  }

  try {
    // Validar si el código del producto ya existe
    const [existingProduct] = await connection.execute('SELECT product_id FROM producto WHERE codigo = ?', [codigo]);
    if (existingProduct.length > 0) {
      return res.status(400).json({ error: 'El código del producto ya existe' });
    }

    // Verificar si el category_id existe en la tabla categorias
    const [existingCategory] = await connection.execute('SELECT category_id FROM categorias WHERE category_id = ?', [category_id]);
    if (existingCategory.length === 0) {
      return res.status(400).json({ error: 'El category_id especificado no existe' });
    }

    // Insertar el nuevo producto en la tabla producto
    const insertProductQuery = `
      INSERT INTO producto (name, codigo, image_url, category_id, price, stock, descripcion)
      VALUES (?, ?, ?, ?, ? , ?, ?)
    `;
    const [insertProductResults] = await connection.execute(insertProductQuery, [name, codigo, imageName, category_id, price, stock, descripcion]);

    // Obtener el ID del producto recién insertado
    const productId = insertProductResults.insertId;

    // Insertar los atributos personalizados en la tabla producto_info
    const insertAttributesQuery = `
      INSERT INTO producto_info (product_id, atributo_nombre, atributo_valor)
      VALUES (?, ?, ?)
    `;
    for (const atributo of atributos) {
      await connection.execute(insertAttributesQuery, [productId, atributo.atributo_nombre, atributo.atributo_valor]);
    }

    return res.status(201).json({ message: 'Producto agregado exitosamente' });
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    // Eliminar la imagen si ocurrió un error al agregar el producto
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
//Controlador para agregar info al producto
exports.agregarInfoProducto = async (req, res) => {
  try {
      const { product_id, atributo_nombre, atributo_valor } = req.body;

      // Verificar si el producto existe
      const [productoExistente] = await connection.execute(
          'SELECT * FROM producto WHERE product_id = ?',
          [product_id]
      );

      if (productoExistente.length === 0) {
          return res.status(404).json({ error: 'Producto no encontrado' });
      }

      // Insertar la nueva información del producto
      const query = `
          INSERT INTO producto_info (product_id, atributo_nombre, atributo_valor)
          VALUES (?, ?, ?)
      `;

      const [result] = await connection.execute(query, [
          product_id,
          atributo_nombre,
          atributo_valor
      ]);

      if (result.affectedRows > 0) {
          return res.status(201).json({ message: 'Información del producto agregada correctamente' });
      } else {
          return res.status(500).json({ error: 'No se pudo agregar la información del producto' });
      }
  } catch (error) {
      console.error('Error al agregar información del producto:', error);
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
      codigo,
      price,
      descripcion,
      stock
    } = req.body;

    // Eliminar espacios en blanco de los campos
    const finalName = name !== undefined ? name.trim() : undefined;
    const finalCodigo = codigo !== undefined ? codigo.trim() : undefined;
    const finalDescripcion = descripcion !== undefined ? descripcion.trim() : undefined;

    let finalImageUrl = null;
    // Verificar si se proporcionó una nueva imagen
    if (req.file) {
      // La imagen se subió correctamente, guardamos el nombre en finalImageUrl
      finalImageUrl = req.file.filename;
    }

    // Verificar si el producto existe en la base de datos
    const [existingProduct] = await connection.execute('SELECT * FROM producto WHERE product_id = ?', [id]);
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

    // Verificar y asignar valores por defecto si no se proporcionan
    const finalFinalName = finalName !== undefined ? finalName : existingProduct[0].name;
    const finalFinalCodigo = finalCodigo !== undefined ? finalCodigo : existingProduct[0].codigo;
    const finalFinalPrice = price !== undefined ? price : existingProduct[0].price;
    const finalFinalStock = stock !== undefined ? stock : existingProduct[0].stock;
    const finalFinalDescripcion = finalDescripcion !== undefined ? finalDescripcion : existingProduct[0].descripcion;

    // Actualizar el producto en la base de datos
    const updateQuery = `
      UPDATE producto
      SET 
        name = ?, 
        category_id = ?, 
        codigo = ?, 
        price = ?,
        image_url = ?,
        descripcion = ?,
        stock = ?
      WHERE product_id = ?
    `;
    const [updateResults] = await connection.execute(updateQuery, [
      finalFinalName,
      categoryId,
      finalFinalCodigo,
      finalFinalPrice,
      finalImageUrl || existingProduct[0].image_url, // Usamos la imagen existente si no se proporcionó una nueva
      finalFinalDescripcion,
      finalFinalStock,
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
//Controlador para actualizar detalles del producto
exports.actualizarProductoDetalle = async (req, res) => {
  try {
    // Extraer el ID del producto y del detalle de los parámetros de la solicitud
    const { id, detalleId } = req.params;

    // Extraer los datos actualizados del cuerpo de la solicitud
    const { detalle_texto } = req.body;

    // Verificar si el producto y el detalle existen en la base de datos
    const [existingProduct] = await connection.execute('SELECT * FROM producto WHERE product_id = ?', [id]);
    if (existingProduct.length === 0) {
      return res.status(404).json({ error: 'El producto no existe' });
    }

    const [existingDetalle] = await connection.execute('SELECT * FROM producto_detalle WHERE product_id = ? AND detalle_id = ?', [id, detalleId]);
    if (existingDetalle.length === 0) {
      return res.status(404).json({ error: 'El detalle no existe' });
    }

    // Verificar si se proporcionó un nuevo detalle_texto
    if (detalle_texto !== undefined) {
      const updateDetalleQuery = `
        UPDATE producto_detalle
        SET detalle_texto = ?
        WHERE product_id = ? AND detalle_id = ?
      `;
      const [updateDetalleResults] = await connection.execute(updateDetalleQuery, [detalle_texto, id, detalleId]);

      if (updateDetalleResults.affectedRows > 0) {
        return res.status(200).json({ message: 'Detalle del producto actualizado exitosamente' });
      } else {
        return res.status(500).json({ error: 'Error al actualizar el detalle del producto' });
      }
    } else {
      return res.status(400).json({ error: 'No se proporcionó detalle_texto para actualizar' });
    }
  } catch (error) {
    console.error('Error al actualizar el detalle del producto:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
//Controlador para actualizar info del producto
exports.actualizarProductoInfo = async (req, res) => {
  try {
    // Extraer el ID del producto y del atributo de los parámetros de la solicitud
    const { id_product, id } = req.params;

    // Extraer los datos actualizados del cuerpo de la solicitud
    const { atributo_nombre, atributo_valor } = req.body;

    // Verificar que el id y el id_product no sean undefined
    if (!id || !id_product) {
      return res.status(400).json({ error: 'ID del producto o del atributo no proporcionado' });
    }

    // Verificar si el producto y el atributo existen en la base de datos
    const [existingProduct] = await connection.execute('SELECT * FROM producto WHERE product_id = ?', [id_product]);
    if (existingProduct.length === 0) {
      return res.status(404).json({ error: 'El producto no existe' });
    }

    const [existingAtributo] = await connection.execute('SELECT * FROM producto_info WHERE product_id = ? AND id = ?', [id_product, id]);
    if (existingAtributo.length === 0) {
      return res.status(404).json({ error: 'El atributo no existe' });
    }

    // Verificar si se proporcionaron nuevos valores para los atributos
    if (atributo_nombre !== undefined && atributo_valor !== undefined) {
      const updateQuery = `
        UPDATE producto_info
        SET 
            atributo_nombre = ?, 
            atributo_valor = ?
        WHERE product_id = ? AND id = ?
      `;
      const [updateResults] = await connection.execute(updateQuery, [atributo_nombre, atributo_valor, id_product, id]);

      if (updateResults.affectedRows > 0) {
        return res.status(200).json({ message: 'Atributo del producto actualizado exitosamente' });
      } else {
        return res.status(500).json({ error: 'Error al actualizar el atributo del producto' });
      }
    } else {
      return res.status(400).json({ error: 'No se proporcionaron valores para actualizar el atributo' });
    }
  } catch (error) {
    console.error('Error al actualizar el atributo del producto:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
//Obtener producto por id
exports.obtenerProductopp = async (req, res) => {
  try {
    // Extraer el ID del producto de los parámetros de la solicitud
    const { id } = req.params;

    // Consulta SQL para obtener el producto por su ID con información extendida
    const query = `
    SELECT 
    filtered_p.product_id,
    filtered_p.name,
    filtered_p.codigo,
    filtered_p.image_url,
    filtered_p.category_id,
    filtered_p.price,
    filtered_p.creado,
    filtered_p.stock,
    filtered_p.descripcion,
    filtered_p.nombre_categoria,
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'nombre', pi.atributo_nombre,
                'valor', pi.atributo_valor
            )
        )
        FROM producto_info pi
        WHERE pi.product_id = filtered_p.product_id
    ) AS atributos,
    (
        SELECT JSON_ARRAYAGG(pd.detalle_texto)
        FROM producto_detalle pd
        WHERE pd.product_id = filtered_p.product_id
    ) AS detalles
FROM (
    SELECT 
        p.*,
        c.name AS nombre_categoria
    FROM 
        producto p
        JOIN categorias c ON p.category_id = c.category_id
        LEFT JOIN producto_info pi ON p.product_id = pi.product_id
        LEFT JOIN producto_detalle pd ON p.product_id = pd.product_id
    WHERE 
        p.product_id = ?
) AS filtered_p
ORDER BY 
    filtered_p.product_id ASC;

    `;

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
    const checkProductQuery = 'SELECT image_url FROM producto WHERE product_id = ?';
    const deleteQuery = 'DELETE FROM producto WHERE product_id = ?';
    const deleteDetailsQuery = 'DELETE FROM producto_detalle WHERE product_id = ?';
    const deleteInfoQuery = 'DELETE FROM producto_info WHERE product_id = ?';

    // Verificar si el producto existe y obtener la URL de la imagen
    const [productResult] = await connection.execute(checkProductQuery, [id]);

    if (productResult.length === 0) {
      return res.status(404).json({ error: 'El producto no existe' });
    }

    const imageUrl = productResult[0].image_url;

    // Eliminar primero los registros de producto_info relacionados con el producto
    await connection.execute(deleteInfoQuery, [id]);

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
//Listar productos info de los productos
exports.listDetals = async (req, res) => {
  try {
    // Extraer el ID del producto de los parámetros de la solicitud
    const { id } = req.params;

    // Consulta SQL para obtener todos los registros de producto_info con ese product_id
    const query = `
      SELECT * FROM producto_info WHERE product_id = ?;
    `;

    // Ejecutar la consulta SQL
    const [result] = await connection.execute(query, [id]);

    // Verificar si se encontró algún detalle de producto
    if (result.length > 0) {
      return res.status(200).json(result); // Devolver todos los resultados encontrados
    } else {
      return res.status(404).json({ error: 'Detalle del producto no encontrado' });
    }
    
  } catch (error) {
    console.error('Error al obtener el detalle del producto:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
//Listar productos detalles
exports.listProductDetails = async (req, res) => {
  try {
    // Extraer el ID del producto de los parámetros de la solicitud
    const { id } = req.params;

    // Consulta SQL para obtener todos los registros de producto_detalle con ese product_id
    const query = `
      SELECT * FROM producto_detalle WHERE product_id = ?;
    `;

    // Ejecutar la consulta SQL
    const [result] = await connection.execute(query, [id]);

    // Verificar si se encontró algún detalle de producto
    if (result.length > 0) {
      return res.status(200).json(result); // Devolver todos los resultados encontrados
    } else {
      return res.status(404).json({ error: 'Detalle del producto no encontrado' });
    }
    
  } catch (error) {
    console.error('Error al obtener el detalle del producto:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};




















