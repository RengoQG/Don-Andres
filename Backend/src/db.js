const mySql = require('mysql2/promise');
require('dotenv').config();
// Resto de tu código aquí

// Configurar la conexión a la base de datos
const pool = mySql.createPool({
    host: process.env.MYSQLDB_HOST, // Cambia esto por la dirección de tu servidor MySQL
    user: process.env.MYDB_NAME, // Cambia esto por el nombre de usuario de tu base de datos
    password: process.env.MYSQLDB_PASSWORD, // Cambia esto por la contraseña de tu base de datos
    database: process.env.MYDB_MYSQL, // Cambia esto por el nombre de tu base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });


module.exports = pool;