const mySql = require('mysql2/promise');
require('dotenv').config();
// Resto de tu código aquí

// Configurar la conexión a la base de datos
const pool = mySql.createPool({
    host: process.env.MYSQLDB_HOST,
    user: process.env.MYDB_USER,
    password: process.env.MYSQLDB_PASSWORD,
    database: process.env.MYDB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


module.exports = pool;



