const connection = require('../db.js');

exports.sugerenciasProductos = async (req, res) => {
  try {
    const query = req.body.query ? req.body.query.trim() : '';

    if (query === '') {
      return res.status(400).json({ error: 'Por favor, ingrese un parámetro de búsqueda válido' });
    }

    // Consulta SQL para obtener las primeras 5 sugerencias de productos basadas en la consulta actual del usuario
    const sugerenciasQuery = await connection.execute(
      'SELECT name, price, image_url, codigo FROM productos WHERE name LIKE ? OR price LIKE ? OR codigo LIKE ? LIMIT 5',
      [`%${query}%`, `%${query}%`, `%${query}%`] // Término de búsqueda en cualquier parte del nombre, precio o código
    );

    // Consulta SQL para contar el número total de resultados que coinciden con la búsqueda
    const totalResultsQuery = await connection.execute(
      'SELECT COUNT(*) AS total_results FROM productos WHERE name LIKE ? OR price LIKE ? OR codigo LIKE ?',
      [`%${query}%`, `%${query}%`, `%${query}%`] // Término de búsqueda en cualquier parte del nombre, precio o código
    );

    const totalResults = totalResultsQuery[0][0].total_results;

    // Consulta SQL para obtener los detalles de todos los productos que coinciden con la búsqueda
    const productosQuery = await connection.execute(
      'SELECT name, price, image_url, codigo FROM productos WHERE name LIKE ? OR price LIKE ? OR codigo LIKE ?',
      [`%${query}%`, `%${query}%`, `%${query}%`] // Término de búsqueda en cualquier parte del nombre, precio o código
    );

    // Verificar si se encontraron productos
    if (sugerenciasQuery[0].length > 0) {
      // Formatear los resultados de la consulta de sugerencias
      const sugerencias = sugerenciasQuery[0].map((row) => ({
        name: row.name,
        price: row.price,
        image_url: row.image_url,
        codigo: row.codigo
      }));

      // Formatear los resultados de la consulta de productos
      const productos = productosQuery[0].map((row) => ({
        name: row.name,
        price: row.price,
        image_url: row.image_url,
        codigo: row.codigo
      }));

      // Devolver las sugerencias, los productos y el número total de resultados encontrados
      return res.status(200).json({ sugerencias, totalResults, productos });
    } else {
      // Si no se encontraron sugerencias, devolver un mensaje indicando esto
      return res.status(200).json({ message: 'No se encontraron sugerencias', totalResults });
    }
  } catch (error) {
    console.error('Error al obtener sugerencias de productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
