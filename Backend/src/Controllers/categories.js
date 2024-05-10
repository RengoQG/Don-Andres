const { Console } = require('console');
const connection = require('../db.js');
const fs = require('fs');
const path = require('path');


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
    if (req.fileValidationError) {
      // Si hay un error de validación del archivo, envía un mensaje de error al cliente
      return res.status(400).json({ error: req.fileValidationError });
    }

    const { name } = req.body;

    // Verificar si se ha enviado un archivo en la solicitud
    if (!req.file) {
      // Si no se ha enviado ningún archivo, devolver un error 400 con un mensaje específico
      return res.status(400).json({ error: 'No se ha proporcionado una imagen de categoría' });
    }

    const url_imagen = req.file.filename; // Obtén solo el nombre del archivo

    // Validación de campos vacíos
    if (!name || !url_imagen) {
      return res.status(400).json({ error: 'Los campos nombre y url_imagen son requeridos' });
    }

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



// Función para editar una categoría
exports.editarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    let url_imagen;

    // Verificar si se proporcionó una nueva imagen
    if (req.file) {
      url_imagen = req.file.filename; // Nombre de archivo único
    }

    // Consulta SQL para obtener la categoría por su ID
    const querySelect = 'SELECT * FROM categorias WHERE category_id = ?';
    const [categoria] = await connection.execute(querySelect, [id]);

    if (categoria.length === 0) {
      return res.status(404).json({ error: 'La categoría no existe' });
    }

    let queryUpdate;
    let params;
    // Verificar si se proporcionó una nueva imagen
    if (url_imagen) {
      queryUpdate = 'UPDATE categorias SET name = ?, url_imagen = ? WHERE category_id = ?';
      params = [name, url_imagen, id];
    } else {
      queryUpdate = 'UPDATE categorias SET name = ? WHERE category_id = ?';
      params = [name, id];
    }

    // Ejecutar la consulta SQL para actualizar la categoría
    await connection.execute(queryUpdate, params);

    res.json({ message: 'Categoría actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar la categoría:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


//Trae una categorias por id
exports.obtenerCategoriaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta SQL para obtener la categoría por su ID
    const query = 'SELECT * FROM categorias WHERE category_id = ?';
    const [categoria] = await connection.execute(query, [id]);

    if (categoria.length === 0) {
      return res.status(404).json({ error: 'La categoría no existe' });
    }

    res.json(categoria[0]); // Devuelve la primera categoría encontrada (debería ser solo una)
  } catch (error) {
    console.error('Error al obtener la categoría:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para eliminar una categoría y su imagen asociada
exports.eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    // Consultas SQL para verificar si existen productos asociados a la categoría
    const checkProductsQuery = 'SELECT COUNT(*) AS productCount FROM productos WHERE category_id = ?';
    const selectQuery = 'SELECT url_imagen FROM categorias WHERE category_id = ?';
    const deleteQuery = 'DELETE FROM categorias WHERE category_id = ?';

    // Verificar si existen productos asociados a la categoría
    const [productResult] = await connection.execute(checkProductsQuery, [id]);

    if (productResult[0].productCount > 0) {
      return res.status(404).json({ error: 'No se puede eliminar la categoría porque tiene productos asociados' });
    }

    // Si no hay productos asociados, continuar con la eliminación de la categoría
    const [categoryResult] = await connection.execute(selectQuery, [id]);

    if (categoryResult.length === 0) {
      return res.status(404).json({ error: 'La categoría no existe' });
    }

    const imageName = categoryResult[0]?.url_imagen; // Uso de operador opcional "?." para evitar errores si categoryResult[0] es undefined

    if (!imageName) {
      console.log('La imagen de la categoría no se encontró en la ruta especificada.');
    } else {
      const imagePath = path.join(__dirname, '../../../Frontend/Frontend/public/images/CategoriaImagenes', imageName);
      
      // Verificar si el archivo existe antes de intentar eliminarlo
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error al eliminar la imagen:', err);
        } else {
          console.log('Imagen eliminada correctamente:', imagePath);
        }
      });
    }

    // Eliminar la categoría de la base de datos
    await connection.execute(deleteQuery, [id]);
    console.log('Categoría eliminada correctamente en la base de datos');
    res.json({ message: 'Categoría eliminada correctamente' });

  } catch (error) {
    console.error('Error al eliminar la categoría:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};








