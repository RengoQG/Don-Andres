const connection = require('../db.js');

// Controlador para obtener todas los productos
exports.obtenerProductos = async (req, res) => {
  try {
    // Consulta SQL para obtener todas los productos
    const query = 'SELECT * FROM productos LIMIT 20';

    // Ejecutar la consulta SQL
    const [results] = await connection.execute(query);

    // Verificar si se encontraron productos
    if (results.length > 0) {
      return res.status(200).json(results); 
    } else {
      return res.status(404).json({ error: 'No se encontraron los productos' });
    }
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
