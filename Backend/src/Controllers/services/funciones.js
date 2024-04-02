// Importa tu conexión a la base de datos aquí
const connection = require('../../db.js');

// Función para obtener un usuario por correo electrónico desde la base de datos
async function getUserByEmail(email) {
    const query = 'SELECT * FROM clientes WHERE email = ?';
    const [rows, fields] = await connection.query(query, [email]);
    return rows[0]; // Devuelve el primer usuario encontrado, si existe
}

// Exporta la función para que esté disponible en otros archivos
module.exports = { getUserByEmail };
