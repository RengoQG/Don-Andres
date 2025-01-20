const connection = require('../db.js');

exports.buscarProductosPorNombre = async (req, res) => {
    try {
        console.log(req.body); // Imprimir los datos recibidos en la consola del servidor

        const query = req.body.query ? req.body.query.trim() : '';

        if (query === '') {
            return res.status(400).json({ error: 'Por favor, ingrese un parámetro de búsqueda válido' });
        }

        // Consulta SQL para buscar productos por nombre, precio o código con relevancia
        let querySQL = `
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
                CASE
                    WHEN LOWER(p.name) = ? THEN 2  -- Coincidencia exacta
                    WHEN LOWER(p.name) LIKE ? THEN 1  -- Coincidencia parcial
                    ELSE 0
                END AS relevancia
            FROM 
                producto p
                JOIN categorias c ON p.category_id = c.category_id
                LEFT JOIN producto_info pi ON p.product_id = pi.product_id
                LEFT JOIN producto_detalle pd ON p.product_id = pd.product_id
            WHERE 
                LOWER(p.name) LIKE ? OR
                p.price LIKE ?
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
        ) AS filtered_p
        ORDER BY 
            relevancia DESC, filtered_p.product_id ASC;
        `;

        // Parámetros para la consulta
        const queryParams = [
            query.toLowerCase(),       // Coincidencia exacta
            `%${query.toLowerCase()}%`, // Coincidencia parcial
            `%${query.toLowerCase()}%`, // LIKE
            `%${query}%`               // Precio o código
        ];

        // Ejecutar la consulta SQL
        console.log('Consulta SQL:', querySQL); // Verificar la consulta
        console.log('Parámetros:', queryParams); // Verificar parámetros

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
