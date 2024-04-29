const connection = require('../db.js');

// Controlador para obtener todas las categorías
exports.obtenerCategorias = async (req, res) => {
  try {
    // Consulta SQL para obtener todas las categorías
    const query = 'SELECT * FROM categorias';

    // Ejecutar la consulta SQL
    const [results] = await connection.execute(query);

    // Verificar si se encontraron categorías
    if (results.length > 0) {
      return res.status(200).json(results); // Devolver las categorías encontradas
    } else {
      return res.status(404).json({ error: 'No se encontraron categorías' });
    }
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para crear una nueva categoría
exports.crearCategoria = async (req, res) => {
  try {
    const { name } = req.body;
    const url_imagen = req.file.path; // Ruta donde se almacenó la imagen

    // Consulta SQL para insertar una nueva categoría
    const query = 'INSERT INTO categorias (name, url_imagen) VALUES (?, ?)';
    
    // Ejecutar la consulta SQL
    await connection.execute(query, [name, url_imagen]);

    res.json({ message: 'Categoría creada exitosamente' });
  } catch (error) {
    console.error('Error al crear la categoría:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};





