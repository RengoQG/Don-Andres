const connection = require('../db.js');

exports.SimiAll = async (req, res) => {
    const productId = req.params.id;

    try {
        // Validar que productId sea un entero
        if (isNaN(productId) || !Number.isInteger(parseInt(productId))) {
            return res.status(400).json({ error: 'ID de producto no válido' });
        }

        // Consulta SQL con consulta preparada para obtener la categoría del producto actual
        const categoryQuery = `
            SELECT category_id 
            FROM productos 
            WHERE product_id = ?
        `;
         console.log('a');

        // Ejecutar la consulta SQL para obtener la categoría del producto actual
        const [categoryResult] = await connection.execute(categoryQuery, [productId]);

        // Verificar si se encontró la categoría del producto
        if (categoryResult.length === 0) {
            return res.status(404).json({ error: 'No se encontró la categoría del producto' });
        }
        console.log('b');
        // Obtener el ID de la categoría del resultado
        const categoryId = categoryResult[0].category_id;

        // Consulta SQL con consulta preparada para obtener los productos relacionados por categoría
        const query = `
            SELECT p.* 
            FROM productos p
            INNER JOIN categorias c ON p.category_id = c.category_id
            WHERE p.category_id = ? AND p.product_id != ?
            ORDER BY p.price ASC
            LIMIT 6
        `;
        console.log('c');
        // Ejecutar la consulta SQL con consulta preparada para obtener productos relacionados
        const [results] = await connection.execute(query, [categoryId, productId]);

        // Verificar si se encontraron productos relacionados
        if (results.length > 0) {
            return res.status(200).json(results);
        } else {
            return res.status(404).json({ error: 'No se encontraron productos relacionados' });
        }
    } catch (error) {
        console.error('Error al obtener los productos relacionados:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
