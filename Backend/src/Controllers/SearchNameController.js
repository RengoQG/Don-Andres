const connection = require('../db.js');

exports.buscarProductosPorNombre = async (req, res) => {
    try {
        console.log(req.body); // Imprimir los datos recibidos en la consola del servidor

        const query = req.body.query ? req.body.query.trim() : '';

        if (query === '') {
            return res.status(400).json({ error: 'Por favor, ingrese un parámetro de búsqueda válido' });
        }

        // Consulta SQL para buscar productos por nombre, precio o código
        let querySQL = `
            SELECT *
            FROM productos
            WHERE 
                LOWER(name) LIKE ? OR
                price LIKE ? OR
                codigo LIKE ?
        `;
        const queryParams = [`%${query.toLowerCase()}%`, `%${query}%`, `%${query}%`];

        // Ejecutar la consulta SQL
        const [rows] = await connection.execute(querySQL, queryParams);

        // Verificar si se encontraron productos
        if (rows.length > 0) {
            return res.status(200).json(rows);
        } else {
            return res.status(404).json({ error: 'No se encontraron productos' });
        }
    } catch (error) {
        console.error('Error al buscar productos:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
