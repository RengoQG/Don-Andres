const connection = require('../db.js');

exports.sugerenciasProductos = async (req, res) => {
  try {
    const query = req.body.query ? req.body.query.trim() : '';

    if (query === '') {
      return res.status(400).json({ error: 'Por favor, ingrese un parámetro de búsqueda válido' });
    }

    // Consulta SQL para obtener sugerencias de productos basadas en la consulta actual del usuario
    const queryResult = await connection.execute(
      'SELECT name, price, image_url FROM productos WHERE name LIKE ? LIMIT 5',
      [`%${query}%`] // Término de búsqueda en cualquier parte del nombre del producto
    );

    // Verificar si se encontraron productos
    if (queryResult[0].length > 0) {
      // Formatear los resultados de la consulta
      const sugerencias = queryResult[0].map((row) => ({
        name: row.name,
        price: row.price,
        image_url: row.image_url
      }));

      return res.status(200).json(sugerencias);
    } else {
      // Si no se encontraron sugerencias, devolver un mensaje indicando esto
      return res.status(200).json({ message: 'No se encontraron sugerencias' });
    }

  } catch (error) {
    console.error('Error al obtener sugerencias de productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
