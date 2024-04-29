const connection = require('../db.js');

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

