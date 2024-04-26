const connection = require('../db.js');

exports.relatedAll = async (req, res) => {
    const productId = req.params.id;

    try {
        // Validar que productId sea un entero
        if (isNaN(productId) || !Number.isInteger(parseInt(productId))) {
            return res.status(400).json({ error: 'ID de producto no válido' });
        }

        // Consulta SQL con consulta preparada para obtener los detalles del producto por su ID
        const query = 'SELECT * FROM producto_detalle WHERE product_id = ?';

        // Ejecutar la consulta SQL con consulta preparada
        const [results] = await connection.execute(query, [productId]);

        // Verificar si se encontraron detalles del producto
        if (results.length > 0) {
            return res.status(200).json(results);
        } else {
            return res.status(404).json({ error: 'No se encontraron detalles del producto' });
        }
    } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
